# Backend Project Setup 🚀

A professional **Node.js + Express.js backend project setup** with a clean and scalable folder structure.

## 📂 Project Structure

```text
backend/
│
├── src/
│   ├── controllers/     # Request & business logic
│   ├── db/              # Database connection
│   ├── middlewares/     # Middleware functions
│   ├── models/          # Database schemas/models
│   ├── routes/          # API routes
│   ├── utils/           # Reusable utility functions
│   │
│   ├── app.js           # Express application setup
│   ├── index.js         # Server entry point
│   └── constants.js     # Application constants
│
├── public/              # Public/static files
├── .env                 # Environment variables
├── .env.sample          # Environment variable template
├── .gitignore           # Files ignored by Git
├── .prettierrc          # Prettier configuration
├── package.json         # Dependencies & scripts
└── README.md            # Project documentation
```

## 🛠️ Setup

```bash
# Create project
mkdir backend
cd backend
npm init -y

# Install Express
npm install express

# Install development tools
npm install -D nodemon prettier
```

## 📌 Folder & File Uses

| Folder/File    | Purpose                                       |
| -------------- | --------------------------------------------- |
| `controllers/` | Handles application/business logic            |
| `db/`          | Database connection                           |
| `middlewares/` | Authentication, error handling, etc.          |
| `models/`      | Database schemas and models                   |
| `routes/`      | API endpoints                                 |
| `utils/`       | Reusable helper functions                     |
| `app.js`       | Configures the Express application            |
| `index.js`     | Starts the backend server                     |
| `constants.js` | Stores reusable application constants         |
| `.env`         | Stores environment variables                  |
| `.env.sample`  | Template for required environment variables   |
| `.gitignore`   | Prevents unnecessary/sensitive files from Git |
| `.prettierrc`  | Prettier formatting configuration             |
| `package.json` | Project dependencies and scripts              |

## 🔄 Development Tools

* **Nodemon** – Automatically restarts the server when code changes.
* **Prettier** – Keeps code formatting consistent across the project.
* **Git** – Tracks project changes and versions.

## ▶️ Run the Server

```bash
npm run dev
```

This setup provides a clean foundation for developing a **scalable and production-ready backend**.
