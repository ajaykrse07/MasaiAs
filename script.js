// script.js

document.addEventListener("DOMContentLoaded", function() {
    const productsElement = document.getElementById("products");
    const categorySelect = document.getElementById("category");
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");

    // Fetch products from FakeStoreAPI
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
            populateCategories(products);
        });

    function displayProducts(products) {
        productsElement.innerHTML = "";
        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productsElement.appendChild(productItem);
        });
    }

    function populateCategories(products) {
        const categories = products.reduce((acc, curr) => {
            if (!acc.includes(curr.category)) {
                acc.push(curr.category);
            }
            return acc;
        }, []);

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    categorySelect.addEventListener("change", function() {
        const selectedCategory = this.value;
        filterProducts(selectedCategory, searchInput.value.trim().toLowerCase());
    });

    searchInput.addEventListener("input", function() {
        const selectedCategory = categorySelect.value;
        filterProducts(selectedCategory, this.value.trim().toLowerCase());
    });

    sortSelect.addEventListener("change", function() {
        const sortBy = this.value;
        const sortedProducts = sortProducts(products, sortBy);
        displayProducts(sortedProducts);
    });

    function filterProducts(category, searchQuery) {
        const filteredProducts = products.filter(product => {
            return (category === "all" || product.category === category) &&
                   (searchQuery === "" || product.title.toLowerCase().includes(searchQuery));
        });
        displayProducts(filteredProducts);
    }

    function sortProducts(products, sortBy) {
        const sortedProducts = [...products];
        if (sortBy === "asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        return sortedProducts;
    }
});
