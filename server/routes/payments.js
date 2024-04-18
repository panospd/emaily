const stripe = require("../services/stripe");

module.exports = (app) => {
    app.post("/api/payment/confirm", async (req, res) => {
        try {
            console.log("creating payment intent");
            const intent = await stripe.paymentIntents.create({
                confirm: true,
                currency: "usd",
                amount: 500,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never",
                },
                confirmation_token: req.body.confirmationToken,
            });

            res.send({
                clientSecret: intent.client_secret,
                status: intent.status,
            });
        } catch (e) {
            return res.status(400).send({
                error: e.message,
            });
        }
    });
};
