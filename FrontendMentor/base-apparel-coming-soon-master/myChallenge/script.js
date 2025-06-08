document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.querySelector('.submitBtn');
    const emailInput = document.querySelector('.email');
    const errorIcon = document.querySelector('.error-icon');
    const errorText = document.querySelector('.error-text');

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();

        const email = emailInput.value;

        if (email.includes('@') && email.includes('.')){

            // valid :
            emailInput.classList.remove('error');
            errorIcon.style.display ='none';
            errorText.style.display = 'none';
            alert('Successfully signed up!');
           
        }else {
           // invalid
           emailInput.classList.add('error');
           errorIcon.style.display = 'block';
           errorText.style.display = 'block';
        }



    });
    
});