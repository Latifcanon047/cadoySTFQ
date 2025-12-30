let produk = [];
let pesanan = [];
let barangDiTroli = [];

const productCard = document.getElementById('products-grid');
const jumlahPesanan = document.getElementById('total-pesanan');
const jumlahTroli = document.getElementById('total-troli');

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

function updateJumlahPesanan () {
    if (pesanan.length > 0) {
        jumlahPesanan.textContent = pesanan.length;
        jumlahPesanan.classList.add('d-block');
        jumlahPesanan.classList.remove('d-none');
    }  else {
        jumlahPesanan.classList.add('d-none');
        jumlahPesanan.classList.remove('d-block');
    }

    if (barangDiTroli.length > 0) {
        jumlahTroli.textContent = barangDiTroli.length;
        jumlahTroli.classList.add('d-block');
        jumlahTroli.classList.remove('d-none');
    } else {
        jumlahTroli.classList.add('d-none');
        jumlahTroli.classList.remove('d-block');
    }
}

async function ambildata() {
    try{
        const res = await fetch("produk.json");
        produk = await res.json();
        tampilkanProduk();
    } catch (err) {
        console.error("aduuuh error pulaa", err);
    }
} 

window.onload = () => {
    const simpanan = localStorage.getItem("dataproduk");
    const simpananDataPesanan = localStorage.getItem("barangYangDiBeli");
    const simpananDataTroli = localStorage.getItem("barangDiTroli");

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

    if (simpananDataPesanan) {
        pesanan = JSON.parse(simpananDataPesanan);
    }

    if (simpananDataTroli) {
        barangDiTroli = JSON.parse(simpananDataTroli)
    }

    updateJumlahPesanan();
};

