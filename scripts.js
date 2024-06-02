document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var emailInput = document.getElementById('email');
    var email = emailInput.value;
    
    if (email) {
        document.getElementById('success-message').style.display = 'block';
        emailInput.value = '';
    }
});
    