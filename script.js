// ==============================
// PRODUCTS
// ==============================

const products = [
{
    id: 1,
    slug: "milk",
    name: "Farm Fresh Milk",
    description: "Pure cow milk collected every morning.",
    price: 60,
    unit: "1 Litre",
    image: "images/milk.jpg"
},
{
    id: 2,
    slug: "curd",
    name: "Curd",
    description: "Homemade thick curd.",
    price: 45,
    unit: "500g",
    image: "images/curd.jpg"
},
{
    id: 3,
    slug: "paneer",
    name: "Paneer",
    description: "Soft farmhouse paneer.",
    price: 120,
    unit: "250g",
    image: "images/paneer.jpg"
},
{
    id: 4,
    slug: "butter",
    name: "Butter",
    description: "Traditional cultured butter.",
    price: 95,
    unit: "200g",
    image: "images/Butter.jpg"
},
{
    id: 5,
    slug: "ghee",
    name: "A2 Cow Ghee",
    description: "Bilona A2 cow ghee.",
    price: 640,
    unit: "500ml",
    image: "images/ghee.jpg"
},
{
    id: 6,
    slug: "cheese",
    name: "Cheese",
    description: "Artisan cheese made in small batches.",
    price: 180,
    unit: "200g",
    image: "images/cheese.jpg"
}
];

// ==============================
// CART
// ==============================

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function updateCartCount() {

    const count =
    cart.reduce(
        (total, item) =>
        total + item.quantity,
        0
    );

    const cartCount =
    document.getElementById("cartCount");

    if(cartCount){
        cartCount.textContent = count;
    }
}

function addToCart(product){

    const existing =
    cart.find(
        item => item.id === product.id
    );

    if(existing){

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity:1
        });
    }

    saveCart();
    updateCartCount();

    showToast(
        product.name +
        " added to cart"
    );
}

// ==============================
// PRODUCTS GRID
// ==============================

function renderProducts(){

    const productGrid =
    document.getElementById("productGrid");

    if(!productGrid) return;

    productGrid.innerHTML = "";

    products.forEach(product => {

        const card =
        document.createElement("div");

        card.className =
        "product-card";

        card.innerHTML = `
    <img src="${product.image}" 
         alt="${product.name}" 
         class="product-image">

    <h3>${product.name}</h3>

    <p>${product.description}</p>

    <span class="product-price">
        ₹ ${product.price} / ${product.unit}
    </span>

    <div class="product-actions">

        <a href="products/${product.slug}.html" 
           class="view-details">
            View Details
        </a>

        <button 
            class="btn btn-primary add-cart-btn">
            Add To Cart
        </button>

    </div>
`;



        card
        .querySelector(".add-cart-btn")
        .addEventListener("click", () => {
            addToCart(product);
        });

        productGrid.appendChild(card);

    });
}

// ==============================
// MOBILE MENU
// ==============================

const navToggle =
document.getElementById("navToggle");

const primaryNav =
document.getElementById("primaryNav");

if(navToggle && primaryNav){

    navToggle.addEventListener(
        "click",
        () => {

            primaryNav.classList.toggle(
                "active"
            );

            const expanded =
            navToggle.getAttribute(
                "aria-expanded"
            ) === "true";

            navToggle.setAttribute(
                "aria-expanded",
                !expanded
            );
        }
    );
}

// ==============================
// NEWSLETTER
// ==============================

const newsletterForm =
document.getElementById(
    "newsletterForm"
);

if(newsletterForm){

    newsletterForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const email =
            document
            .getElementById(
                "newsletterEmail"
            )
            .value
            .trim();

            const formMessage =
            document
            .getElementById(
                "formMessage"
            );

            if(
                !email ||
                !email.includes("@")
            ){

                formMessage.textContent =
                "Please enter a valid email.";

                return;
            }

            formMessage.textContent =
            "Thank you for subscribing!";

            newsletterForm.reset();

            showToast(
                "Subscription successful"
            );
        }
    );
}

// ==============================
// TOAST
// ==============================

function showToast(message){

    const toast =
    document.getElementById("toast");

    if(!toast) return;

    toast.textContent =
    message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);
}

// ==============================
// YEAR
// ==============================

const year =
document.getElementById("year");

if(year){
    year.textContent =
    new Date().getFullYear();
}

// ==============================
// START
// ==============================

renderProducts();
updateCartCount();