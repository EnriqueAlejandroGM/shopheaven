$('.product-name').on('click', function() {
    const productName = $(this).text();
    const productPrice = $(this).closest('tr').find('.product-price').text();
    alert("Product Details:\n" + productName + "\nPrice: " + productPrice);
    console.log("JALA1")

});

$('#products-table tbody tr').on('dblclick', function() {
    let favorites = [];
    const productName = $(this).find('td:eq(1)').text(); // Get product name from the second column
    favorites.push(productName);
    alert(productName + " has been added to your Favorites!");
    console.log("JALA2")

});

$('#search-bar').on('focus', function() {
    console.log("User is searching...");
    $(this).css('background-color', '#e0f7fa'); // Change background on focus
}).on('blur', function() {
    $(this).css('background-color', ''); // Reset background on blur
});
