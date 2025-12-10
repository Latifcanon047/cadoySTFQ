// chekout
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const NavBeliSekarang = document.getElementById('beli-sekarang');
const pilihAlamat = document.getElementById('pilih-alamat');
const detailBeli = document.getElementById('detail-beli');
const modulInputAlamat = document.getElementById('modul-input-alamat');
let btnTambah = undefined;
let btnKurang = undefined;
let jumlahPesanan = 1;
let hargaSatuan = null;
let totalharga = null;
let produk = [];
let p = [];
function navbarBeli() {
    NavBeliSekarang.innerHTML = `
        <div class="mx-3 my-1 bg-warning">
            <a href="beli-sekarang.html?id=${id}" class="beli-link">
                <span>Beli Sekarang</span>
                <span>Rp${totalharga}</span>
            </a>
        </div>
    `
};

function detailBeliSekarang() {
    detailBeli.innerHTML = `
        <div class="col-3 pe-1"><img src="${p.productImage}" alt="" class="img-fluid img-description"></div>
        <div class="title-description col-7 fs-6 pe-4">${p.productTitle}</div>
        <div class="price-container col-2 d-flex flex-column align-items-end text-end pe-2 ps-5">
            <div class="product-price">
                <span class="fs-6">Rp${p.productPrice.toLocaleString('id-ID')}</span>
            </div>
            <div class="jumlah-produk d-flex mt-auto bg-light">
                <button id="btn-kurang" class="p-2 border-0">-</button>
                <in id="jumlah-pesanan" class="p-2">1</in>
                <button id="btn-tambah" class="p-2 border-0">+</button>
            </div>
        </div>
    `

    const pesanan = document.getElementById('jumlah-pesanan');
    btnTambah = document.getElementById('btn-tambah');
    btnKurang = document.getElementById('btn-kurang');
    hargaSatuan = p.productPrice;

    btnTambah.addEventListener('click', () => {
        jumlahPesanan++;
        pesanan.textContent = jumlahPesanan;
        hitungHarga();
    });

    btnKurang.addEventListener('click', () => {
        if (jumlahPesanan > 1) {
            jumlahPesanan--;
            pesanan.textContent = jumlahPesanan;
            hitungHarga();
        }
    })

};

function hitungHarga () {
    totalharga = (hargaSatuan * jumlahPesanan).toLocaleString('id-ID');
    navbarBeli();
}

pilihAlamat.addEventListener('click', () => {
    modulInputAlamat.classList.add('active');
});

// input alamat
const inputNamaPenerima = document.getElementById('nama-penerima');
const inputAlamatPenerima = document.getElementById('alamat');
const tutupModal = document.getElementById('tutup-modal');
const btnSimpan = document.getElementById('btn-simpan');
let dataAlamat = [];

tutupModal.addEventListener('click', () => {
    modulInputAlamat.classList.remove('active');
});

btnSimpan.addEventListener('click', () => {
    const namaPenerima = inputNamaPenerima.value;
    const alamatPenerima = inputAlamatPenerima.value;
    console.log(namaPenerima);
    console.log(alamatPenerima);

    if(inputNamaPenerima.value.trim() !== "" && inputAlamatPenerima.value.trim() !== "") {
        dataAlamat.push({namaPenerima, alamatPenerima});
        inputAlamatPenerima.value = "";
        inputNamaPenerima.value = "";
        console.log(dataAlamat);
        localStorage.setItem("dataAlamat", JSON.stringify(dataAlamat));
        modulInputAlamat.classList.remove('active');
    } else {
        alert('isi dulu inputnya broo');
    }
})


window.onload = () => {
    const simpanan = localStorage.getItem("dataproduk");

    if (simpanan) {
        const data = JSON.parse(simpanan);           
        produk = data;
        p = produk[id];
        navbarBeli();
        detailBeliSekarang();
        hitungHarga();
    } else {
        detailContainer.innerHTML = "<h2>GAGAL MEMUAT...</h2>";
    }
};

