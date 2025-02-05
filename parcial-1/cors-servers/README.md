# README.md

# CORS Servers Project

This project implements two HTTP servers using Bun and Fastify. 

## Overview

- **Server 1**: Listens on port 3000 and serves an HTML file that makes a JavaScript fetch request to Server 2.
- **Server 2**: Listens on port 3001 and can return any response while enabling or disabling CORS headers.

## Getting Started

### Prerequisites

- Bun
- Node.js
- TypeScript

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd cors-servers
   ```

2. Install dependencies:
   ```
   bun install
   ```

### Running the Servers

- Start Server 1:
  ```
  bun src/server1/index.ts
  ```

- Start Server 2:
  ```
  bun src/server2/index.ts
  ```

### Accessing the Servers

- Open your browser and navigate to `http://localhost:3000` to access Server 1.
- Server 1 will make a fetch request to Server 2, which is running on `http://localhost:3001`.

### CORS Configuration

You can enable or disable CORS headers in Server 2 as needed.

## License

This project is licensed under the MIT License.