const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
