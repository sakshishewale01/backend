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
> Try to create simple password, avoid to add specila character.

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

**Never push your MongoDB username or password to GitHub.**
