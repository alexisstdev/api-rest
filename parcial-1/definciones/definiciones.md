# Conceptos Básicos sobre APIs y REST

## ¿Qué es una API?

Una **API** (Interfaz de Programación de Aplicaciones, por sus siglas en inglés: _Application Programming Interface_) es un conjunto de reglas y protocolos que permite que diferentes sistemas de software se comuniquen entre sí. Las APIs definen cómo las aplicaciones pueden interactuar con un servicio o una biblioteca, proporcionando métodos y estructuras de datos que los desarrolladores pueden utilizar para integrar funcionalidades específicas en sus propias aplicaciones.

En términos simples, una API actúa como un intermediario que permite que dos aplicaciones se comuniquen entre sí, sin necesidad de que los desarrolladores conozcan los detalles internos de cómo funciona el otro sistema.

## ¿Qué es REST?

**REST** (Transferencia de Estado Representacional, por sus siglas en inglés: _Representational State Transfer_) es un estilo de arquitectura de software que se utiliza para diseñar redes de comunicación, especialmente en aplicaciones web. Fue definido por Roy Fielding en su tesis doctoral en el año 2000.

REST se basa en un conjunto de principios que permiten que los sistemas se comuniquen de manera eficiente y escalable. Estos principios incluyen:

1. **Cliente-Servidor**: Separación clara entre el cliente (interfaz de usuario) y el servidor (almacenamiento de datos y lógica de negocio).
2. **Sin estado (Stateless)**: Cada solicitud del cliente al servidor debe contener toda la información necesaria para que el servidor la entienda y la procese. El servidor no almacena ningún estado de la sesión del cliente.
3. **Caché**: Las respuestas del servidor pueden ser almacenadas en caché por el cliente para mejorar el rendimiento.
4. **Interfaz uniforme**: La API debe tener una interfaz consistente y predecible, lo que facilita su uso y comprensión.
5. **Sistema en capas**: La arquitectura puede estar compuesta por múltiples capas, donde cada capa tiene una responsabilidad específica.
6. **Código bajo demanda (opcional)**: El servidor puede enviar código ejecutable al cliente para extender su funcionalidad.

## ¿A qué se refiere el término RESTful?

El término **RESTful** se utiliza para describir un servicio web que sigue los principios y restricciones de la arquitectura REST. Un servicio RESTful es aquel que:

- Utiliza HTTP como protocolo de comunicación.
- Opera sobre recursos identificados por URLs (Uniform Resource Locators).
- Utiliza los métodos HTTP estándar (GET, POST, PUT, DELETE, etc.) para realizar operaciones sobre esos recursos.
- Devuelve datos en formatos como JSON o XML, que son fáciles de interpretar tanto para humanos como para máquinas.

En resumen, un servicio RESTful es una implementación concreta de una API que sigue las mejores prácticas y principios de REST, lo que la hace escalable, mantenible y fácil de integrar con otras aplicaciones.

### Ejemplo de un servicio RESTful

Supongamos que tenemos un servicio RESTful para gestionar usuarios:

- **GET /users**: Obtiene una lista de todos los usuarios.
- **GET /users/{id}**: Obtiene los detalles de un usuario específico.
- **POST /users**: Crea un nuevo usuario.
- **PUT /users/{id}**: Actualiza la información de un usuario existente.
- **DELETE /users/{id}**: Elimina un usuario.

Este servicio sigue los principios REST al utilizar URLs claras y métodos HTTP estándar para realizar operaciones sobre los recursos (en este caso, los usuarios).

---

En conclusión, las APIs son esenciales para la interoperabilidad entre sistemas, REST es un estilo arquitectónico que define cómo deben interactuar esos sistemas, y RESTful es un término que describe una API que sigue fielmente los principios de REST.
