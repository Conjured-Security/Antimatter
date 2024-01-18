const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.ANTIMATTER_API_PORT || 4201
app.listen(port, () => {
    console.log("Server Listening on port:", port);
});