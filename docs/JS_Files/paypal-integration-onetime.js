// PayPal Integration for glocalSpirit - One-Time Payments (Temporary)

document.addEventListener('DOMContentLoaded', () => {
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded.');
        return;
    }

    const renderPayPalButtons = (container, amount, description) => {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount,
                            currency_code: 'EUR'
                        },
                        description: description
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Thank you for your donation, ' + details.payer.name.given_name + '!');
                    console.log('Transaction completed by ' + details.payer.name.given_name);
                    // Here you can redirect to a success page or send data to your backend
                });
            },
            onError: function(err) {
                console.error('An error occurred during the transaction', err);
                alert('An error occurred. Please try again.');
            }
        }).render(container);
    };

    // Render buttons for each package - One-time payments
    renderPayPalButtons('#paypal-button-container-earlybird', '22.00', 'glocalSpirit Early Bird Support');
    renderPayPalButtons('#paypal-button-container-premium', '44.00', 'glocalSpirit Premium Support');
    renderPayPalButtons('#paypal-button-container-celebration', '55.00', 'glocalSpirit Celebration Support');
});
