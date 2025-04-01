/**
 * Módulo para operaciones matemáticas básicas
 * @module Math
 */

/**
 * Suma dos o más números
 * @param {...number} numbers - Números a sumar
 * @returns {number} La suma de todos los números
 * @example
 * // Retorna 8
 * sum(3, 5);
 * @example
 * // Retorna 15
 * sum(1, 2, 3, 4, 5);
 */
export function sum(...numbers) {
	return numbers.reduce((total, num) => total + num, 0);
}
