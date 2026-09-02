# VideoTube 🎥

VideoTube is a backend project for a video-sharing platform built with **Node.js, Express.js, MongoDB, and Mongoose**. It provides REST APIs for managing users, videos, comments, likes, playlists, subscriptions, tweets, and more.

## 🚀 Features

* User registration, login and authentication
* JWT-based access and refresh token authentication
* Password hashing using bcrypt
* Video upload and management
* Cloudinary integration for media storage
* Like and unlike videos
* Comments and replies
* Create and manage playlists
* Subscribe and unsubscribe to channels
* Tweet management
* User profile management
* Dashboard APIs
* Health check API
* Pagination for database queries
* Error handling and API response utilities

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **Cloudinary**
* **Multer**
* **Cookie Parser**

## 📁 Project Structure

```text
src/
├── controllers/
├── db/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── constants.js
└── index.js
```

## ⚙️ Setup

Clone the repository and install the dependencies:

```bash
git clone <your-repository-url>
cd VideoTube
npm install
```

Create a `.env` file using `.env.sample` and add your MongoDB, JWT and Cloudinary configuration.

Start the development server:

```bash
npm run dev
```

The backend will run on the configured port.

## 🎯 Purpose

This project was developed to understand how to build a **complete production-style backend** using Node.js and Express, including authentication, database relationships, file uploads, API architecture, middleware, and error handling.

## 👩‍💻 Author

**Sakshi Shewale**
