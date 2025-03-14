// Function to load and display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart-list')) || [];
    const cartList = document.getElementById('cart-list');
    const orderSummary = document.getElementById('order-summary');

    cartList.innerHTML = '';
    orderSummary.innerHTML = '';

    let totalBill = 0;

    // Create a table for the order summary
    const summaryTable = document.createElement('table');
    summaryTable.className = 'summary-table';
    summaryTable.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
    `;

    // Display cart list items
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="cart-item">
                <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}" width="100" height="100">
                </div>
                <div class="cart-detail">
                    <span>${item.name}</span><br><br>
                    <span>Price: $${item.price}</span><br><br>
                    <span>Quantity: ${item.quantity}</span>
                </div>
                <div class="delete_icon">
                    <a href="#" data-index="${index}"><img src="images/delete.png" alt="delete" width="30" height="30"></a>
                </div>
            </div>
        `;
        cartList.appendChild(listItem);

        // Calculate the total bill
        totalBill += item.price * item.quantity;

        // Display the summary rows
        const summaryRow = document.createElement('tr');
        summaryRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        summaryTable.appendChild(summaryRow);
    });

    orderSummary.appendChild(summaryTable);

    // Displaying a horisontal line
    const horLine = document.createElement('hr');
    horLine.className = 'total_line';
    orderSummary.appendChild(horLine);

    // Displaying the total bill row
    const totalBillElement = document.createElement('div');
    totalBillElement.innerHTML = `<strong><span class="text">Total Bill: </span><span class="bill">$${totalBill.toFixed(2)}</span></strong><br>`;
    orderSummary.appendChild(totalBillElement);
    orderSummary.appendChild(horLine.cloneNode());

    // Add the checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.id = 'checkout-button';
    checkoutButton.innerHTML = `<h3>Checkout</h3>`;
    orderSummary.appendChild(checkoutButton);

    // Add the back to shopping button
    const backButton = document.createElement('button');
    backButton.id = 'back-button';
    backButton.innerHTML = `<a href="shop.html"><h3>Continue Shopping</h3></a>`;
    orderSummary.appendChild(backButton);

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete_icon a');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const index = this.getAttribute('data-index');
            deleteCartItem(index);
        });
    });

    // Add event listener to checkout button
    checkoutButton.addEventListener('click', handleCheckout);
}

// Function to handle checkout button click
function handleCheckout(event) {
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
        event.preventDefault(); // Preventing the user from being checkout
    } else {
        // Clear the cart and proceed to checkout page
        localStorage.removeItem('cart-list');
        window.location.href = 'payment_gate.html'; // Redirect to payment page
    }
}

// Function to get cart items from local storage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cart-list')) || [];
}

// Function to delete a cart item
function deleteCartItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart-list')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart-list', JSON.stringify(cart)); // Save the updated cart back to local storage
    displayCartItems(); // Refresh the displayed cart
}

// Call displayCartItems when the page loads
document.addEventListener('DOMContentLoaded', displayCartItems);