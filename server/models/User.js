const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: 0,
});

mongoose.model("users", userSchema);
