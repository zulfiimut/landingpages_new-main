// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggle.innerHTML = navbar.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Testimonial Slider
const slider = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
}

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        const slideIndex = parseInt(dot.getAttribute("data-slide"));
        showSlide(slideIndex);
    });
});

// Auto slide change
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Shopping Cart Functionality
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.querySelector(".cart-count");
const addToCartBtns = document.querySelectorAll(".add-to-cart");
const shopNowBtn = document.getElementById("shop-now-btn");

let cart = [];

// Toggle cart sidebar
cartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

shopNowBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// Add to cart functionality
addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const name = btn.getAttribute("data-name");
        const price = parseFloat(btn.getAttribute("data-price"));
        const image = btn.getAttribute("data-image");

        // Check if item already exists in cart
        const existingItem = cart.find((item) => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1,
            });
        }

        updateCart();
        cartSidebar.classList.add("active");

        // Add animation to cart button
        cartBtn.classList.add("animate");
        setTimeout(() => {
            cartBtn.classList.remove("animate");
        }, 500);
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
                        <div class="empty-cart">
                            <i class="fas fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <a href="#featured" class="btn btn-primary" id="shop-now-btn">Shop Now</a>
                        </div>
                    `;
        cartSummary.style.display = "none";

        // Re-attact event listener to new shop now button
        document.getElementById("shop-now-btn").addEventListener("click", () => {
            cartSidebar.classList.remove("active");
        });
    } else {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">$${item.price.toFixed(
                2
            )}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn-minus" dat-id="${item.id
                }">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity
                }" readonly>
                                    <button class="quantity-btn-plus" data-id="${item.id
                }">+</button>
                                </div>
                                <div class="remove-item" data-id="${item.id
                }">Remove</div>
                            </div>
                        </div>
                    `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartSummary.style.display = "block";

        // Calculate total
        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to quantity buttons
        document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const item = cart.find((item) => item.id === id);

                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".quantity-btn-plus").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const item = cart.find((item) => item.id === id);

                item.quantity += 1;
                updateCart();
            });
        });

        document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                cart = cart.filter((item) => item.id !== id);
                updateCart();
            });
        });
    }
}

    // Checkout button
    document.querySelector(".checkout-btn")?.addEventListener("click", () => {
        alert("Thank you for your order! Total: " + cartTotal.textContent);
        cart = [];
        updateCart();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElemen = document.querySelector(targetId);
            if (targetElemen) {
                window.scrollTo({
                    top: targetElemen.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });
    });

    // Newsletter form submission
    document
    .querySelector(".newsletter-form")
    ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = this.querySelector("input").value;
        alert(
            `Thank you for subscribing with ${email}! You'll receive our sweet update soon.`
        );
        this.reset();
    });

    // Footer newsletter form submission
    document
    .querySelector(".footer-newsletter")
    ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = this.querySelector("input").value;
        alert(`Thank you for subscribing with ${email}!`);
        this.reset();
    });

