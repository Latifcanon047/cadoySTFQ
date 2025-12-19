// chekout
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const NavBeliSekarang = document.getElementById('beli-sekarang');
const pilihAlamat = document.getElementById('pilih-alamat');
const detailBeli = document.getElementById('detail-beli');
const modulInputAlamat = document.getElementById('modul-input-alamat');
const modulPilihAlamat = document.getElementById('modul-pilih-alamat');
const backToDetail = document.getElementById('backToDetail');
const header = document.querySelector('header');

backToDetail.addEventListener('click', () => {
    if (id) {
        window.location.href = "detail-product.html?id="+id;
    } else {
        window.history.back();
    }
});


let btnTambah = undefined;
let btnKurang = undefined;
let jumlah_pesanan = 1;
let harga_satuan = null;
let total_harga = null;
let totalHargaKeseluruhan = null;
let idAlamat = null;
let produk = [];
let p = [];
let dataAlamat = [];
let editIndex = null;
let barangYangDiBeli = [];
let chekoutDiTroli = [];
let barangDiTroli = [];

NavBeliSekarang.addEventListener('click', () => {

    if (idAlamat == null || dataAlamat.length == 0) {
        alert("Pilih Alamat Terlebih Dahulu")
            return;
    }
    if (id) {
        console.log("aduuh");
        const namaPenerima = dataAlamat[idAlamat].namaPenerima;
        const alamatPenerima = dataAlamat[idAlamat].alamatPenerima;
        const productImage = produk[id].productImage;
        const productTitle = produk[id].productTitle;
        const productPrice = produk[id].productPrice;
        const jumlahPesanan = jumlah_pesanan;
        const totalHarga = total_harga;
        barangYangDiBeli.push({
            id,
            namaPenerima,
            alamatPenerima,
            productImage,
            productTitle,
            productPrice,
            jumlahPesanan,
            totalHarga
        });
        produk[id].productStock -= jumlahPesanan;
        localStorage.setItem("dataproduk", JSON.stringify(produk));
        localStorage.setItem("barangYangDiBeli", JSON.stringify(barangYangDiBeli));
    } else  if (chekoutDiTroli.length) {
        let indexHapus = [];
        chekoutDiTroli.forEach((item) => {
            const id = item.idp;
            const idt = Number(item.idt);
            const namaPenerima = dataAlamat[idAlamat].namaPenerima;
            const alamatPenerima = dataAlamat[idAlamat].alamatPenerima;
            const productImage = item.productImage;
            const productTitle = item.productTitle;
            const productPrice = item.productPrice;
            const jumlahPesanan = item.jumlahBarang;
            const totalHarga = item.productPrice * item.jumlahBarang;
            barangYangDiBeli.push({
                id,
                namaPenerima,
                alamatPenerima,
                productImage,
                productTitle,
                productPrice,
                jumlahPesanan,
                totalHarga
            }); 
            indexHapus.push(idt);
            console.log(indexHapus);
            produk[id].productStock -= item.jumlahBarang;
        })

        barangDiTroli = barangDiTroli.filter((_, index) => !indexHapus.includes(index));
        console.log(barangDiTroli);
        localStorage.setItem("barangYangDiBeli", JSON.stringify(barangYangDiBeli));
        localStorage.setItem("barangDiTroli", JSON.stringify(barangDiTroli));
        localStorage.setItem("dataproduk", JSON.stringify(produk));
    }

    window.location.replace("pesanan.html?id="+id);
});


function navbarBeli() {
    if (id) {
        NavBeliSekarang.innerHTML = `
            <div class="m-2 bg-warning">
                <div class="beli-sekarang">
                    <span>Beli Sekarang</span>
                    <span>Rp${total_harga}</span>
                </div>
            </div>
        `
        return;
    }

    if (chekoutDiTroli) {
        NavBeliSekarang.innerHTML = `
            <div class="m-2 bg-warning">
                <div class="beli-sekarang">
                    <span>Beli Sekarang</span>
                    <span>Rp${totalHargaKeseluruhan}</span>
                </div>
            </div>
        `
    }
};

function detailBeliSekarang() {
    if (id) {
        detailBeli.innerHTML = `
            <div class="col-3 px-2">
                <img src="${p.productImage}" alt="" class="img-fluid img-description">
            </div>
            <div class="title-description col-7 fs-6 pe-4 d-flex flex-column">
                <div class="mb-2">${p.productTitle}</div>
                <div class="mt-auto mb-2 mx-3">Stok (${p.productStock})</div>
            </div>
            <div class="price-container mb-0 col-2 d-flex flex-column align-items-end text-end pe-2 ps-5">
                <div class="product-price">
                    <span class="fs-6">Rp${p.productPrice.toLocaleString('id-ID')}</span>
                </div>
                <div class="jumlah-produk mt-auto d-flex bg-light">
                    <button id="btn-kurang" class="p-2 border-0">-</button>
                    <span id="jumlah-pesanan" class="p-2">1</span>
                    <button id="btn-tambah" class="p-2 border-0">+</button>
                </div>
            </div>
        `

        const pesanan = document.getElementById('jumlah-pesanan');
        btnTambah = document.getElementById('btn-tambah');
        btnKurang = document.getElementById('btn-kurang');
        harga_satuan = p.productPrice;

        btnTambah.addEventListener('click', () => {
            if (p.productStock > jumlah_pesanan){
                jumlah_pesanan++;
                pesanan.textContent = jumlah_pesanan;
                hitungHarga();
            }
        });

        btnKurang.addEventListener('click', () => {
            if (jumlah_pesanan > 1) {
                jumlah_pesanan--;
                pesanan.textContent = jumlah_pesanan;
                hitungHarga();
            }
        });

        // Elemen modul
        const overlayModul = document.getElementById("overlay-modul");
        const modulInputJumlah = document.getElementById("modul-input-jumlah");
        const jumlahDisplayMain = document.getElementById("jumlah-pesanan");

        const btnOpenModul = document.getElementById("jumlah-pesanan");
        const btnCloseModul = document.getElementById("tutup-modul-jumlah");

        // Elemen kontrol di modul
        const btnSimpanModul = document.getElementById("modul-simpan-jumlah");

        // Buka modul saat item jumlah-pesanan diklik
        btnOpenModul.addEventListener("click", () => {
            const modulJumlah = document.getElementById("modul-jumlah");
            modulJumlah.value = jumlah_pesanan;
            modulInputJumlah.classList.add("active");
            overlayModul.classList.add("active");
        });

        // Tutup modul
        btnCloseModul.addEventListener("click", () => {
            modulInputJumlah.classList.remove("active");
            overlayModul.classList.remove("active");
        });

        overlayModul.addEventListener('click',() => {
            modulInputJumlah.classList.remove('active');
            overlayModul.classList.remove('active');
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
                hitungHarga();
                modulInputJumlah.classList.remove("active");
                overlayModul.classList.remove("active");
            } else {
                alert('stok tidak cukup');
            }
        });
        return;
    }

    if (chekoutDiTroli) {
        chekoutDiTroli.forEach((item, index) => {
            const detailItem = document.createElement('div');
            detailItem.classList.add("col-12", "row", "g-0", "garis-tebal", "py-3");
            detailItem.innerHTML = `
                <div class="col-3 px-2">
                    <img src="${item.productImage}" alt="" class="img-fluid img-description">
                </div>
                <div class="title-description col-7 fs-6 pe-4 d-flex flex-column">
                    <div class="mb-2">${item.productTitle}</div>
                    <div class="mt-auto mb-2 mx-3">Stok (${item.productStock})</div>
                </div>
                <div class="price-container col-2 d-flex flex-column align-items-end text-end pe-2 ps-5">
                    <div class="product-price">
                        <span class="fs-6">Rp${item.productPrice.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="jumlah-produk d-flex mt-auto bg-light">
                        <button data-index="${index}" class="btn-kurang p-2 border-0">-</button>
                        <span data-index="${index}" class="jumlah-pesanan p-2">${item.jumlahBarang}</span>
                        <button data-index="${index}" class="btn-tambah p-2 border-0">+</button>
                    </div>
                </div>
            `;

            detailBeli.appendChild(detailItem);
        })
        document.getElementById('detail-beli').addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-tambah")) {
                const index = Number(e.target.dataset.index);
                const jumlahPesanan = document.querySelector(`.jumlah-pesanan[data-index="${index}"]`);
                chekoutDiTroli[index].jumlahBarang++;
                jumlahPesanan.textContent = chekoutDiTroli[index].jumlahBarang;
                hitungHargaKeseluruhan();
            }

            if (e.target.classList.contains("btn-kurang")) {
                const index = Number(e.target.dataset.index);
                    const jumlahPesanan = document.querySelector(`.jumlah-pesanan[data-index="${index}"]`);
                    if (chekoutDiTroli[index].jumlahBarang > 1) {
                    chekoutDiTroli[index].jumlahBarang--;
                    jumlahPesanan.textContent = chekoutDiTroli[index].jumlahBarang;
                    hitungHargaKeseluruhan();
                    }
            }
        });
    }
};

function hitungHarga () {
    total_harga = (harga_satuan * jumlah_pesanan).toLocaleString('id-ID');
    navbarBeli();
    console.log(total_harga);
};

function hitungHargaKeseluruhan () {
    totalHargaKeseluruhan = chekoutDiTroli.reduce(
        (sum, { productPrice, jumlahBarang = 1}) => sum + productPrice * jumlahBarang, 0
    ).toLocaleString('id-ID');
    navbarBeli();
};

pilihAlamat.addEventListener('click', () => {
    if (dataAlamat.length > 0) {
        modulPilihAlamat.classList.add('active');
        header.classList.remove('sticky-top');
    } else {
        modulInputAlamat.classList.add('active');
        header.classList.remove('sticky-top');
    }
});


// pilih alamat
const tutupModalPilih = document.getElementById('tutup-modal-pilih');
const tambahAlamatBaru = document.getElementById('tambah-alamat-baru');
const alamatReady = document.getElementById('alamat-ready');
const alamatPengiriman = document.getElementById('pilih-alamat');

function tampilkanAlamatKirim () {
    if (dataAlamat.length === 0) {
        alamatPengiriman.innerHTML =   `
            <div class="d-flex align-items-center justify-content-center">
                <h3 class="text-primary py-1">+ Alamat</h3>
            </div>
        `
    } else {
        const alamatKirim = dataAlamat[idAlamat];
        const index = idAlamat;
        alamatPengiriman.innerHTML = `
            <div class="row g-0 pe-4">
                <div class="col-1">
                    <i class="fa-solid fa-location-dot text-primary"></i>
                </div>
                <div class="col-10 d-flex flex-column">
                    <h6>${alamatKirim.namaPenerima}</h6>
                    <span class="text-break">${alamatKirim.alamatPenerima}</span>
                </div>
                <div class="col-1 d-flex flex-column">
                    <h6 class="text-end text-primary px-2 edit" data-index="${index}">edit</h6>
                </div>
            </div>
        `;
    } 
};

tutupModalPilih.addEventListener('click', () => {
    modulPilihAlamat.classList.remove('active');
    header.classList.add('sticky-top');
    tampilkanAlamatKirim();
});

tambahAlamatBaru.addEventListener('click', () => {
    modulInputAlamat.classList.add('active');
})

function tampilkanAlamat() {
    alamatReady.innerHTML = "";
    dataAlamat.forEach((item, index) => {
        const divAlamat = document.createElement('div');
        divAlamat.classList.add('alamat-item'); 
        divAlamat.innerHTML =`
            <div class="row g-0 pe-4">
                <div class="col-1 ps-3">
                    <i class="fa-solid fa-location-dot text-primary"></i>
                </div>
                <div class="col-10 px-2 d-flex flex-column alamatReady" data-index="${index}">
                    <h6>${item.namaPenerima}</h6>
                    <span class="text-break">${item.alamatPenerima}</span>
                </div>
                <div class="col-1 d-flex flex-column justify-content-between">
                    <h6 class="text-end text-primary pe-5 edit" data-index="${index}">edit</h6>
                    <h6 class="text-end text-danger mt-3 pe-5 hapus" data-index="${index}">hapus</h6>
                </div>
            </div>
        `;

        alamatReady.appendChild(divAlamat);
    });
};

alamatReady.addEventListener('click', (e) => {
    const parent = e.target.closest('.alamatReady');
    if (parent) {
        const id = parent.dataset.index;
        idAlamat = id;
        localStorage.setItem("idAlamat", idAlamat);
        tampilkanAlamatKirim()
        modulPilihAlamat.classList.remove('active');
        header.classList.add('sticky-top');
    }
    if (e.target.classList.contains('hapus')) {
        const index = e.target.dataset.index;
        dataAlamat.splice(index, 1);
        tampilkanAlamat();
        localStorage.setItem("dataAlamat", JSON.stringify(dataAlamat));
    }
    if (e.target.classList.contains('edit')) {
        editIndex = e.target.dataset.index;
        modulInputAlamat.classList.add('active');
        inputNamaPenerima.value = dataAlamat[editIndex].namaPenerima;
        inputAlamatPenerima.value = dataAlamat[editIndex].alamatPenerima;
        btnSimpan.textContent = "Simpan Perubahan";
    }
});

// input alamat
const inputNamaPenerima = document.getElementById('nama-penerima');
const inputAlamatPenerima = document.getElementById('alamat');
const tutupModalInput = document.getElementById('tutup-modal-input');
const btnSimpan = document.getElementById('btn-simpan');

tutupModalInput.addEventListener('click', () => {
    modulInputAlamat.classList.remove('active');
});

btnSimpan.addEventListener('click', () => {
    const namaPenerima = inputNamaPenerima.value;
    const alamatPenerima = inputAlamatPenerima.value;

    if (inputNamaPenerima.value.trim() == "" || inputAlamatPenerima.value.trim() == "") {
        alert('isi dulu inputnya broo');
        return;
    }

    if (editIndex !== null) {
        dataAlamat[editIndex] = {namaPenerima, alamatPenerima};
        editIndex = null;
        inputAlamatPenerima.value = "";
        inputNamaPenerima.value = "";
        tampilkanAlamat();
        localStorage.setItem("dataAlamat", JSON.stringify(dataAlamat));
        modulInputAlamat.classList.remove('active');
        btnSimpan.textContent = "Simpan";
    } else {
        dataAlamat.push({namaPenerima, alamatPenerima});
        inputAlamatPenerima.value = "";
        inputNamaPenerima.value = "";
        tampilkanAlamat();
        localStorage.setItem("dataAlamat", JSON.stringify(dataAlamat));
    }

    if (dataAlamat.length < 2) {
        const alamatDipilih = dataAlamat[0];
        idAlamat = dataAlamat.indexOf(alamatDipilih);
        tampilkanAlamatKirim();
        modulInputAlamat.classList.remove('active');
    } else {
        modulInputAlamat.classList.remove('active');
    }

});

window.onload = () => {
    const simpananProduk = localStorage.getItem("dataproduk");
    const simpananAlamat = localStorage.getItem("dataAlamat");
    const simpananIdAlamat = localStorage.getItem("idAlamat");
    const simpananBarangDibeli = localStorage.getItem("barangYangDiBeli");
    const simpananChekoutDiTroli = localStorage.getItem("chekoutDiTroli");
    const simpananBarangDiTroli = localStorage.getItem("barangDiTroli");

    if (simpananBarangDibeli) {
        barangYangDiBeli = JSON.parse(simpananBarangDibeli);
    }

    if (simpananIdAlamat) {
        idAlamat = Number(simpananIdAlamat);
    }

    if (simpananProduk) {
        const dataproduk = JSON.parse(simpananProduk);           
        produk = dataproduk;
        p = produk[id];
        if (p) {
            navbarBeli();
            detailBeliSekarang();
            hitungHarga();
        }
    }

    if (simpananAlamat) {
        const dataalamat = JSON.parse(simpananAlamat);           
        dataAlamat = dataalamat;
        tampilkanAlamat();
        tampilkanAlamatKirim();
        console.log(idAlamat,"berahsil broo");
    }

    if (simpananChekoutDiTroli) {
        chekoutDiTroli = JSON.parse(simpananChekoutDiTroli);
        detailBeliSekarang();
        hitungHargaKeseluruhan();
    }

    if (simpananBarangDiTroli){
        barangDiTroli = JSON.parse(simpananBarangDiTroli);
        console.log(barangDiTroli);
    }
};

