// =======================
// CONFIG
// =======================
const PHONE_NUMBER = "5511988887777"; // <-- TROQUE AQUI PARA O NÚMERO DO WHATSAPP

// =======================
// VARIÁVEIS GLOBAIS
// =======================
let currentProduct = null;
let modalImages = [];
let currentImageIndex = 0;

// =======================
// PRODUTOS
// =======================
const products = [
  {
    id: 1,
    name: "Camisa Corinthians Preta e Branca Retro ",
    category: "Retro",
    price: 207.00,
    oldPrice: 270.00,
    images: [
      "img/RETRO/CorinthiansRetro.png"
    ],
  },

  {
    id: 2,
    name: "Manto Flamengo Vermelha e Preta Retro ",
    category: "Retro",
    price: 207.00,
    oldPrice: 270.00,
    images: [ "img/RETRO/FlamengoRetro.png"],
    discount: 28
  },

  {
    id: 3,
    name: "Camisa São Paulo Preta Retro",
    category: "Retro",
    price: 207.00,
    oldPrice: 270.00,
    images: ["img/RETRO/SãoPauloRetro.png"],
    discount: 45
  },

  {
    id: 4,
    name: "Camisa Real Madrid Classica Branca",
    category: "Europeu",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/EUROPA/RealMadrid.png" ],
    discount: 50
  },
  {
    id: 5,
    name: "Camisa Atalanta Azul e Preta",
    category: "Europeu",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/EUROPA/Atalanta.png"],
    discount: 30
  },
  {
    id: 6,
    name: "Camisa Classica Benfica Vermelha",
   category: "Europeu",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/EUROPA/Benfica.png"],
  },

  {
    id: 7,
    name: "Camisa Borussia Dortmund Amarela",
    category: "Europeu",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/EUROPA/BorussiaDortmund.png"],
    discount: 30
  },

 {
    id: 8,
    name: "Camisa Brasil Classica Amarela",
    category: "Seleções",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/SELEÇÃO/BrasilAmarela.png"],
    discount: 30
  },

 {
    id: 9,
    name: "Camisa Brasil Azul",
    category: "Seleções",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/SELEÇÃO/BrasilAzul.png"],
    discount: 30
  },

 {
    id: 10,
    name: "Camisa Corinthians Laranja ",
    category: "Brasileiro",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/BRASILEIROS/CorinthiansLaranja.png"], 
    discount: 30
  },

   {
    id: 11,
    name: "Camisa Vasco Marrom",
    category: "Brasileiro",
    price: 179.00,
    oldPrice: 254.00,
    images: ["img/BRASILEIROS/VascoMarrom.png"],
    discount: 30
  },


];

// =======================
// RENDER PRODUTOS
// =======================
function renderProducts(filter = "todos") {
  const container = document.getElementById("grid-produtos");
  container.innerHTML = "";

  const list =
    filter === "todos"
      ? products
      : products.filter(p => p.category === filter);

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    const hasSecondImage = p.images.length > 1;

    card.innerHTML = `
      <div class="product-image-wrapper">
        ${p.discount ? `<span class="badge-discount">-${p.discount}%</span>` : ""}
        <img src="${p.images[0] || ''}" class="product-img primary" alt="${p.name}">
        ${hasSecondImage ? `<img src="${p.images[1]}" class="product-img secondary" alt="${p.name}">` : ""}
      </div>

      <div class="product-info">
        <h3>${p.name}</h3>

        <div class="price-box">
          <span class="old-price">R$ ${p.oldPrice.toFixed(2).replace(".", ",")}</span>
          <span class="new-price">R$ ${p.price.toFixed(2).replace(".", ",")}</span>
        </div>

        <p class="installments">
          12x de R$ ${(p.price / 12).toFixed(2).replace(".", ",")}
        </p>
      </div>
    `;

    // Abrir modal ao clicar na imagem
    card.querySelector(".product-image-wrapper")
      .addEventListener("click", () => openModal(p));

    container.appendChild(card);
  });
}

// =======================
// MODAL (ZOOM)
// =======================
function openModal(product) {
  currentProduct = product;
  modalImages = product.images;
  currentImageIndex = 0;

  const modalImg = document.getElementById("modal-img");
  modalImg.src = modalImages[currentImageIndex] || '';

  document.getElementById("modal-cat").innerText = product.category;
  document.getElementById("modal-title").innerText = product.name;
  document.getElementById("modal-old-price").innerText =
    `R$ ${product.oldPrice.toFixed(2).replace(".", ",")}`;
  document.getElementById("modal-price").innerText =
    `R$ ${product.price.toFixed(2).replace(".", ",")}`;

  document.getElementById("modal-produto").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-produto").classList.remove("active");
  document.body.style.overflow = "auto";
}

// =======================
// NAV SETAS MODAL
// =======================
function nextImage() {
  if (!modalImages.length) return;
  currentImageIndex = (currentImageIndex + 1) % modalImages.length;
  document.getElementById("modal-img").src = modalImages[currentImageIndex];
}

function prevImage() {
  if (!modalImages.length) return;
  currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
  document.getElementById("modal-img").src = modalImages[currentImageIndex];
}

// =======================
// ZOOM IMAGEM MODAL
// =======================
function toggleZoom() {
  const modalImg = document.getElementById("modal-img");
  modalImg.classList.toggle("zoomed");
}

// =======================
// WHATSAPP
// =======================
function enviarWhatsapp() {
  if (!currentProduct) return;

  // Pegando tamanho selecionado (se houver)
  const sizeInput = document.querySelector('input[name="size"]:checked');
  const size = sizeInput ? sizeInput.value : 'Não selecionado';

  const msg = `Olá! Quero comprar:\n
${currentProduct.name}
Preço: R$ ${currentProduct.price.toFixed(2)}
Tamanho: ${size}`;

  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// =======================
// FILTRO
// =======================
window.filterProducts = cat => renderProducts(cat);

// =======================
// INIT
// =======================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  new Swiper('.announcement-swiper', {
    loop: true,
    autoplay: { delay: 3000 },
    direction: 'vertical',
    allowTouchMove: false
  });

  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 5000 },
    pagination: { el: '.swiper-pagination', clickable: true }
  });

  new Swiper('.circle-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    grabCursor: true
  });

  // MENU MOBILE
  document.getElementById('menu-mobile-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('open');
  });
  document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('open');
  });

  // MODAL NAV
  document.querySelector(".nav-arrow.left").addEventListener("click", prevImage);
  document.querySelector(".nav-arrow.right").addEventListener("click", nextImage);

  // FECHAR MODAL
  document.querySelector(".close-modal").addEventListener("click", closeModal);

  // ZOOM MODAL
  document.getElementById("modal-img").addEventListener("click", toggleZoom);
});
