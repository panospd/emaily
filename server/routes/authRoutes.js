const passport = require("passport");

module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/surveys");
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        return res.send(req.user);
    });

    app.get("/api/current_user", (req, res) => {
        return res.send(req.user);
    });
};
