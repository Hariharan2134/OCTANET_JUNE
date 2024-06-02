document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var emailInput = document.getElementById('email');
    var successMessage = document.getElementById('success-message');
    
    if (emailInput.value) {
        successMessage.style.display = 'block';
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});
