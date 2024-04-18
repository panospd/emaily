import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}`,
            },
        });

        if (error) {
            setMessage(error.message);
            console.log(message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment status: " + paymentIntent.status);
            console.log(message);
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="row" style={{ marginTop: "0.5em" }}>
                <button
                    className="waves-effect waves-light btn"
                    disabled={isProcessing}
                >
                    Submit
                </button>
                <span
                    style={{
                        paddingLeft: "0.5em",
                    }}
                    id="button-text"
                >
                    {isProcessing ? "Processing ..." : "Pay now"}
                </span>
            </div>
        </form>
    );
};

export default CheckoutForm;
