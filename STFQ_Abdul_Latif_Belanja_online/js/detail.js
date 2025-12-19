const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const navbar = document.querySelector('.chekout-links');
const detailContainer = document.getElementById("product-detail");
const modulTroli = document.getElementById('modul-troli');
let produk = [];
let p = [];
let btnTambah = undefined;
let btnKurang = undefined;
let jumlah_pesanan = 1;
let harga_satuan = null;
let editIndex = null;
let addTroli = [];


function navbarChekout() {
    navbar.innerHTML = `
        <a href="beli-sekarang.html?id=${id}" class="beli-link">
        <span>Beli Sekarang</span>
        <span>Rp${p.productPrice.toLocaleString('id-ID')}</span>
        </a>
        <button id="tambah-troli" class="troli">Tambah Ke Troli</button>
    `;

    const btnTambahTroli = document.getElementById('tambah-troli');
    btnTambahTroli.addEventListener('click', () => {
    document.getElementById("productImg").src = p.productImage;
    document.getElementById("productTitle").textContent = p.productTitle;
    document.getElementById("productPrice").textContent = "Rp" + p.productPrice.toLocaleString("id-ID");
    document.getElementById("productStock").textContent =  `Stok (${p.productStock})`;

    modulTroli.classList.add('active');
    });
};

const tutupModulTroli = modulTroli.querySelector("#tutup-modul-troli");
const overlayModul = document.getElementById("overlay-modul");
const modulInputJumlah = document.getElementById("modul-input-jumlah");
const jumlahDisplayMain = document.getElementById("jumlah-pesanan");
const pesanan = document.getElementById('jumlah-pesanan');
const btnOpenModul = document.getElementById("jumlah-pesanan");
const btnCloseModul = document.getElementById("tutup-modul-jumlah");
const btnSimpanModul = document.getElementById("modul-simpan-jumlah");

btnTambah = document.getElementById('btn-tambah');
btnKurang = document.getElementById('btn-kurang');
harga_satuan = p.productPrice;

btnOpenModul.addEventListener("click", () => {
    const modulJumlah = document.getElementById("modul-jumlah");
    modulJumlah.value = jumlah_pesanan;
    overlayModul.classList.add('active');
    modulInputJumlah.classList.add("active");
});

// Tutup modul
btnCloseModul.addEventListener("click", () => {
    modulInputJumlah.classList.remove("active");
    overlayModul.classList.remove("active");
});

overlayModul.addEventListener('click',() => {
    modulInputJumlah.classList.remove('active');
    overlayModul.classList.remove('active');
    console.log('di click');
})

// Simpan ke tampilan utama
btnSimpanModul.addEventListener("click", () => {
    const modulJumlahValue = Number(document.getElementById("modul-jumlah").value);
    if (modulJumlahValue < 1) {
        alert('Jumlah pesanan minimal 1');
        return;
    }
    if (modulJumlahValue <= p.productStock) {
        jumlahDisplayMain.textContent = modulJumlahValue;
        jumlah_pesanan = modulJumlahValue;
        modulInputJumlah.classList.remove("active");
        overlayModul.classList.remove("active");
    } else {
        alert('stok tidak cukup');
    }
});

tutupModulTroli.addEventListener('click', () => {
    modulTroli.classList.remove('active');
});

btnTambah.addEventListener('click', () => {
    if (p.productStock > jumlah_pesanan){
        jumlah_pesanan++;
        pesanan.textContent = jumlah_pesanan;
    }
});

btnKurang.addEventListener('click', () => {
    if (jumlah_pesanan > 1) {
        jumlah_pesanan--;
        pesanan.textContent = jumlah_pesanan;
    }
});

const tambahKeTroli = modulTroli.querySelector('#tambahkanKeTroli');
tambahKeTroli.addEventListener("click", () => {
    const idp = id;
    const productImage = p.productImage;
    const productTitle = p.productTitle;
    const productPrice = p.productPrice;
    const productStock = p.productStock
    const jumlahBarang = jumlah_pesanan;

    const itemAda = addTroli.find(item => item.idp === idp);

    if (itemAda) {
        itemAda.jumlahBarang += jumlahBarang;
        console.log('jalan');
    } else {
        addTroli.push({idp,productImage,productTitle,productPrice,productStock,jumlahBarang});
    }
    localStorage.setItem('barangDiTroli', JSON.stringify(addTroli));
    modulTroli.classList.remove('active');
    pesanan.textContent = 1;
});

function tampilkanDetail() {
    if (p) {
        detailContainer.innerHTML = `
            <div class="col-12 mb-5  row g-0">
                <img src="${p.productImage}" class="detail-img col-md-6" alt="Produk">
                <div class="col-md-6 d-md-flex flex-column">
                    <h4 class="text-danger fw-bold m-3">Rp${p.productPrice.toLocaleString('id-ID')}</h4>
                    <h6 class="text-muted fw-semibold m-3"> ${p.productTitle}</h6>
                    <div class="product-rating m-3">
                        <span class="star fs-5">★</span>
                        <span class="rating fs-5">${p.productRating}</span>
                        <span class="review-count fs-5">${p.reviewCount} Terjual</span>
                    </div>
                </div>
                <div  class="col-md-12 d-md-flex flex-column">
                    <h6 class="mt-3 mb-2 mx-3">Deksripsi:</h6>
                    <p class="text-secondary mx-3">${p.productDescription.toUpperCase()}</p>
                </div>
            </div>
        `;
    }
}

window.onload = () => {
    const simpanan = localStorage.getItem("dataproduk");
    const barangDiTroli = localStorage.getItem("barangDiTroli");

    if (simpanan) {
        const data = JSON.parse(simpanan);           
        produk = data;
        p = produk[id];
        tampilkanDetail();
        navbarChekout();
    }

    if (barangDiTroli) {
        addTroli = JSON.parse(barangDiTroli);
        console.log(addTroli);
    }
};
