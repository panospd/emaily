import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

function Payment(props) {
    const [stripePromise, setStringPromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const publishableKey = import.meta.env.VITE_STRIPE_KEY;
        setStringPromise(loadStripe(publishableKey));
    }, []);

    useEffect(() => {
        axios.post("/api/payment-intent", {}).then((res) => {
            setClientSecret(res.data.clientSecret);
        });
    }, []);

    return (
        <>
            <h1>React stripe and the payment element</h1>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;
