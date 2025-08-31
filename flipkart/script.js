document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.products-grid');
    const productCategories = document.querySelector('.product-categories');
    const dealsGrid = document.querySelector('.deals-grid');
    const cartCountSpan = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartIconLink = document.querySelector('.nav-links li:nth-child(4) a'); // Assuming Cart is the 4th link
    const messageContainer = document.getElementById('message-container');
    const emptyCartButton = document.querySelector('.empty-cart-button');

    let cart = [];

    function updateCartCount() {
        cartCountSpan.textContent = cart.length;
    }

    function calculateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity;
        });
        cartTotalSpan.textContent = total.toFixed(2);
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="remove-from-cart-btn" data-item-name="${item.name}">Remove</button>
                    </div>
                    <p class="cart-item-price">${item.price}</p>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        calculateCartTotal();
    }

    function openCartModal() {
        cartModal.style.display = 'flex';
        displayCartItems();
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemName = event.target.dataset.itemName;
                removeItemFromCart(itemName);
            });
        });
    }

    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    function removeItemFromCart(itemName) {
        cart = cart.filter(item => item.name !== itemName);
        updateCartCount();
        displayCartItems();
    }

    function emptyCart() {
        cart = [];
        updateCartCount();
        displayCartItems();
        showMessage('Cart has been emptied!');
    }

    const categories = [
        { name: 'Mobiles', image: 'images/iphone14.avif' },
        { name: 'Electronics', image: 'images/samsungtv.png' },
        { name: 'Fashion', image: 'images/pumashoe.jpg' },
        { name: 'Home', image: 'images/lg washing.jpg' },
        { name: 'Appliances', image: 'images/voltas.webp' },
        { name: 'Beauty, Toys & More', image: 'images/boatheadset.webp' }
    ];

    const products = [
        { name: 'iPhone 14', price: '₹69,999', image: 'images/iphone14.avif' },
        { name: 'Samsung Smart TV', price: '₹45,000', image: 'images/samsungtv.png' },
        { name: 'Puma Running Shoes', price: '₹2,999', image: 'images/pumashoe.jpg' },
        { name: 'LG Washing Machine', price: '₹25,000', image: 'images/lg washing.jpg' },
        { name: 'Voltas AC', price: '₹32,000', image: 'images/voltas.webp' },
        { name: 'Boat Headset', price: '₹1,299', image: 'images/boatheadset.webp' },
        { name: 'Redmi Note 12 Pro', price: '₹18,999', image: 'images/iphone14.avif' },
        { name: 'Sony Bravia TV', price: '₹75,000', image: 'images/samsungtv.png' },
        { name: 'Nike Air Max', price: '₹5,499', image: 'images/pumashoe.jpg' },
        { name: 'Whirlpool Refrigerator', price: '₹28,000', image: 'images/lg washing.jpg' },
        { name: 'Daikin Inverter AC', price: '₹40,000', image: 'images/voltas.webp' },
        { name: 'JBL Bluetooth Speaker', price: '₹3,499', image: 'images/boatheadset.webp' }
    ];

    const specialDeals = [
        { name: 'Min. 60% Off', price: 'Shop Now', image: 'images/min60%.jpeg' },
        { name: 'Top Deals', price: 'Grab Now', image: 'images/img60%.jpg' }
    ];

    // Populate categories
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <a href="#">${category.name}</a>
        `;
        productCategories.appendChild(categoryDiv);
    });

    // Populate products
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <button class="add-to-cart-btn" data-product-id="${index}">Add to Cart</button>
        `;
        productsGrid.appendChild(productCard);
    });

    // Populate special deals
    specialDeals.forEach((deal, index) => {
        const dealCard = document.createElement('div');
        dealCard.classList.add('product-card'); // Reusing product-card style
        dealCard.innerHTML = `
            <img src="${deal.image}" alt="${deal.name}">
            <h3>${deal.name}</h3>
            <p class="price">${deal.price}</p>
            <button class="view-deal-btn" data-deal-id="${index}">View Deal</button>
        `;
        dealsGrid.appendChild(dealCard);
    });

    // Add to cart functionality
    productsGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.productId;
            const productToAdd = { ...products[productId], quantity: 1 };

            const existingItem = cart.find(item => item.name === productToAdd.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(productToAdd);
            }
            updateCartCount();
            showMessage(`${productToAdd.name} added to cart!`);
        }
    });

    function showMessage(message) {
        const messageItem = document.createElement('div');
        messageItem.classList.add('message-item');
        messageItem.textContent = message;
        messageContainer.appendChild(messageItem);

        setTimeout(() => {
            messageItem.remove();
        }, 3000); // Matches the animation duration
    }

    // Open cart modal
    cartIconLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        openCartModal();
    });

    // Close cart modal
    closeButton.addEventListener('click', closeCartModal);
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });

    emptyCartButton.addEventListener('click', emptyCart);

    updateCartCount(); // Initialize cart count display on load
});
