import express from "express";
import users from "./user.js";
import cors from 'cors';

const app = express();

// Apply CORS middleware before defining routes
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your React dev server
}));

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.get("/api/user", (req, res) => {
    res.send(users);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
