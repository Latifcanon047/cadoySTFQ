const chekout = document.getElementById('chekout');
const tutupModulJumlah = document.getElementById('tutup-modul-jumlah');
const containerDetail = document.getElementById("container-detail");
const detailBarangDiBeli = document.getElementById("detailBarangDiBeli");
const modulInputJumlah = document.getElementById('modul-input-jumlah');
const modulJumlah = document.getElementById('modul-jumlah');
const btnSimpan = document.getElementById('modul-simpan-jumlah');
const overlayModul = document.getElementById('overlay-modul'); 
let barangDiTroli = [];
let chekoutDiTroli = [];
let total_harga = 0;
let barangDiPilih = [];
let jumlah = 0;
let indexJumlah = 0;

document.getElementById('back').addEventListener('click', () => {
    window.history.back();
});

function tampilkanBarangDiBeli() {

    if (barangDiTroli.length > 0) {
        detailBarangDiBeli.innerHTML = "";
        barangDiTroli.forEach((item, index) => {
            const detailItem = document.createElement("div");
            detailItem.innerHTML = `
                <div class="col-12 mt-2 py-2 row g-0">
                    <div class="col-3 pe-2">
                        <img src="${item.productImage}" alt="eaaa" class="img-fluid img-description px-2">
                    </div>
                    <div class="title-description col-9 fs-6 pe-3 d-flex flex-column">
                        <div class="title-box">
                            <p class="productTitle clamped m-0">
                                ${item.productTitle}
                            </p>

                            <span class="fadeTitle"></span>

                            <span class="toggleTitle">Baca selengkapnya</span>

                            <h6 class="fs-6 fw-semibold mt-2">Rp${item.productPrice.toLocaleString('id-ID')}</h6>
                        </div>
                        <div class="product-price col-12 mt-auto d-flex justify-content-between py-2 g-0">
                            <span class="fs-6 fw-semibold text-start">Stok (${item.productStock})</span>
                            <span class="text-end">
                                <button data-index="${index}"  class="btn-kurang p-2 border-0">-</button>
                                <span data-index="${index}" class="jumlah-pesanan p-2">${item.jumlahBarang}</span>
                                <button data-index="${index}"  class="btn-tambah p-2 border-0">+</button>
                            </span>
                        </div>
                    </div>                   
                </div>
                <div class="d-flex g-0 pe-3 mb-2 garis-tebal justify-content-between align-item-center">
                    <div class="py-2 d-flex my-auto ms-3">
                        <input type="checkbox" data-index="${index}" class="form-check-input cek-item p-2">
                    </div>
                    <div class="d-flex justify-content-end my-3">
                        <button class="bg-danger batalkan text-white" data-id="${item.id}" data-index="${index}">hapus</button>
                    </div>
                </div>
            `;

            detailBarangDiBeli.appendChild(detailItem);   
            
            const titleBox = detailItem.querySelector(".title-box");
            const productTitle = titleBox.querySelector(".productTitle");
            const fadeTitle = titleBox.querySelector(".fadeTitle");
            const toggleTitle = titleBox.querySelector(".toggleTitle");

            function isOverflow(element, threshold = 100) {
                if (!element) return false;
                return element.scrollHeight > element.clientHeight + threshold;
            }

            if (!isOverflow(productTitle, 5)) {
                toggleTitle.style.display = "none";
                fadeTitle.style.display = "none";
            }

            toggleTitle.addEventListener("click", () => {
                productTitle.classList.toggle("expanded");

                if (productTitle.classList.contains("expanded")) {
                    toggleTitle.textContent = "sembunyikan";
                    fadeTitle.style.display = "none";
                } else {
                    toggleTitle.textContent = "Baca selengkapnya";
                    fadeTitle.style.display = "block";
                }
            });    

        });

    } else {
        detailBarangDiBeli.innerHTML = ` 
        <div class="icon-wrapper">
            <i class="fa-solid fa-cloud cloud satu"></i>
            <i class="fa-solid fa-cloud cloud dua"></i>
            <i class="fa-solid fa-cloud cloud tiga"></i>
            <i class="fa-solid fa-cart-shopping cart"></i>
            <span class="text-troli">Troli masih kosong..</span>
        </div>
        `
    }

    localStorage.setItem("barangDiTroli", JSON.stringify(barangDiTroli));
};

containerDetail.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-tambah")) {
        const index = Number(e.target.dataset.index);
        const jumlahPesanan = document.querySelector(`.jumlah-pesanan[data-index="${index}"]`);
        if (barangDiTroli[index].jumlahBarang < barangDiTroli[index].productStock)
            barangDiTroli[index].jumlahBarang++;
            jumlahPesanan.textContent = barangDiTroli[index].jumlahBarang;
            hitungHarga();
    }

    if (e.target.classList.contains("btn-kurang")) {
        const index = Number(e.target.dataset.index);
            const jumlahPesanan = document.querySelector(`.jumlah-pesanan[data-index="${index}"]`);
            if (barangDiTroli[index].jumlahBarang > 1) {
            barangDiTroli[index].jumlahBarang--;
            jumlahPesanan.textContent = barangDiTroli[index].jumlahBarang;
            hitungHarga();
            }
    }
    if (e.target.classList.contains("form-check-input")) {
        hitungHarga();
    }

    if (e.target.classList.contains('jumlah-pesanan')) {
        const index = Number(e.target.dataset.index);
        indexJumlah = index;
        jumlah = Number(
            document.querySelector(`.jumlah-pesanan[data-index="${index}"]`).textContent
        );
        modulJumlah.value = jumlah;
        modulInputJumlah.classList.add('active');
        overlayModul.classList.add('active');
    }

    if (e.target.classList.contains("batalkan")) {
        const index = Number(e.target.dataset.index);
        barangDiTroli.splice(index, 1);
        tampilkanBarangDiBeli();
        navbarChekout();
    }
});

btnSimpan.addEventListener('click', () => {
    jumlah = Number(modulJumlah.value);
    const  el = document.querySelector(`.jumlah-pesanan[data-index="${indexJumlah}"]`);
    if (jumlah === 0) {
        alert('Jumlah minimal 1');
        return;
    }
    if (barangDiTroli[indexJumlah].productStock < jumlah) {
        alert('Stok tidak cukup');
        return;
    }
    el.textContent = jumlah;
    barangDiTroli[indexJumlah].jumlahBarang = jumlah;
    localStorage.setItem("barangDiTroli", JSON.stringify(barangDiTroli));
    overlayModul.classList.remove('active');
    modulInputJumlah.classList.remove('active');
});

tutupModulJumlah.addEventListener('click', () => {
    overlayModul.classList.remove('active');
    modulInputJumlah.classList.remove('active');
});

overlayModul.addEventListener("click", () => {
    overlayModul.classList.remove('active');
    modulInputJumlah.classList.remove('active');
});

function hitungHarga () {
    barangDiPilih = [];
    chekoutDiTroli = [];
    const index = [...document.querySelectorAll('.cek-item:checked')]
    barangDiPilih.push(
        ...index.map(cb => ({
            ...barangDiTroli[cb.dataset.index]
        }))
    );

    chekoutDiTroli.push(
        ...index.map(cb => ({
            ...barangDiTroli[cb.dataset.index], idt : cb.dataset.index
        }))
    );

    total_harga = barangDiPilih.reduce(
        (sum, { productPrice, jumlahBarang = 1}) => sum + productPrice * jumlahBarang, 0
    );
    navbarChekout();
    localStorage.setItem("barangDiTroli", JSON.stringify(barangDiTroli));
};

chekout.addEventListener("click", () => {
    if (total_harga > 1) {
        hitungHarga();
        localStorage.setItem("chekoutDiTroli", JSON.stringify(chekoutDiTroli));
        window.location = "beli-sekarang.html";
    } else {
        alert("pilih barang terlebih dahulu");
    }
});

function navbarChekout () {
    if (barangDiTroli.length === 0) {
        document.getElementById("chekout-container").classList.add("d-none");
        console.log('berhasil');
        return;
    }
    chekout.innerHTML = "";
    chekout.innerHTML = `
        <span class="fs-6 fw-semibold text-light">Chekout</span>
        <span class="fs-6 fw-semibold text-light">Rp${total_harga.toLocaleString('id-ID')}</span>
    `;
}

window.onload = () => {
    const simpananbarangDiTroli = localStorage.getItem("barangDiTroli");
    chekoutDiTroli = [];
    localStorage.setItem("chekoutDiTroli", JSON.stringify(chekoutDiTroli));

    if (simpananbarangDiTroli) {
        barangDiTroli = JSON.parse(simpananbarangDiTroli);
        navbarChekout();
    } else {
        navbarChekout();
    }
    
    tampilkanBarangDiBeli();
};