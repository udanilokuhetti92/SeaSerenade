// Function to add item to cart
function addToCart(name, price, image, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart-list')) || [];

    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }

    // Storing cart items to the local storage
    localStorage.setItem('cart-list', JSON.stringify(cart));

    // Give the success alert message to the user
    alert(`${name} has been added to your cart.`);
}

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to update product details
function updateProductDetails() {
    const name = getUrlParameter('name');
    const price = getUrlParameter('price');
    const image = getUrlParameter('image');
    const code = getUrlParameter('code');

    document.getElementById('product-name').textContent = name;
    document.getElementById('product-price').textContent = `Price: $${price}`;
    document.getElementById('product-image').src = image;
    document.getElementById('product-code').textContent = `Code: ${code}`;
}

// Function to navigate to the product detail page with the parameters
function viewProduct(name, price, image, code) {
    const encodedName = encodeURIComponent(name);
    const encodedPrice = encodeURIComponent(price);
    const encodedImage = encodeURIComponent(image);
    const encodedCode = encodeURIComponent(code);

    const url = `item.html?name=${encodedName}&price=${encodedPrice}&image=${encodedImage}&code=${encodedCode}`;

    window.location.href = url;
}

// Event listener for add to cart button
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('[data-add-to-cart]');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            const name = document.getElementById('product-name').textContent;
            const price = parseFloat(document.getElementById('product-price').textContent.replace('Price: $', ''));
            const image = document.getElementById('product-image').src;
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            console.log(`Adding to cart: ${name}, ${price}, ${image}, ${quantity}`);
            addToCart(name, price, image, quantity);
        });
    }
});

// Event listener for the accordion in the checkout forms
document.addEventListener('DOMContentLoaded', function () {
    const accordions = document.querySelectorAll('.accordion-title');
    accordions.forEach(accordion => {
        accordion.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

// Form validation
function formValidation() {
    let cardNumber = document.getElementById('card-number');
    let cardHolder = document.getElementById('card-holder-name');
    let expire = document.getElementById('expiry-date');
    let ccv = document.getElementById('ccv');
    let address = document.getElementById('address-1');
    let city = document.getElementById('city');
    let zip = document.getElementById('zip-code');
    let country = document.getElementById('country');
    let fName = document.getElementById('f_name');
    let sName = document.getElementById('s_name');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');

    let isValid = true;
    
    // Clear previous error styling
    clearErrors();

    // Helper function to validate numeric inputs
    function isNumeric(value) {
        return /^\d+$/.test(value);
    }

    // Validate card number (should be numeric)
    if (cardNumber.value.trim() === "" || !isNumeric(cardNumber.value)) {
        alert("Card number must be filled out with digits only!");
        cardNumber.classList.add('invalid');
        isValid = false;
    }

    // Validate card holder name (should not contain numbers)
    if (cardHolder.value.trim() === "" || /\d/.test(cardHolder.value)) {
        alert("Card Holder Name must be filled out and cannot contain numbers!");
        cardHolder.classList.add('invalid');
        isValid = false;
    }

    // Validate expiry date (should be in a specific format, e.g., MM/YY)
    if (expire.value.trim() === "" || !/^\d{2}\/\d{2}$/.test(expire.value)) {
        alert("Expiry date must be filled out in MM/YY format!");
        expire.classList.add('invalid');
        isValid = false;
    }

    // Validate CCV (should be numeric)
    if (ccv.value.trim() === "" || !isNumeric(ccv.value)) {
        alert("CCV must be filled out with digits only!");
        ccv.classList.add('invalid');
        isValid = false;
    }

    // Validate address (should not contain numbers)
    if (address.value.trim() === "") {
        alert("Address line 1 must be filled out!");
        address.classList.add('invalid');
        isValid = false;
    }

    // Validate city (should not contain numbers)
    if (city.value.trim() === "" || /\d/.test(city.value)) {
        alert("City must be filled out and cannot contain numbers!");
        city.classList.add('invalid');
        isValid = false;
    }

    // Validate zip code (should be numeric)
    if (zip.value.trim() === "" || !isNumeric(zip.value)) {
        alert("Zip code must be filled out with digits only!");
        zip.classList.add('invalid');
        isValid = false;
    }

    // Validate country field (Should not be empty)
    if (country == ""){
        alert("Country field must be filled out!");
        country.classList.add('invalid');
        isValid = false;
    }

    // Validate first name (should not contain numbers)
    if (fName.value.trim() === "" || /\d/.test(fName.value)) {
        alert("First name must be filled out and cannot contain numbers!");
        fName.classList.add('invalid');
        isValid = false;
    }

    // Validate surname (should not contain numbers)
    if (sName.value.trim() === "" || /\d/.test(sName.value)) {
        alert("Surname must be filled out and cannot contain numbers!");
        sName.classList.add('invalid');
        isValid = false;
    }

    // Validate phone number (should be numeric and have 10 digits)
    if (phone.value.trim() === "" || !/^\d{10}$/.test(phone.value)) {
        alert("Phone number must be filled out with 10 digits only!");
        phone.classList.add('invalid');
        isValid = false;
    }

    // Validate email
    if (email.value.trim() === "") {
        alert("Email must be filled out!");
        email.classList.add('invalid');
        isValid = false;
    }

    if (isValid) {
        // All fields are valid; show success message
        alert("Form submitted successfully!");
    }

    return isValid;

}

// Helper function to clear all error styling
function clearErrors() {
    document.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
}

// Call updateProductDetails when the page loads
document.addEventListener('DOMContentLoaded', updateProductDetails);