// DADOS
const PHONE_NUMBER = "5511999999999"; 

const products = [
    {
        id: 1,
        name: "Camisa do São Paulo III 25/26 Jogador New Balance",
        category: "Brasileirão",
        price: 179.90,
        oldPrice: 349.90,
        image: "https://acdn.mitiendanube.com/stores/003/344/221/products/camisa-sao-paulo-iii-2023-24-new-balance-jogador-masculina-preta-1-3183aa39023b88d84417056687352342-1024-1024.jpg",
        discount: 49
    },
    {
        id: 2,
        name: "Manto Flamengo Jogo 3 Adidas 2026",
        category: "Brasileirão",
        price: 179.90,
        oldPrice: 249.90,
        image: "https://images.tcdn.com.br/img/img_prod/692036/camisa_flamengo_iii_23_24_s_n_torcedor_adidas_masculina_preta_12579_1_0c4974f2e90924978a3c224209930f3c.jpg",
        discount: 28
    },
    {
        id: 3,
        name: "Camisa Palmeiras Home 25/26 Verde",
        category: "Brasileirão",
        price: 179.90,
        oldPrice: 329.90,
        image: "https://static.netshoes.com.br/produtos/camisa-palmeiras-i-2425-sn-torcedor-puma-masculina/10/2I3-7647-010/2I3-7647-010_zoom1.jpg",
        discount: 45
    },
    {
        id: 4,
        name: "Camisa Real Madrid Home 25/26 Jogador",
        category: "Europeu",
        price: 249.90,
        oldPrice: 499.90,
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0e99496660354b389650af63009b023b_9366/Camisa_1_Real_Madrid_23-24_Branco_HR3796_01_laydown.jpg",
        discount: 50
    },
    {
        id: 5,
        name: "Camisa Manchester City Away 25/26",
        category: "Europeu",
        price: 189.90,
        oldPrice: 350.00,
        image: "https://static.netshoes.com.br/produtos/camisa-manchester-city-home-2324-sn-torcedor-puma-masculina/54/2I3-5683-054/2I3-5683-054_zoom1.jpg",
        discount: 40
    },
    {
        id: 6,
        name: "Jersey Lakers Lebron James 23 Icon",
        category: "NBA",
        price: 199.90,
        oldPrice: 399.90,
        image: "https://static.netshoes.com.br/produtos/regata-los-angeles-lakers-icon-edition-2020-swingman-nike-masculina/54/2I3-2495-054/2I3-2495-054_zoom1.jpg",
        discount: 50
    },
    {
        id: 7,
        name: "Brasil Retro 2002 Ronaldo Fenômeno",
        category: "Retro",
        price: 229.90,
        oldPrice: 329.90,
        image: "https://static.netshoes.com.br/produtos/camisa-brasil-2002-retro-jogador/06/D33-4409-006/D33-4409-006_zoom1.jpg",
        discount: 30
    }
];

// RENDERIZAR
function renderProducts(filter = 'todos') {
    const container = document.getElementById('grid-produtos');
    container.innerHTML = ''; 

    const filtered = filter === 'todos' ? products : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.onclick = () => openModal(p); 

        card.innerHTML = `
            <div class="product-image-wrapper">
                <span class="badge-discount">-${p.discount}%</span>
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="price-box">
                    <span class="old-price">R$ ${p.oldPrice.toFixed(2).replace('.', ',')}</span>
                    <span class="new-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <p class="installments">12x de R$ ${(p.price / 12).toFixed(2).replace('.', ',')}</p>
                <button class="btn-add">ADICIONAR</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// MODAL
let currentProduct = null;
const modal = document.getElementById('modal-produto');

function openModal(product) {
    currentProduct = product;
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-cat').innerText = product.category;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-old-price').innerText = `R$ ${product.oldPrice.toFixed(2).replace('.', ',')}`;
    document.getElementById('modal-price').innerText = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
});

// WHATSAPP
function enviarWhatsapp() {
    if(!currentProduct) return;
    const size = document.querySelector('input[name="size"]:checked').value;
    const message = `*Olá, EISTORE!* 👋\n\nGostaria de comprar este produto:\n\n👕 *${currentProduct.name}*\n🏷 Preço: R$ ${currentProduct.price.toFixed(2)}\n📏 Tamanho: *${size}*\n\n_Pode verificar se tem disponível?_`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// FILTRO
window.filterProducts = function(cat) {
    renderProducts(cat);
    document.getElementById('mobile-menu').classList.remove('open');
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    new Swiper('.announcement-swiper', {
        loop: true, autoplay: { delay: 3000 }, direction: 'vertical', allowTouchMove: false
    });

    new Swiper('.hero-swiper', {
        loop: true, autoplay: { delay: 5000 }, pagination: { el: '.swiper-pagination', clickable: true }
    });

    // Swiper Ligas - Configurado para funcionar com o alinhamento central do CSS
    new Swiper('.circle-swiper', {
        slidesPerView: 'auto', 
        spaceBetween: 20, 
        freeMode: true,
        grabCursor: true
    });

    document.getElementById('menu-mobile-btn').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('open');
    });
    document.getElementById('close-menu').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('open');
    });
});
