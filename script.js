ScrollReveal().reveal("#menutitle", {
    origin: "left",
    duration: 2000,
    distance: "2%",
    easing: "ease",
});

ScrollReveal().reveal("#menu-items", {
    origin: "right",
    duration: 2000,
    distance: "2%",
    easing: "ease",
});

ScrollReveal().reveal("#menu-item1", {
    origin: "top",
    duration: 2000,
    distance: "2%",
    easing: "ease",
});

ScrollReveal().reveal("#local-title", {
    origin: "top",
    duration: 2000,
    distance: "20%",
    easing: "ease",
});

function showToastify() {
    Toastify({
        text: "Pedido ADD!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

function menuMobShow() {
    const menuMobile = document.getElementById("menu-mobile");

    menuMobile.style.display = "block";
}

function menuMobClose(event) {
    const menuMobile = document.getElementById("menu-mobile");

    menuMobile.style.display = "none";
}

//
//
//

const images = [
    "/assets/local2.jpg",
    "assets/local1.jpg",
    "assets/local3.jpeg",
];

let currentImageIndex = 0;
const carouselElement = document.getElementById("carrossel");

function changeBackgroundImage() {
    carouselElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeBackgroundImage, 4000);

changeBackgroundImage();

//
//
//
//
//
//
//

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout");
const adress = document.getElementById("adress");
const adressWarn = document.getElementById("adress-warn");
const cartCounter = document.getElementById("cart-count");

let cart = [];

// cartBtn.addEventListener("click", function () {
//     updateCartModal();
//     cartModal.style.display = "flex";
//     console.log(cartBtn);
// });

function openModal() {
    updateCartModal();
    cartModal.style.display = "flex";
}

closeModal.addEventListener("click", function () {
    cartModal.style.display = "none";
});

cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");

        removeItemCart(name);
    }
});

function removeItemCart(name) {
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }
    }

    cart.splice(index, 1);
    cartCounter.innerHTML = cart.length;
    updateCartModal();
}

adress.addEventListener("input", function (event) {
    let inpuValue = event.target.value;

    if (adress !== "") {
        adress.classList.remove("border-red-500");
        adressWarn.classList.add("hidden");
    }
});

checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) return;
    if (adress.value === "") {
        adressWarn.classList.remove("hidden");
        adress.classList.add("border-red-500");
        return;
    }

    const cartItems = cart
        .map((item) => {
            return ` ${item.name}, Quantidade: ${item.quantity}, Preço: R$${item.price} | `;
        })
        .join("");

    const message = encodeURIComponent(cartItems);

    window.open(
        `https://wa.me/5533984319242?text=${message} Endereço: ${adress.value}`,
        "_blank"
    );

    cart = [];
    cartCounter.innerHTML = 0;
    updateCartModal();
});

//
//
//
//
//
//
//
//

const itemUm = document.getElementById("item1");
const menuUm = document.getElementById("menu-item1");

itemUm.addEventListener("click", function () {
    menuUm.style.display = "block";
    menuDois.style.display = "none";
    menuTres.style.display = "none";
    menuQuatro.style.display = "none";
});

menuUm.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }

    cartCounter.innerHTML = cart.length;
});

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

//att carrinho

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add(
            "flex",
            "justify-between",
            "mb-4",
            "flex-col"
        );

        cartItemElement.innerHTML = `
        <div class"flex items-center justify-between overflow-y-scroll ">
             <div>
                 <p class="font-medium" >${item.name}</p>
                 <p>Qtd: ${item.quantity}</p>
                 <p class="font-medium mb-2" >R$ ${item.price}</p>
             </div>

             <div>
                  <button  class= "bg-gray-800 p-2 rounded-md text-white remove-from-cart-btn hover:bg-gray-400 transition" data-name="${item.name}">
                  Remover
                  </button>
             
             </div>
        </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement); // Adiciona o item à lista de itens a serem inseridos
    });

    // Insere os novos itens na div de forma que os itens dinamicamente criados fiquem no topo

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

//
//
//
//
//

const itemDois = document.getElementById("item2");
const menuDois = document.getElementById("menu-item2");

itemDois.addEventListener("click", function () {
    menuUm.style.display = "none";
    menuDois.style.display = "block";
    menuTres.style.display = "none";
    menuQuatro.style.display = "none";
});

menuDois.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }

    cartCounter.innerHTML = cart.length;
});

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

//att carrinho

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add(
            "flex",
            "justify-between",
            "mb-4",
            "flex-col"
        );

        cartItemElement.innerHTML = `
        <div class = "flex items-center justify-between ">
             <div>
                 <p class= "font-bold" >${item.name}</p>
                 <p class=" font-semibold" >Qtd: ${item.quantity}</p>
                 <p class="font-semibold mb-2" >R$ ${item.price}</p>
             </div>

             <div>
                  <button class= "bg-gray-800 p-2 rounded-md text-white remove-from-cart-btn hover:bg-gray-400 transition" data-name="${item.name}" >
                  Remover
                  </button>
             
             </div>
        </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    cartCounter.innerHTML = cart.length;
}

//
//
//
//
//
//
//
//

const itemTres = document.getElementById("item3");
const menuTres = document.getElementById("menu-item3");

itemTres.addEventListener("click", function () {
    menuTres.style.display = "block";
    menuUm.style.display = "none";
    menuDois.style.display = "none";
    menuQuatro.style.display = "none";
});

menuTres.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }

    cartCounter.innerHTML = cart.length;
});

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

//att carrinho

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add(
            "flex",
            "justify-between",
            "mb-4",
            "flex-col"
        );

        cartItemElement.innerHTML = `
        <div class = "flex items-center justify-between ">
             <div>
                 <p class= "font-bold" >${item.name}</p>
                 <p class=" font-semibold" >Qtd: ${item.quantity}</p>
                 <p class="font-semibold mb-2" >R$ ${item.price}</p>
             </div>

             <div>
                  <button class= "bg-gray-800 p-2 rounded-md text-white remove-from-cart-btn hover:bg-gray-400 transition" data-name="${item.name}" >
                  Remover
                  </button>
             
             </div>
        </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

//
//
//
//
//
//
//
//

const itemQuatro = document.getElementById("item4");
const menuQuatro = document.getElementById("menu-item4");

itemQuatro.addEventListener("click", function () {
    menuQuatro.style.display = "block";
    menuTres.style.display = "none";
    menuUm.style.display = "none";
    menuDois.style.display = "none";
});

menuQuatro.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }

    cartCounter.innerHTML = cart.length;
});

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

//att carrinho

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add(
            "flex",
            "justify-between",
            "mb-4",
            "flex-col"
        );

        cartItemElement.innerHTML = `
        <div class = "flex items-center justify-between ">
             <div>
                 <p class= "font-bold" >${item.name}</p>
                 <p class=" font-semibold" >Qtd: ${item.quantity}</p>
                 <p class="font-semibold mb-2" >R$ ${item.price}</p>
             </div>

             <div>
                  <button class= "bg-gray-800 p-2 rounded-md text-white remove-from-cart-btn hover:bg-gray-400 transition" data-name="${item.name}" >
                  Remover
                  </button>
             
             </div>
        </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
