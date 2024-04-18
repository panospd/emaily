import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

function Payment(props) {
    const [stripePromise, setStringPromise] = useState(null);

    useEffect(() => {
        const publishableKey = import.meta.env.VITE_STRIPE_KEY;
        setStringPromise(loadStripe(publishableKey));
    }, []);

    const options = {
        mode: "payment",
        amount: 500,
        currency: "usd",
        paymentMethodCreation: "manual",
        appearance: {
            /*...*/
        },
    };

    return (
        <>
            <h1>React stripe and the payment element</h1>
            {stripePromise && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;
