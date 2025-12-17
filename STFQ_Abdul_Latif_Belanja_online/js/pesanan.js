const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const detailBarangDiBeli = document.getElementById("detailBarangDiBeli");
const backToChekout = document.getElementById("backToChekout");

backToChekout.addEventListener("click", () => {
    window.history.back();
});

let produk = [];
let barangYangDiBeli = [];

function tampilkanBarangDiBeli() {
    barangYangDiBeli.forEach((item, index) => {
        const detailItem = document.createElement("div");
        detailItem.innerHTML = `
            <div class="col-12 row g-0 garis-tipis py-2">
                <div class="col-1 ps-3">
                    <i class="fa-solid fa-location-dot text-primary"></i>
                </div>
                <div class="col-11 px-2 d-flex flex-column alamatReady">
                    <h6>${item.namaPenerima}</h6>
                    <div class="alamat-box">
                        <p class="alamatPengiriman clamped m-0">
                            ${item.alamatPenerima}
                        </p>

                        <span class="fadeAlamat"></span>

                        <span class="toggleAlamat">Baca selengkapnya</span>
                    </div>
                </div>
            </div>
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
                    </div>
                    <div class="product-price col-12 row mt-auto py-2 g-0">
                        <span class="fs-6 col-6 fw-semibold text-start">Rp${item.productPrice.toLocaleString('id-ID')}</span>
                        <span class="fs-6 col-6 fw-semibold text-end">Jml.:${item.jumlahPesanan}</span>
                    </div>
                </div>                   
            </div>
            <div class="row g-0 pe-3 mb-2 garis-tebal">
                <div class="col-12 py-2 d-flex text-end justify-content-end">
                    <span class="fs-6 me-2">Total (${item.jumlahPesanan} Produk):</span>
                    <span class="fs-6 fw-semibold">Rp${item.totalHarga.toLocaleString('id-ID')}</span>
                </div>
                <div class="col-12 d-flex justify-content-end my-3">
                    <button class="batalkan text-secondary" data-id="${item.id}" data-index="${index}">batalkan</button>
                </div>
            </div>
        `;

        detailBarangDiBeli.appendChild(detailItem);   
        console.log(detailItem);
        
        const titleBox = detailItem.querySelector(".title-box");
        const productTitle = titleBox.querySelector(".productTitle");
        const fadeTitle = titleBox.querySelector(".fadeTitle");
        const toggleTitle = titleBox.querySelector(".toggleTitle");
        const alamatBox = detailItem.querySelector(".alamat-box");
        const alamatPengiriman = alamatBox.querySelector(".alamatPengiriman");
        const fadeAlamat = alamatBox.querySelector(".fadeAlamat");
        const toggleAlamat = alamatBox.querySelector(".toggleAlamat");

        function isOverflow(element, threshold = 100) {
            if (!element) return false;
            return element.scrollHeight > element.clientHeight + threshold;
        }

        if (!isOverflow(alamatPengiriman, 5)) {
            toggleAlamat.style.display = "none";
            fadeAlamat.style.display = "none";
        }

        toggleAlamat.addEventListener("click", () => {
            alamatPengiriman.classList.toggle('expanded');
            if (alamatPengiriman.classList.contains("expanded")) {
                toggleAlamat.textContent = "sembunyikan";
                fadeAlamat.style.display = "none";
            } else {
                toggleAlamat.textContent = "Baca selengkapnya";
                fadeAlamat.style.display = "block";
            }
        });

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

};

detailBarangDiBeli.addEventListener("click", (event) => {
    button = event.target.closest(".batalkan");
    if (!button) return;
        const index = +button.dataset.index;
        const idP = +button.dataset.id;
        
        const jumlahDibatalkan = barangYangDiBeli[index].jumlahPesanan;
        produk[idP].productStock += jumlahDibatalkan;
        barangYangDiBeli.splice(index, 1);
        localStorage.setItem("dataproduk", JSON.stringify(produk));
        localStorage.setItem("barangYangDiBeli", JSON.stringify(barangYangDiBeli));
        detailBarangDiBeli.innerHTML = "";
        tampilkanBarangDiBeli();
        console.log(produk);
        console.log(barangYangDiBeli);
    }
);

// window.addEventListener("pageshow", (event) => {
//     if (event.persisted) { 
//         window.location.href = "detail-product.html?id="+id;
//     }
// });

window.onload = () => {
    const simpananBarangYangDibeli = localStorage.getItem("barangYangDiBeli");
    const simpananProduk = localStorage.getItem("dataproduk");

    if (simpananProduk) {
        produk = JSON.parse(simpananProduk);
    }

    if (simpananBarangYangDibeli) {
        barangYangDiBeli = JSON.parse(simpananBarangYangDibeli);
        tampilkanBarangDiBeli();}
};