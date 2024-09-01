const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.configDotenv();

const PORT = Number(process.env.PORT ?? 8000);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

// app.use("/", router)

app.use("/", (req, res) => {
    res.status(200).json({
        "server" : "OK"
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
