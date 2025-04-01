# Módulo de Suma

Este es un módulo simple que proporciona una función para sumar números.

## Instalación

```bash
# Clone el repositorio o copie los archivos
# Luego instale las dependencias
npm install
```

## Uso

Este módulo utiliza ES Modules. Para usarlo:

```javascript
import { sum } from "./sum.js";

// Suma dos números
const resultado = sum(5, 3);
console.log(resultado); // 8

// Suma varios números
const total = sum(1, 2, 3, 4, 5);
console.log(total); // 15
```

## Documentación

Este proyecto usa JSDoc para la documentación. Para generar la documentación:

```bash
npm run docs
```

Esto creará la documentación en la carpeta `docs/`.
w
