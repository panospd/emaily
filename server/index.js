const express = require("express");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI);

const app = express();
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
