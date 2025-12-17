const chekout = document.getElementById('chekout');
console.log(chekout);
let produk = [];
let barangDiTroli = [];
let barangTerpilih = [];

document.getElementById('back').addEventListener('click', () => {
    window.history.back();
});

function tampilkanBarangDiBeli() {
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
                    </div>
                    <div class="product-price col-12 mt-auto d-flex justify-content-between py-2 g-0">
                        <span class="fs-6 fw-semibold text-start">Rp${item.productPrice.toLocaleString('id-ID')}</span>
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

};

chekout.addEventListener("click", () => {
    ambilBarangDicentang();
    console.log(barangTerpilih);
});

// function ambilBarangDicentang() {
//     document.querySelectorAll('.cek-item:checked').forEach(cb => {
//         const index = cb.dataset.index;
//         console.log(index);
//         barangTerpilih.push(barangDiTroli[index]);
//         setTimeout(() => {
//             barangDiTroli.splice(index, 1);
//         },2000); 
//     });
// };

function ambilBarangDicentang() {
    const indexes = [...document.querySelectorAll('.cek-item:checked')]
        .map(cb => Number(cb.dataset.index));

    barangTerpilih.push(
        ...indexes.map(i => barangDiTroli[i])
    );

    setTimeout(() => {
        barangDiTroli = barangDiTroli.filter((_, i) => !indexes.includes(i));
    }, 1000);

    setTimeout(() => {
        tampilkanBarangDiBeli();
    }, 1010);
    
}


window.onload = () => {
    const simpananbarangDiTroli = localStorage.getItem("barangDiTroli");
    const simpananProduk = localStorage.getItem("dataproduk");

    if (simpananProduk) {
        produk = JSON.parse(simpananProduk);
    }

    if (simpananbarangDiTroli) {
        barangDiTroli = JSON.parse(simpananbarangDiTroli);
        tampilkanBarangDiBeli();}
};