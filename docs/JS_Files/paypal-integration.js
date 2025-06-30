// PayPal Integration for glocalSpirit - LIVE PAYMENTS ACTIVE ✅

document.addEventListener('DOMContentLoaded', () => {
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded.');
        return;
    }

    const renderPayPalButtons = (container, amount, packageName) => {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount,
                            currency_code: 'EUR'
                        },
                        description: `glocalSpirit ${packageName} Support`
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert(`Thank you for your ${packageName} support! Payment ID: ${details.id}`);
                    // Redirect to success page
                    window.location.href = 'spenden-success.html';
                });
            },
            onError: function(err) {
                console.error('An error occurred during the transaction', err);
                alert('An error occurred during payment. Please try again.');
            }
        }).render(container);
    };

    // Render buttons for each package - ONE-TIME PAYMENTS
    renderPayPalButtons('#paypal-button-container-earlybird', '22.00', 'Early Bird');
    renderPayPalButtons('#paypal-button-container-premium', '44.00', 'Premium');
    renderPayPalButtons('#paypal-button-container-celebration', '55.00', 'Celebration');
});
