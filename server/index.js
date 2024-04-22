const express = require("express");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./models/Survey");
require("./services/passport");

const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI);

const app = express();
app.use(express.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/payments")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
    // express will serve up production assets (main.js or main.css for example)
    app.use(express.static("client/dist"));

    // express will serve up the index file
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
