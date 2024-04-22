const { default: mongoose } = require("mongoose");
const requireCredits = require("../middleware/requireCredits");
const requireLogin = require("../middleware/requireLogin");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map((e) => ({
                email: e.trim(),
            })),
            _user: req.user.id,
            dateStent: Date.now(),
        });
    });
};
