let produk = [];

const productCard = document.getElementById('products-grid');

function tampilkanProduk() {
    produk.forEach((item, i) => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="product-card">
            <a href="detail-product.html?id=${i}">
                <img src="${item.productImage}" alt="Product" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${item.productTitle}</h3>
                    <p class="product-price">Rp ${item.productPrice.toLocaleString('id-ID')}</p>
                    <div class="product-rating">
                        <span class="star">★</span>
                        <span class="rating">${item.productRating}</span>
                        <span class="review-count">${item.reviewCount} Terjual</span>
                    </div>
                </div>
            </a>
        </div>
        `;

        productCard.appendChild(card);
    });

    localStorage.setItem("dataproduk", JSON.stringify(produk));
}

async function ambildata() {
    try{
        const res = await fetch("produk.json");
        produk = await res.json();
        console.log(produk);
        tampilkanProduk();
    } catch (err) {
        console.error("aduuuh error pulaa", err);
    }
} 

window.onload = () => {
    const simpanan = localStorage.getItem("dataproduk");

    if (simpanan) {
        const data = JSON.parse(simpanan);
        if (Array.isArray(data) && data.length > 0) {
            produk = data;
            tampilkanProduk();
        } else {
        ambildata();
        }
    } else {
        ambildata();
    }
};

