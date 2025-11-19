const tambahData = document.getElementById("tambahData");
const tbody = document.querySelector("tbody");
const jumlahSantri = document.getElementById('jumlahSantri');
console.log(tbody);
let santri = [];
let dataSantri = [];
let editIndex = null;
let currentSort = { key: null, dir: 'asc' };

const sortBySelect = document.getElementById('sortBy');
const sortDirBtn = document.getElementById('sortDir');
const resetSortBtn = document.getElementById('resetSort');

function compareValues(a, b, key) {
    const va = a[key];
    const vb = b[key];

    if (typeof va === 'string' && typeof vb === 'string') {
        return va.toLowerCase().localeCompare(vb.toLowerCase());
    }

    if (typeof va === 'number' && typeof vb === 'number') {
        return va - vb;
    }

    return String(va).toLowerCase().localeCompare(String(vb).toLowerCase());
}

function getSortedData(data) {
    if (!currentSort.key) return data.slice();

    const sorted = data.slice().sort((x, y) => {
        const cmp = compareValues(x, y, currentSort.key);
        return currentSort.dir === 'asc' ? cmp : -cmp;
    });
    
    return sorted;
}

sortBySelect?.addEventListener('change', () => {
    const key = sortBySelect.value || null;
    currentSort.key = key;

    renderWithCurrentSort();
});

sortDirBtn?.addEventListener('click', () => {
    currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
    sortDirBtn.textContent = currentSort.dir === 'asc' ? 'A → Z' : 'Z → A';

    renderWithCurrentSort();
});

resetSortBtn?.addEventListener('click', () => {
    currentSort.key = null;
    currentSort.dir = 'asc';
    sortBySelect.value = "";
    sortDirBtn.textContent = 'A → Z';

    renderWithCurrentSort();
});

function renderWithCurrentSort() {

    const kata = (document.getElementById('cari')?.value || "").trim().toLowerCase();

    if (kata) {
        dataSantri = santri.map((item) => ({ ...item, usia: hitungUmur(item.TTL) }));
        console.log('ini data santri',dataSantri);
        const hasil = dataSantri
        .map((item, index) => ({ ...item, indexAsli: index }))
        .filter(item => item.nama.toLowerCase().includes(kata));
        const dataToShow = getSortedData(hasil);
        console.log(hasil);
        console.log(currentSort);

        tampilkanHasilCari(dataToShow);
    } else {
        dataSantri = santri.map((item) => ({ ...item, usia: hitungUmur(item.TTL) }));
        console.log('ini data santri',dataSantri);
        console.log('ini santri', santri);
        const sorted = getSortedData(dataSantri);
        console.log(currentSort);

        tampilkanDataDariArray(sorted);
    }

}

function tampilkanDataDariArray(arrayData) {
    tbody.innerHTML = "";
    jumlahSantri.textContent = `Jumlah Santri: (${arrayData.length})`;

    arrayData.forEach((item, index) => {

        const asliIndex = item.indexAsli !== undefined ? item.indexAsli : dataSantri.indexOf(item);

        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nama}</td>
        <td>${item.alamat}</td>
        <td>${formatIndo(item.TTL)}</td>
        <td>${item.usia}</td>
        <td>${item.jumlahHafalan}</td>
        <td>${item.HafalanKitab.join(", ")}</td>
        <td>
            <a href="#input" class="text-reset text-decoration-none">
            <button data-index="${asliIndex}" class="btn btn-warning btn-sm edit">Edit</button>
            </a>
            <button data-index="${asliIndex}" class="btn btn-danger btn-sm hapus">Hapus</button>
        </td>
        `;
        tbody.appendChild(tr);
    });

}

async function ambildata() {
    try{
        const res = await fetch("dataSantri.json");
        santri = await res.json();
        console.log(santri);
        dataSantri = santri.map((item) => ({ ...item, usia: hitungUmur(item.TTL) }));
        console.log('ini data santri',dataSantri);

        renderWithCurrentSort();
    } catch (err) {
        console.error("aduuuh error pulaa", err);
    }
} 

tambahData.addEventListener('click', () => {
    const nama = kapital(document.getElementById("namaSantri"));
    const alamat = kapital(document.getElementById("alamat"));
    const TTL = document.getElementById("TTL").value;
    const jumlahHafalan = Number(document.getElementById("jumlahHafalan").value);
    const HafalanKitab = kapitalArray(document.getElementById("kitabYangTelahDiHafal"));
    console.log('atas',editIndex);

    if (nama === "" || alamat === "" || TTL <1 || jumlahHafalan <1 || !Array.isArray(HafalanKitab) || HafalanKitab.length === 0) {
        alert ("isi semua input terlebih dahulu!!")
        return;
    }

    if (editIndex !== null) {
        santri[editIndex] = {nama, alamat, TTL, jumlahHafalan, HafalanKitab};
        editIndex = null;

        tambahData.textContent = "Tambah Data";
        tambahData.classList.remove("btn-success");
        tambahData.classList.add("btn-primary");
        showToast("Perubahan berhasil disimpan!", "success");
    } else {
        santri.push({nama, alamat, TTL, jumlahHafalan, HafalanKitab});
        showToast("Data ditambahkan!", "success");
    }

    console.log(santri);
    renderWithCurrentSort();
    localStorage.setItem("dataSantri2", JSON.stringify(santri));

    const input = ['namaSantri', 'alamat', 'TTL', 'jumlahHafalan', 'kitabYangTelahDiHafal'];
    input.forEach(id => {
        document.getElementById(id).value = '';
    });
});

tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('hapus')) {
        const index = e.target.dataset.index;
        santri.splice(index, 1);
        renderWithCurrentSort();
        showToast("Data dihapus!", "info");
        localStorage.setItem("dataSantri2", JSON.stringify(santri));
    }

    if (e.target.classList.contains('edit')) {
        editIndex = e.target.dataset.index;
        console.log(editIndex);

        document.getElementById("namaSantri").value = santri[editIndex].nama;
        document.getElementById('alamat').value = santri[editIndex].alamat;
        document.getElementById('TTL').value = santri[editIndex].TTL;
        document.getElementById('jumlahHafalan').value = santri[editIndex].jumlahHafalan;
        document.getElementById('kitabYangTelahDiHafal').value = santri[editIndex].HafalanKitab.join(", ");

        tambahData.textContent = "Simpan perubahan";
        tambahData.classList.remove('btn-primary');
        tambahData.classList.add('btn-success');

    }
});

function kapital(inputElement) {
    const teks = inputElement.value;
    const hasil = teks
        .split(" ")
        .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1).toLowerCase())
        .join(" ");

    inputElement.value = hasil;
    return hasil;
}

function kapitalArray(inputElement) {
    const teks = inputElement.value;

    const daftarKitab = teks
        .split(",")
        .map(kitab =>
        kitab
            .trim()
            .split(" ")
            .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1).toLowerCase())
            .join(" ") 
        )
        .filter(k => k !== "");

    inputElement.value = daftarKitab.join(", ");
    return daftarKitab;
}

function formatIndo(tgl) {
    return new Date(tgl).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function hitungUmur(tanggalLahir) {
    const today = new Date();                 
    const birth = new Date(tanggalLahir); 

    let umur = today.getFullYear() - birth.getFullYear();
    const bulan = today.getMonth() - birth.getMonth();

    if (bulan < 0 || (bulan === 0 && today.getDate() < birth.getDate())) {
        umur--;
    }

    return umur;
}


const inputCari = document.getElementById('cari');

inputCari.addEventListener('input', () => {

    renderWithCurrentSort();

});

function tampilkanHasilCari(data) {
    tbody.innerHTML = "";

    data.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.alamat}</td>
            <td>${formatIndo(item.TTL)}</td>
            <td>${item.usia}</td>
            <td>${item.jumlahHafalan}</td>
            <td>${item.HafalanKitab.join(", ")}</td>
            <td>
                <a href="#input" class="text-reset text-decoration-none">
                    <button data-index="${item.indexAsli}" class="btn btn-warning btn-sm edit">Edit</button>
                </a>
                <button data-index="${item.indexAsli}" class="btn btn-danger btn-sm hapus">Hapus</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function autoEnter() {
    const INPUT_IDS = [
        "namaSantri",
        "alamat", 
        "TTL", 
        "jumlahHafalan", 
        "kitabYangTelahDiHafal"
    ];

    INPUT_IDS.forEach((id, index) => {
        const input = document.getElementById(id);
        if (!input) return;

        let wasEmpty = false;

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                focusNextInput(index);
            } else if (e.key === "Backspace") {
                wasEmpty = !input.value;
            }
        });

        input.addEventListener("keyup", (e) => {
            if (e.key === "Backspace" && wasEmpty && !input.value && index > 0) {
                focusPrevInput(index);
            }
        });

        input.addEventListener("blur", () => {
            input.value = input.value.trim();
        });
    });

    function focusNextInput(currentIndex) {
        if (currentIndex < INPUT_IDS.length - 1) {
            document.getElementById(INPUT_IDS[currentIndex + 1])?.focus();
        } else {
            document.getElementById('tambahData')?.click();
        }
    }

    function focusPrevInput(currentIndex) {
        const prevInput = document.getElementById(INPUT_IDS[currentIndex - 1]);
        prevInput?.focus();
        prevInput?.select();
    }
}

function showToast(pesan, warna = "primary") {
    const toastEl = document.getElementById("myToast");

    toastEl.className = `toast align-items-center text-white bg-${warna} border-0`;

    toastEl.querySelector(".toast-body").textContent = pesan;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

window.onload = () => {
    const simpanan = localStorage.getItem("dataSantri2");

    if (simpanan) {
        const data = JSON.parse(simpanan);
        if (Array.isArray(data) && data.length > 0) {
            santri = data;
            renderWithCurrentSort();
        } else {
        ambildata();
        }
    } else {
        ambildata();
    }

    autoEnter();
};
