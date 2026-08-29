# PART 1 -MongoDB Connection Setup

## 1. Create MongoDB Atlas Account

* Go to MongoDB Atlas and create an account.
* Create a new cluster.

---

## 2. Create Database User

Go to:

**Security → Database Access → Add New Database User**

Create a username and password.

Example:

```text
Username: sakshi
Password: your_password
```

---

## 3. Allow Network Access

Go to:

**Security → Network Access → Add IP Address**

For development, you can allow access from anywhere:

```text
0.0.0.0/0
```

---

## 4. Get MongoDB Connection String

Go to:

**Cluster → Connect → Drivers → Node.js**

Copy the connection string.

Example:

```text
mongodb+srv://sakshi:your_password@cluster0.xxxxx.mongodb.net/
```

---

## 5. Create `.env`

Create `.env` in the backend root directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://sakshi:your_password@cluster0.xxxxx.mongodb.net/videotube
```

> If your MongoDB password contains special characters such as `@`, `#`, `%`, etc., URL-encode them.
> Try to create simple password, avoid to add any special character.

---

# 6. Create `constants.js`

Create:

```text
src/constants.js
```

Add:

```js
export const DB_NAME = "videotube";
```

This stores the database name in one place.

---

# 7. Create `db/index.js`

Create:

```text
src/db/index.js
```

Add:

```js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
            `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
```

---

# 8. Configure `index.js`

Create/use:

```text
src/index.js
```

Add:

```js


import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: './.env'
})

connectDB();

---

# 9. Install Required Packages

Run:

```bash
npm install mongoose dotenv express
```

---

# 10. Start the Backend

Run:

```bash
npm run dev
```

If the connection is successful, you should see something like:

```text
MongoDB connected !! DB HOST: cluster0.xxxxx.mongodb.net
Server is running at port 3000
```

---

# 11. Protect `.env`

Add this to `.gitignore`:

```gitignore
.env
node_modules
```

**Never push your MongoDB username or password to GitHub.

----------------------------------------------------------------------------------------------------------------------------------------------

# PART 2 -Custome API response and error handling

API Utilities

This folder contains reusable utility classes and functions used to make the backend API clean, consistent, and easier to manage.

# 1. ApiError

ApiError is a custom error class used to create API errors with an HTTP status code.

Example
throw new ApiError(404, "User not found");
It stores:
statusCode → HTTP error status code
message → Error message
success → false
errors → Additional error details
Purpose

ApiError provides a standard structure for handling errors throughout the backend.

# 2. ApiResponse

ApiResponse is used to create a consistent structure for successful API responses.

Example
res.status(200).json(
    new ApiResponse(200, user, "User fetched successfully")
);
It stores:
statusCode → HTTP status code
data → Response data
message → Success message
success → true for status codes below 400
Purpose

ApiResponse ensures that successful responses follow the same format throughout the application.

# 3. asyncHandler

asyncHandler is a utility function used to handle errors from asynchronous Express controllers.

Example
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    );
});

If an error occurs inside the controller, asyncHandler passes the error to Express's error-handling middleware.

Error Flow
Controller
    ↓
asyncHandler
    ↓
Async Operation
    ↓
Error
    ↓
next(error)
    ↓
Error Middleware

This avoids writing repetitive try-catch blocks in every asynchronous controller.

# In Short

ApiError
    ↓
Handles API errors

ApiResponse
    ↓
Formats successful API responses

asyncHandler
    ↓
Handles errors from async controllers

# These utilities help create a clean, reusable, and consistent backend API structure.



-------------------------------------------------------------------------------------------------------------------------------------------------------------------
# HTTP — HyperText Transfer Protocol

## 📌 Introduction

**HTTP (HyperText Transfer Protocol)** is an application-layer protocol used for communication between a **client** and a **server** over a network.

It is the foundation of communication on the Web. When a user opens a website, the browser sends an HTTP request to a server, and the server responds with the requested data.

### Basic HTTP Communication

```text
Client (Browser)
       |
       |  HTTP Request
       v
    Server
       |
       |  HTTP Response
       v
Client (Browser)
```

---

## 🌐 What is HTTP?

HTTP defines how messages are formatted and transmitted between clients and servers.

For example, when you visit:

```text
http://example.com
```

The browser sends a request similar to:

```http
GET / HTTP/1.1
Host: example.com
```

The server sends back a response:

```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>
    <body>
        <h1>Hello World</h1>
    </body>
</html>
```

---

# 🔹 HTTP Request

An HTTP request is sent by the client to the server.

A request generally contains:

1. **HTTP Method**
2. **URL / Path**
3. **HTTP Version**
4. **Headers**
5. **Body** (optional)

Example:

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
    "name": "John",
    "age": 25
}
```

---

# 🔹 HTTP Response

The server sends an HTTP response back to the client.

A response contains:

1. **Status Code**
2. **Headers**
3. **Response Body**

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "message": "User created successfully"
}
```

---

# 🔥 HTTP Methods

HTTP methods specify what action the client wants the server to perform.

| Method    | Purpose                                 |
| --------- | --------------------------------------- |
| `GET`     | Retrieve data                           |
| `POST`    | Create/send new data                    |
| `PUT`     | Replace/update existing data            |
| `PATCH`   | Partially update data                   |
| `DELETE`  | Delete data                             |
| `HEAD`    | Retrieve headers without response body  |
| `OPTIONS` | Get information about supported methods |

## 1. GET

Used to retrieve data from a server.

```http
GET /users HTTP/1.1
Host: example.com
```

Example:

```text
GET /products
```

This might return a list of products.

---

## 2. POST

Used to send data to the server, commonly to create a new resource.

```http
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
    "name": "Alice",
    "email": "alice@example.com"
}
```

---

## 3. PUT

Used to completely update or replace an existing resource.

```http
PUT /users/10 HTTP/1.1
Host: example.com
Content-Type: application/json

{
    "name": "Alice",
    "email": "alice@example.com"
}
```

---

## 4. PATCH

Used to partially update an existing resource.

```http
PATCH /users/10 HTTP/1.1
Host: example.com
Content-Type: application/json

{
    "email": "newemail@example.com"
}
```

---

## 5. DELETE

Used to remove a resource.

```http
DELETE /users/10 HTTP/1.1
Host: example.com
```

---

## 6. HEAD

Similar to `GET`, but the server returns only the response headers.

```http
HEAD /index.html HTTP/1.1
Host: example.com
```

It can be useful for checking whether a resource exists or checking its metadata.

---

## 7. OPTIONS

Used to find out which HTTP methods or communication options are supported by a server.

```http
OPTIONS /users HTTP/1.1
Host: example.com
```

A response might contain:

```http
Allow: GET, POST, PUT, DELETE, OPTIONS
```

---

# 📊 HTTP Status Codes

HTTP responses contain status codes that indicate the result of a request.

### 1xx — Informational

```text
100 Continue
101 Switching Protocols
```

### 2xx — Success

```text
200 OK
201 Created
202 Accepted
204 No Content
```

### 3xx — Redirection

```text
301 Moved Permanently
302 Found
304 Not Modified
```

### 4xx — Client Errors

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
405 Method Not Allowed
```

### 5xx — Server Errors

```text
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

---

# 💻 HTTP Source Code Examples



# 🌍 HTTP Request Using JavaScript

Modern JavaScript can make HTTP requests using `fetch()`.

```javascript
fetch("https://example.com/api/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
```

### POST Request

```javascript
fetch("https://example.com/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "John",
        age: 25
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

---

# 🖥️ Simple HTTP Server Using Node.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Hello from Node.js HTTP Server!");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

Run:

```bash
node server.js
```

Then visit:

```text
http://localhost:3000
```

---

# 🔄 HTTP Request/Response Example

Suppose a client wants to retrieve user information.

### Client Request

```http
GET /api/users/1 HTTP/1.1
Host: example.com
Accept: application/json
```

### Server Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": 1,
    "name": "John",
    "email": "john@example.com"
}
```

The communication flow is:

```text
Browser
   |
   | GET /api/users/1
   |
   v
Web Server
   |
   | 200 OK + JSON
   |
   v
Browser
```

---

# 🔐 HTTP vs HTTPS

**HTTP** sends data without transport-layer encryption.

**HTTPS (HTTP Secure)** uses **TLS** to protect HTTP communication.

```text
HTTP
Client ---------> Server

HTTPS
Client =====TLS=====> Server
```

For websites handling passwords, payments, personal information, or other sensitive data, HTTPS is essential.

---

# 📚 Summary

HTTP is a protocol that allows clients and servers to communicate.

The most commonly used HTTP methods are:

```text
GET       → Read data
POST      → Create data
PUT       → Replace/update data
PATCH     → Partially update data
DELETE    → Delete data
HEAD      → Get headers
OPTIONS   → Check supported operations
```

The basic HTTP communication model is:

```text
       HTTP Request
Client ---------------> Server
       <---------------
       HTTP Response
```

HTTP is fundamental to websites, REST APIs, web applications, mobile applications, and many other networked systems.

----------------------------------------------------------------------------------------------------------------------------------------------

# Postman
 
 
# 📌 Introduction

Postman is an API development and testing tool used to send HTTP requests to a server and check its responses.

It is useful for testing APIs before connecting them to a frontend application.

🔹 HTTP Methods in Postman

Postman supports common HTTP methods:

GET — Retrieve data
POST — Create/send data
PUT — Update data
PATCH — Partially update data
DELETE — Delete data
🔹 Example

For a user registration API:

POST http://localhost:8000/api/v1/users/register

Request body:

{
    "username": "sakshi",
    "email": "sakshi@example.com",
    "password": "123456"
}

The server might respond:

{
    "message": "User registered successfully"
}


# 🔹 Why Use Postman?
Test APIs easily
Send different types of HTTP requests
Test request body, headers, and authentication
View server responses and status codes
Debug backend APIs

🚀 Basic Flow
Postman
   ↓
HTTP Request
   ↓
Backend Server
   ↓
HTTP Response
   ↓
Postman

# Postman makes it easy to develop, test, and debug REST APIs.



