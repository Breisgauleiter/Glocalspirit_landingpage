// PayPal Integration - Diagnostic Version with Enhanced Error Handling

document.addEventListener('DOMContentLoaded', () => {
    if (typeof paypal === 'undefined') {
        console.error('PayPal SDK not loaded.');
        return;
    }

    // Enhanced error logging
    const logError = (context, error) => {
        console.error(`PayPal Error [${context}]:`, error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
    };

    const renderPayPalButtons = (container, planId, packageName) => {
        console.log(`Attempting to render PayPal button for ${packageName} with Plan ID: ${planId}`);
        
        paypal.Buttons({
            createSubscription: function(data, actions) {
                console.log(`Creating subscription for ${packageName} with Plan ID: ${planId}`);
                
                return actions.subscription.create({
                    'plan_id': planId 
                }).then(function(subscriptionId) {
                    console.log(`Subscription created successfully: ${subscriptionId}`);
                    return subscriptionId;
                }).catch(function(error) {
                    logError(`createSubscription for ${packageName}`, error);
                    throw error;
                });
            },
            onApprove: function(data, actions) {
                console.log(`Subscription approved for ${packageName}:`, data);
                alert(`You have successfully subscribed to ${packageName}! Subscription ID: ${data.subscriptionID}`); 
                // Here you can redirect to a success page or show a thank you message.
                // Optionally, you can send the subscription details to your backend for verification.
            },
            onError: function(err) {
                logError(`onError for ${packageName}`, err);
                alert(`An error occurred with ${packageName} subscription. Please try again or contact support.`);
            },
            onCancel: function(data) {
                console.log(`Subscription cancelled for ${packageName}:`, data);
                alert(`${packageName} subscription was cancelled.`);
            }
        }).render(container).then(function() {
            console.log(`PayPal button rendered successfully for ${packageName}`);
        }).catch(function(error) {
            logError(`render for ${packageName}`, error);
            console.error(`Failed to render PayPal button for ${packageName}`);
        });
    };

    // Add diagnostic info
    console.log('PayPal SDK loaded successfully');
    console.log('PayPal version:', paypal.version);
    
    // Render buttons for each package with enhanced logging
    renderPayPalButtons('#paypal-button-container-earlybird', 'PROD-4B8498668Y691522C', 'Early Bird');
    renderPayPalButtons('#paypal-button-container-premium', 'P-2VU77543UV675582DNBRJQ7Y', 'Premium');
    renderPayPalButtons('#paypal-button-container-celebration', 'P-54C28465DA3191451NBRJSEY', 'Celebration');
    
    console.log('All PayPal button rendering attempts completed');
});
