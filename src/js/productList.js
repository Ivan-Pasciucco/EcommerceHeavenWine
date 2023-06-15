let cartItems = [];

window.addEventListener("DOMContentLoaded", function () {
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartItems();
});

const addToCart = (product) => {
  if (sessionStorage.getItem("userLoggedIn")) {
    cartItems.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Producto agregado al carrito exitosamente");
    updateCartItems();
  } else {
    alert("Debes iniciar sesión para agregar productos al carrito");
  }
};
const updateCartItems = () => {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const productImage = document.createElement("img");
    productImage.src = product.img;
    productImage.alt = product.name;
    cartItem.appendChild(productImage);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productName = document.createElement("h3");
    productName.textContent = product.name;
    productInfo.appendChild(productName);

    const productPrice = document.createElement("h5");
    productPrice.textContent = `$ ${product.price}`;
    productInfo.appendChild(productPrice);

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;
    productInfo.appendChild(productDescription);

    const removeItemButton = document.createElement("button");
    removeItemButton.textContent = "X";
    removeItemButton.classList.add("btn", "btn-danger");
    removeItemButton.addEventListener("click", () => {
      removeItem(index);
    });
    productInfo.appendChild(removeItemButton);

    cartItem.appendChild(productInfo);
    cartItemsContainer.appendChild(cartItem);
  });
};

const removeItem = (index) => {
  cartItems.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cartItems)); // Actualizar sessionStorage
  updateCartItems();
};

const clearCart = () => {
  cartItems = [];
  updateCartItems();
};

const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
  Swal.fire({
    title: "Gracias por su compra. Pronto nos contactaremos con usted.",
    icon: "success",
    showConfirmButton: false,
    timer: 2000, 
  }).then(() => {
    localStorage.removeItem("cart"); 
    window.location.href = "index.html"; 
  });
});


async function loadProducts() {
  try {
    const productContainer = document.getElementById("productContainer");
    const response = await fetch("./../../data/products.json");
    const data = await response.json();

    data.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product", "col-md-4", "mb-4");
      const productImage = document.createElement("img");
      productImage.src = product.img;
      productImage.alt = product.name;
      productItem.appendChild(productImage);

      const productName = document.createElement("h4");
      productName.textContent = product.name;
      productItem.appendChild(productName);

      const productPrice = document.createElement("p");
      productPrice.textContent = `$ ${product.price}`;
      productItem.appendChild(productPrice);
      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;
      productItem.appendChild(productDescription);

      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Agregar al carrito";
      addToCartButton.classList.add("btn", "btn-primary");
      addToCartButton.addEventListener("click", () => {
        addToCart(product);
      });
      productItem.appendChild(addToCartButton);
      productContainer.appendChild(productItem);
    });
  } catch (error) {
    throw new Error("Error loading products", error);
  }
}

loadProducts();
