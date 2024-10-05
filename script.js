$(document).ready(function() {
    let cart = [];

    // Initialize DataTable
    $('#products-table').DataTable();

    // Function to update the cart display
    function updateCart() {
        let cartItems = '';
        let total = 0;

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
    }

    // Add product to cart
    $('.add-to-cart').on('click', function() {
        const productName = $(this).data('name');
        const productPrice = parseFloat($(this).data('price'));
        const quantityInputId = $(this).data('quantity-input');
        const quantity = parseInt($('#' + quantityInputId).val());

        let existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += quantity; // Add input quantity if product is already in cart
        } else {
            cart.push({ name: productName, price: productPrice, quantity: quantity });
        }

        updateCart();
    });

    // Increase quantity in the cart
    $(document).on('click', '.increase-quantity', function() {
        const index = $(this).data('index');
        cart[index].quantity += 1;
        updateCart();
    });

    // Decrease quantity in the cart
    $(document).on('click', '.decrease-quantity', function() {
        const index = $(this).data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1); // Remove item if quantity is zero
        }
        updateCart();
    });

    // Remove product from cart
    $(document).on('click', '.remove-item', function() {
        const index = $(this).data('index');
        cart.splice(index, 1); // Remove the item at the given index
        updateCart();
    });

    // Checkout logic (you can replace this with actual checkout functionality)
    $('#checkout-btn').on('click', function() {
        alert('Proceeding to checkout!');
        cart = []; // Clear the cart after checkout
        updateCart();
        $('#cartModal').modal('hide');
    });
});
