# 🚂 Express.js Product RESTful API

This project implements a modular and well-structured RESTful API using **Express.js** to manage a `products` resource. It covers standard CRUD operations, custom middleware, comprehensive error handling, and advanced features like filtering, searching, and pagination.

---

## 🛠️ Setup

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (or yarn/pnpm)

### 1. Installation

1.  Clone the repository:
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd express-api-project
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

### 2. Configuration (`.env` File)

Create a file named `.env` in the project root based on the provided `.env.example` file.

### 3. Running the Server

Start the application:

```bash

For a fully functional Express.js Product API, the following RESTful endpoints are implemented to handle various scenarios:

The GET /api/products endpoint serves as the primary resource access point, allowing users to list all products , but also supporting advanced filtering by category, searching by name via query parameters, and pagination using page and limit parameters to manage large datasets. A related, unauthenticated endpoint, GET /api/products/stats, provides aggregated information like the count of products by category. For individual resource retrieval, GET /api/products/:id fetches a specific product using its unique ID. Write and modification operations—POST /api/products (to create a new product), PUT /api/products/:id (to update an existing product), and DELETE /api/products/:id (to remove a product)—are all secured by the authenticate middleware, requiring a valid x-api-key header. Furthermore, the POST and PUT endpoints are protected by the validateProduct middleware, ensuring the integrity and correctness of the submitted product data before processing, with all resource operations properly leveraging global error handling to return appropriate HTTP status codes (e.g., 400 for validation errors, 404 for not found, 401 for unauthorized access).
