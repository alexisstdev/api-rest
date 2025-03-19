import { ENV } from '@src/config/env';
import type { Response } from 'express';

const handleCastErrorDB = (err: any) => {
	const message = `Error al convertir tipo de dato ${err.path}: ${err.value}. Por favor, revise los datos proporcionados.`;
	return new Error(message);
};

const handleDuplicateFieldsDB = (_: any) => {
	const message =
		'El valor que se intenta ingresar ya existe en el sistema. Por favor, verifique los datos e intente nuevamente.';
	return new Error(message);
};

const handleValidationErrorDB = (err: any) => {
	const errors = Object.values(err.errors).map(
		(el) =>
			(
				el as {
					message: string;
				}
			).message,
	);
	const message = `Datos proporcionados no válidos. ${errors.join('. ')}`;
	return new Error(message);
};

const handleForeignKeyError = (_: any) => {
	const message =
		'No se puede completar esta acción porque este registro está vinculado a otro o hay una relación que no se pudo encontrar. Por favor, verifique las dependencias antes de continuar.';
	return new Error(message);
};

const handleDataTypeError = (_: any) => {
	const message =
		'Tipo de dato inválido para el campo. Por favor, revise los datos proporcionados.';
	return new Error(message);
};

const handleConstraintError = (_: any) => {
	const message =
		'Violación de restricción. Por favor, revise los datos proporcionados.';
	return new Error(message);
};

const handleDeadlockError = (_: any) => {
	const message =
		'Conflicto de transacción detectado. Por favor, intente nuevamente.';
	return new Error(message);
};

const sendErrorDev = (err: any, res: Response) => {
	console.error(err);

	res.status(err.statusCode as number).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err: any, res: Response) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	} else {
		console.error(err);

		res.status(500).json({
			status: 'error',
			message: 'Algo salió mal',
		});
	}
};

const globalErrorHandler = (
	err: any,
	_req: unknown,
	res: Response,
	_next: unknown,
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	let customDBError: Error | undefined;

	if (err.name === 'CastError') customDBError = handleCastErrorDB(err);
	if (err.name === 'ValidationError')
		customDBError = handleValidationErrorDB(err);
	if (err.code === 'P2002') customDBError = handleDuplicateFieldsDB(err);
	if (err.code === 'P2003') customDBError = handleForeignKeyError(err);
	if (err.code === 'P2005') customDBError = handleDataTypeError(err);
	if (err.code === 'P2004') customDBError = handleConstraintError(err);
	if (err.code === 'P2034') customDBError = handleDeadlockError(err);

	if (ENV.ENVIRONMENT === 'development') {
		sendErrorDev(customDBError ?? err, res);
	} else {
		sendErrorProd(customDBError ?? err, res);
	}
};

export default globalErrorHandler;
