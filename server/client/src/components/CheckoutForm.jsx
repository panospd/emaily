import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { useHistory } from "react-router-dom";

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setMessage(submitError.message);
            setIsProcessing(false);
            return;
        }

        const { error, confirmationToken } =
            await stripe.createConfirmationToken({
                elements,
            });

        if (error) {
            setMessage(error.message);
        } else {
            props.confirmPayment(confirmationToken.id);
        }

        setIsProcessing(false);
        history.push("/");
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

export default connect(null, actions)(CheckoutForm);
