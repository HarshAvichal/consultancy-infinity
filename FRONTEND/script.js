import Toastify from 'toastify-js'
function isValidName(name) {
    const nameRegex = /^[a-zA-Z]+$/; 
    return nameRegex.test(name);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^(?!0)\d{10}$/;  
    return phoneRegex.test(phone);
}

function showToastSuccess(message){
    Toastify({
        text: message,
        duration: 3000,
        backgroundColor: 'Green'
    }).showToast();
}

function showToastError(message){
    Toastify({
        text: message,
        duration: 3000,
        backgroundColor: 'red'
    }).showToast();
}


document.getElementById('enquiry').addEventListener('submit', async (event) => {
    event.preventDefault();
    // Validate
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    // const textareaInput = document.getElementById('userMessage');

    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    // const textareaValue = textareaInput.value.trim();

    if (firstNameValue === '' || lastNameValue === '' || emailValue === '' || phoneValue === '') {
        // If any field is empty, show error toast
        Toastify({
            text: 'Please fill out all fields',
            duration: 3000,
            backgroundColor: 'red'
        }).showToast();
        return;
    }

    if (isValidPhoneNumber(phoneValue) && isValidName(firstNameValue) && isValidName(lastNameValue)){
        showToastSuccess("Enquiry Sent");
    }
    if(!isValidPhoneNumber(phoneValue)){
        showToastError("Invalid Phone Number")
    }
    
    if(!isValidName(firstNameValue)){
        showToastError("Invalid First Name")
    }

    if(!isValidName(lastNameValue)){
        showToastError("Invalid Last Name")
    }
    
    console.log("Hi")
    

// Gather form data
const formData = new FormData(event.target);
console.log(formData);
const formDataObject = {};
formData.forEach((value, key) => {
    formDataObject[key] = value;
});
console.log(formDataObject)

try {
    // Send form data to backend server
    const response = await fetch('https://infinity-consultancy.vercel.app/api/v1/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    });
    console.log("After sending to backend")
    console.log(formDataObject);

    if (!response) {
        throw new Error('Failed to submit form');
    }

    const data = await response.json();
    console.log('Form submitted successfully:', data);

} catch (error) {
    console.error('Error submitting form:', error);

}
});

