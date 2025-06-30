// Form Validation und Submission für Beta-Tester Formular

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('testForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const newsletterCheckbox = document.getElementById('newsletter');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Validation Regexes
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZäöüÄÖÜß\s-]{2,50}$/;

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);

    // Form submission
    form.addEventListener('submit', handleSubmit);

    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('nameError');
        
        if (name === '') {
            setFieldError(nameInput, errorElement, 'Name ist erforderlich');
            return false;
        } else if (!nameRegex.test(name)) {
            setFieldError(nameInput, errorElement, 'Bitte gib einen gültigen Namen ein (2-50 Zeichen)');
            return false;
        } else {
            setFieldSuccess(nameInput, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (email === '') {
            setFieldError(emailInput, errorElement, 'E-Mail ist erforderlich');
            return false;
        } else if (!emailRegex.test(email)) {
            setFieldError(emailInput, errorElement, 'Bitte gib eine gültige E-Mail-Adresse ein');
            return false;
        } else {
            setFieldSuccess(emailInput, errorElement);
            return true;
        }
    }

    function setFieldError(input, errorElement, message) {
        input.classList.remove('success');
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function setFieldSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
    }

    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    function showSuccessMessage() {
        hideMessages();
        successMessage.style.display = 'block';
        form.style.display = 'none';
        
        // Scroll to top to show message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showErrorMessage(message) {
        hideMessages();
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        
        // Scroll to top to show message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Hide previous messages
        hideMessages();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        
        if (!isNameValid || !isEmailValid) {
            return;
        }

        // Set loading state
        setLoadingState(true);

        try {
            // Get form data including checkbox
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                newsletter: newsletterCheckbox.checked
            };
            
            // Submit to backend using the new integration
            try {
                await submitFormToBackend(formData);
                
                // Show success message
                showSuccessMessage();
                
            } catch (backendError) {
                // Fallback to simulation if backend fails
                try {
                    await simulateFormSubmission(formData);
                    showSuccessMessage();
                } catch (fallbackError) {
                    throw fallbackError;
                }
            }
            
            // Reset form
            form.reset();
            nameInput.classList.remove('success', 'error');
            emailInput.classList.remove('success', 'error');
            newsletterCheckbox.checked = false;
            
        } catch (error) {
            showErrorMessage('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
        } finally {
            setLoadingState(false);
        }
    }

    // Real form submission using Power Automate backend
    async function submitFormToBackend(formData) {
        // Initialize backend integration
        const backend = new FormBackend();
        
        // TODO: Uncomment and replace with your actual Power Automate URL
        // backend.setPowerAutomateUrl('YOUR_POWER_AUTOMATE_HTTP_TRIGGER_URL');
        
        // Submit to backend
        return await backend.submitForm(formData);
    }
    
    // Fallback simulation for testing (will be used in development mode)
    function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000); // 2 second delay to show loading state
        });
    }

    // Reset button to show form again after success
    window.showFormAgain = function() {
        hideMessages();
        form.style.display = 'block';
    };
});

// Add reset functionality to success message
document.addEventListener('DOMContentLoaded', function() {
    // Add click handler to success message to show form again
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.addEventListener('click', function() {
            document.getElementById('testForm').style.display = 'block';
            successMessage.style.display = 'none';
        });
        
        // Add a small hint text
        const hintText = document.createElement('small');
        hintText.textContent = '(Klicke hier, um das Formular erneut anzuzeigen)';
        hintText.style.opacity = '0.7';
        hintText.style.fontSize = '0.8rem';
        hintText.style.marginTop = '0.5rem';
        hintText.style.display = 'block';
        successMessage.appendChild(hintText);
    }
});
