const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const navbar = document.querySelector('.chekout-links');
const detailContainer = document.getElementById("product-detail");
const modulTroli = document.getElementById('modul-troli');
const overlay = document.getElementById('overlay');
let produk = [];
let p = [];

function navbarChekout() {
    navbar.innerHTML = `
        <a href="beli-sekarang.html?id=${id}" class="beli-link">
        <span>Beli Sekarang</span>
        <span>Rp${p.productPrice.toLocaleString('id-ID')}</span>
        </a>
        <button id="tambah-troli" class="troli">Tambah Ke Troli</button>
    `;

    modulTroli.innerHTML = `
    <h3>hfhhfhafa</h3>
    `

    const btnTambahTroli = document.getElementById('tambah-troli');
    btnTambahTroli.addEventListener('click', () => {
        overlay.classList.add('active');
    })
};

overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
})

function tampilkanDetail() {
    if (p) {
        detailContainer.innerHTML = `
            <div class="col-12 mb-5">
                <img src="${p.productImage}" class="detail-img" alt="Produk">
                <h4 class="text-danger fw-bold m-3">Rp${p.productPrice.toLocaleString('id-ID')}</h4>
                <h6 class="text-muted fw-v=bold m-3"> ${p.productTitle}</h6>
                <div class="product-rating m-3">
                    <span class="star fs-5">★</span>
                    <span class="rating fs-5">${p.productRating}</span>
                    <span class="review-count fs-5">${p.reviewCount} Terjual</span>
                </div>
                <h6 class="mt-4 mx-3">Deksripsi:</h6>
                <p class="text-secondary mx-3">${p.productDescription.toUpperCase()}</p>
            </div>
        `;
    } else {
        detailContainer.innerHTML = "<h2>GAGAL MEMUAT...</h2>";
    }
}

window.onload = () => {
    const simpanan = localStorage.getItem("dataproduk");

    if (simpanan) {
        const data = JSON.parse(simpanan);           
        produk = data;
        p = produk[id];
        console.log(p);
        tampilkanDetail();
        navbarChekout();
    } else {
        detailContainer.innerHTML = "<h2>GAGAL MEMUAT...</h2>";
    }
};
