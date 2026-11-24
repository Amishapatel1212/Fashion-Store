
// Product Data

const products = [

    {
        name: "Men's T-Shirt",
        price: 499,
        category: "Men",
        image: "images/tshirt.jpg"
    },

    {
        name: "Women's Dress",
        price: 899,
        category: "Women",
        image: "images/dress.jpg"
    },

    {
        name: "Casual Shirt",
        price: 699,
        category: "Men",
        image: "images/shirts.jpg"
    },

    {
        name: "Fashion Jacket",
        price: 1299,
        category: "Women",
        image: "images/jacket.jpg"
    },

    {
        name: "Men's Jeans",
        price: 799,
        category: "Men",
        image: "images/jeans.jpg"
    },

    {
        name: "Women's Handbag",
        price: 1600,
        category: "Women",
        image: "images/handbag.jpg"
    },

    {
        name: "Men's Shoes",
        price: 1499,
        category: "Men",
        image: "images/shoes.jpg"
    },

    {
        name: "Women's Kurti",
        price: 699,
        category: "Women",
        image: "images/kurti.jpg"
    }

];


// Display Products

const productGrid = document.getElementById("productGrid");


function displayProducts(items) {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    items.forEach(function(product) {

        let productIndex = products.indexOf(product);

        productGrid.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <a href="product.html?id=${productIndex}">
                    View Product
                </a>

            </div>
        `;

    });

}



// Search Products

const searchInput = document.getElementById("searchInput");

function filterProducts() {

    if (!searchInput || !productGrid) return;

    const searchValue = searchInput.value.toLowerCase();

    const category = document.getElementById("categoryFilter").value;

    const filtered = products.filter(function(product) {

        const matchName = product.name.toLowerCase().includes(searchValue);

        const matchCategory = category === "All" || product.category === category;

        return matchName && matchCategory;

    });

    displayProducts(filtered);
}


// Show All Products

if (productGrid) {

    displayProducts(products);

    searchInput.addEventListener("input", filterProducts);

    document.getElementById("categoryFilter").addEventListener("change", filterProducts);

}


// Add Product To Cart


function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = products[productId];

    let size = document.getElementById("size").value;

    cart.push({

        name: product.name,
        price: product.price,
        size: size,
        quantity: 1

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart!");

}


// Display Cart


// Display Cart

const cartItems = document.getElementById("cartItems");

function displayCart() {

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your Cart Is Empty!</p>";

    } else {

        cart.forEach(function(item, index) {

            total += item.price * item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <span>${item.name} - ₹${item.price}</span>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>
            `;

        });

    }

    document.getElementById("cartTotal").innerHTML =
        "Total: ₹" + total;

}


// Remove Product

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// Load Cart

if (cartItems) {
    displayCart();
}


// Show Selected Product

const productDetails = document.getElementById("productDetails");

if (productDetails) {

    const params = new URLSearchParams(window.location.search);

    const productId = Number(params.get("id"));

    const selectedProduct = products[productId];

    if (selectedProduct) {

        productDetails.innerHTML = `

            <img src="${selectedProduct.image}"
            alt="${selectedProduct.name}">

            <div>

                <h2>${selectedProduct.name}</h2>

                <h3>₹${selectedProduct.price}</h3>

                <p>Comfortable and stylish fashion product.</p>

                <label>Select Size:</label>

                <select id="size">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>XL</option>
                </select>

                <br><br>

                <button onclick="addToCart(${productId})">
                    Add To Cart
                </button>

            </div>

        `;

    } else {

        productDetails.innerHTML = "<h2>Product Not Found!</h2>";

    }

}
