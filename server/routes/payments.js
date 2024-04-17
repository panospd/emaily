const stripe = require("../services/stripe");

module.exports = (app) => {
    app.post("/api/payment-intent", async (req, res) => {
        const body = req.body;
        console.log("body", body);
        try {
            console.log("creating payment intent");
            const paymentIntent = await stripe.paymentIntents.create({
                currency: "usd",
                amount: 1999,
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.send({ clientSecret: paymentIntent.client_secret });
        } catch (e) {
            return res.status(400).send({
                error: e.message,
            });
        }
    });
};
