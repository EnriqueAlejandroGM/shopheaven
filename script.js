$(document).ready(function() {
    let cart = [];
    let favorites = [];

    $('#products-table').DataTable();

    function updateCart() {
        let cartItems = '';
        let total = 0;
        console.log("JALAAAAA")

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            cartItems += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}
                    <div>
                        <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-index="${index}">-</button>
                        <button class="btn btn-sm btn-outline-secondary increase-quantity" data-index="${index}">+</button>
                        <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">Remove</button>
                    </div>
                </li>`;
            total += itemTotal;
        });

        $('#cart-items').html(cartItems);
        $('#cart-total').text(total.toFixed(2));
        $('#cart-count').text(cart.length);

    const cartUpdatedEvent = new CustomEvent("cartUpdated", {
        detail: { cart, total }
    });
    document.dispatchEvent(cartUpdatedEvent);
    }


document.addEventListener("cartUpdated", function(e) {
    console.log("Custom Event - Cart updated:", e.detail);
});

$('#checkout-btn').on('click', function() {
    alert('Proceeding to checkout!');
    

    const checkoutCompletedEvent = new CustomEvent("checkoutCompleted", {
        detail: { cart, total: $('#cart-total').text() }
    });
    document.dispatchEvent(checkoutCompletedEvent);

    cart = []; 
    updateCart();
    $('#cartModal').modal('hide');
});


document.addEventListener("checkoutCompleted", function(e) {
    console.log("Custom Event - Checkout completed:", e.detail);
});


    $('.add-to-cart').on('click', function() {
        const productName = $(this).data('name');
        const productPrice = parseFloat($(this).data('price'));
        const quantityInputId = $(this).data('quantity-input');
        const quantity = parseInt($('#' + quantityInputId).val());

        let existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += quantity; 
        } else {
            cart.push({ name: productName, price: productPrice, quantity: quantity });
        }

        updateCart();
    });

    $(document).on('click', '.increase-quantity', function() {
        const index = $(this).data('index');
        cart[index].quantity += 1;
        updateCart();
    
        // Trigger custom "quantityIncreased" event
        const quantityIncreasedEvent = new CustomEvent("quantityIncreased", {
            detail: { product: cart[index] }
        });
        document.dispatchEvent(quantityIncreasedEvent);
    });
    
    // Listen for the custom event
    document.addEventListener("quantityIncreased", function(e) {
        alert(`Increased quantity for ${e.detail.product.name} to ${e.detail.product.quantity}`);
    });
    

    $(document).on('click', '.decrease-quantity', function() {
        const index = $(this).data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); 
        }
        updateCart();
    });

    $(document).on('click', '.remove-item', function() {
        const index = $(this).data('index');
        cart.splice(index, 1);
        updateCart();
    });


});

const globalEmail = "enrique.agm2177@gmail.com";
const globalPassword = "123";
const globalRole = "admin"; 

let loggedInEmail = globalEmail;
let loggedInPassword = globalPassword;
let loggedInRole = globalRole; 

function updateUI() {
    const userNavLink = document.querySelector('a.nav-link[href="login.html"]');
    const navbarNav = document.querySelector('.navbar-nav');
    const productsTable = document.getElementById('products-table');
    const manageProductsSection = document.getElementById('manage-products-section');
    const cartLink = document.getElementById('cart-link');
    const footer = document.querySelector('footer');
    
    navbarNav.innerHTML = '';

    if (loggedInRole === 'admin') {
        userNavLink.innerHTML = "Admin ▼";
        navbarNav.insertAdjacentHTML('beforeend', `
            <li class="nav-item"><a class="nav-link" href="#">Admin Dashboard</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Manage Products</a></li>
            <li class="nav-item"><a class="nav-link" href="#">User Management</a></li>
        `);

        if (manageProductsSection) {
            manageProductsSection.style.display = 'block';  
        }

        if (productsTable) {
            productsTable.style.display = 'block';
        }

        if (cartLink) {
            cartLink.style.display = 'none';
        }

        if (footer) {
            footer.innerHTML = `
                <div class="container text-center">
                    <p>Admin Tools: Product and User Management</p>
                </div>
            `;
        }
    } else {
        userNavLink.innerHTML = "User ▼";
        navbarNav.insertAdjacentHTML('beforeend', `
            <li class="nav-item"><a class="nav-link" href="#">My Orders</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Profile</a></li>
        `);

        if (manageProductsSection) {
            manageProductsSection.style.display = 'none';
        }

        if (productsTable) {
            productsTable.style.display = 'block';
        }

        if (cartLink) {
            cartLink.style.display = 'block';
        }

        if (footer) {
            footer.innerHTML = `
                <div class="container text-center">
                    <p>Shop Haven: Enjoy Shopping and Explore New Deals!</p>
                </div>
            `;
        }
    }
}

window.onload = function() {
    updateUI();
};
