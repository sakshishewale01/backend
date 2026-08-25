# Backend Setup — Day 3

## 1. Create the Backend Folder

Inside the `Day3` folder:

```text
Day3/
├── Backend/
└── Frontend/
```

Move into the backend folder:

```powershell
cd Backend
```

---

## 2. Initialize Node.js Project

Create a `package.json`:

```powershell
npm init 
```

This creates:

```text
package.json
```

The `package.json` contains project information, dependencies, and scripts.

---

## 3. Install Express

Install Express:

```powershell
npm install express
```

Express is used to create the backend server and API routes.

---

## 4. Install Required Packages (Optional for Day 3)

Depending on the project, install additional packages.

For example:

```powershell
npm install cors
```

If you are using environment variables:

```powershell
npm install dotenv
```

If you are connecting to MongoDB:

```powershell
npm install mongoose
```

For development with automatic server restart:

```powershell
npm install --save-dev nodemon
```

---

## 5. Create the Server File

Create a backend entry file such as:

```text
server.js/index.js
```

Basic Express server:

```javascript
import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 6. Configure ES Modules

If using:

```javascript
import express from "express";
```

your `package.json` should contain:

```json
"type": "module"
```

Example:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module"
}
```

This allows us to use modern `import`/`export` syntax.

---

## 7. Add npm Start Script

Inside `package.json`, add:

```json
"scripts": {
  "start": "node server.js"/"node index.js"
}
```

Now instead of:

```powershell
node server.js
```

you can run:

```powershell
npm start
```

---

## 8. Start the Backend

From the Backend directory:

```powershell
npm start
```

Expected output:

```text
Server running on port 3000
```

The backend is now available at:

```text
http://localhost:3000
```

---

# 9. Create an API Route

For the Day 3 project, the frontend requests:

```text
GET /api/jokes
```

Create the route in Express:

```javascript
app.get("/api/jokes", (req, res) => {
  res.json([
    {
      id: 1,
      joke: "This is a joke"
    },
    {
      id: 2,
      joke: "Another joke"
    }
  ]);
});
```

Now the complete URL becomes:

```text
http://localhost:3000/api/jokes
```

---

# 10. Test the Backend Directly

Before testing React, first test the backend.

Open your browser and enter:

```text
http://localhost:3000
```

You should get:

```text
Backend is running
```

Then test the API:

```text
http://localhost:3000/api/jokes
```

You should receive JSON.

Example:

```json
[
  {
    "id": 1,
    "joke": "This is a joke"
  },
  {
    "id": 2,
    "joke": "Another joke"
  }
]
```

If this works, your backend API is working correctly.

---

# 11. CORS
(Didn't Use CORS installation into Day3) 
If frontend and backend are running on different origins, CORS may be required.

Install:

```powershell
npm install cors
```

Import it:

```javascript
import cors from "cors";
```

Enable it:

```javascript
app.use(cors());
```

Example:

```javascript
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/jokes", (req, res) => {
  res.json([
    {
      id: 1,
      joke: "This is a joke"
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# 12. Connect Frontend to Backend

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

Frontend sends:

```javascript
axios.get("/api/jokes");
```

Vite proxy forwards it to:

```text
http://localhost:3000/api/jokes
```

Backend responds with JSON.

---

# 13. Complete Request Flow

```text
Browser
   ↓
React Frontend
   ↓
Axios
   ↓
/api/jokes
   ↓
Vite Proxy
   ↓
localhost:3000
   ↓
Express
   ↓
GET /api/jokes
   ↓
JSON Response
   ↓
Axios
   ↓
React State
   ↓
UI
```

---

# 14. Backend Debugging

If you get:

```text
ECONNREFUSED
```

Check:

```text
Is the backend running?
Is it running on port 3000?
Is the frontend proxy pointing to port 3000?
```

If you get:

```text
404 Not Found
```

Check whether the route exists:

```javascript
app.get("/api/jokes", ...)
```

If you get:

```text
500 Internal Server Error
```

Check the backend terminal for the actual error.

---

# 15. Backend Development Workflow

Every time you work on the project:

### Terminal 1 — Backend

```powershell
cd Day3\Backend
npm start
```

Expected:

```text
Server running on port 3000
```

### Terminal 2 — Frontend

```powershell
cd Day3\Frontend\vite-project
npm run dev
```

Expected:

```text
Local: http://localhost:5173/
```

### Browser

Open:

```text
http://localhost:5173/
```

---

# 16. Backend Folder Structure

A simple version:

```text
Backend/
│
├── node_modules/
├── package.json
├── package-lock.json
└── server.js
```

As the project grows, a better structure is:

```text
Backend/
│
├── node_modules/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── .env
├── server.js
├── package.json
└── package-lock.json
```

---

# 17. Important Backend Concepts 

Remember:

### Node.js

Runtime that allows JavaScript to run outside the browser.

### Express.js

Framework used to build APIs and web servers using Node.js.

### Route

Defines how the server responds to a particular URL and HTTP method.

Example:

```javascript
app.get("/api/jokes", ...)
```

### Middleware

Functions that execute during the request-response cycle.

Example:

```javascript
app.use(express.json());
```

### Request

Information sent from the client to the server.

```javascript
req
```

### Response

Information sent from the server back to the client.

```javascript
res
```

### JSON

Common format for sending structured data between frontend and backend.

---

# 18.  Revision — Backend


> I created a Node.js backend using Express. I initialized the project using npm, installed Express and other required middleware, created a server, and configured it to listen on port 3000. I created REST API routes such as `/api/jokes`. The React frontend communicates with these routes using Axios. During development, Vite proxies `/api` requests from the frontend running on port 5173 to the backend running on port 3000.

---

# 19. ⭐ Backend Commands to Remember

```powershell
npm init 
npm install express
npm install cors
npm install dotenv
npm install mongoose
npm install --save-dev nodemon
npm start
```

---

# 20. ⭐ Day 3 Full-Stack Startup

Before demonstrating your project:

```text
1. Start Backend
        ↓
   npm start
        ↓
   localhost:3000

2. Start Frontend
        ↓
   npm run dev
        ↓
   localhost:5173

3. Open Browser
        ↓
   localhost:5173

4. React requests /api/jokes
        ↓
   Vite Proxy
        ↓
   Backend :3000
        ↓
   JSON Response
        ↓
   React displays data
```

**Remember:** The backend must be running before API requests from the frontend can work.
