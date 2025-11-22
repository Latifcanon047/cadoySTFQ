const tempatRusmus = document.getElementById('tempatInput');
const belahKetupat = document.getElementById('rumusBelahKetupat');
const kubik = document.getElementById('rumusKubik');
const silinder = document.getElementById('rumusSilinder');
const bola = document.getElementById('rumusBola');
const balok = document.getElementById('rumusBalok');

belahKetupat.addEventListener('click', () => {
  tempatRusmus.innerHTML = `
                    <div class="w-100 bg-white shadow-lg rounded-4 p-4">
                        <h4 class="text-center mb-4 text-primary">
                        Hitung Keliling dan Luas <b>Belah Ketupat</b>
                        </h4>

                        <div class="d-flex flex-column bg-dark text-white p-4 rounded-4 shadow-sm">
                            <h6 class="mb-3">
                                Masukan <span class="text-info fw-bold">diagonal</span> untuk
                                menghitung <span class="text-info fw-bold">luas</span> dan
                                masukan <span class="text-warning fw-bold">sisi</span> untuk
                                menghitung <span class="text-warning fw-bold">keliling</span>.
                            </h6>

                            <label for="diagonal1" class="mt-2">Diagonal 1:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="diagonal1"
                                placeholder="Masukkan diagonal 1"/>

                            <label for="diagonal2">Diagonal 2:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="diagonal2"
                                placeholder="Masukkan diagonal 2"/>

                            <label for="sisi">Sisi:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="sisi"
                                placeholder="Masukkan sisi"/>

                            <button
                                type="button"
                                id="hitungBelahKetupat"
                                class="mx-auto text-white rounded-3 px-4 py-2 my-3 bayangan" >
                                Hitung
                            </button>

                            <div class="bg-white text-dark p-3 rounded-3 shadow-sm">
                                <h5 class="text-center text-primary mb-3">Hasil:</h5>
                                <p id="luas">Luas: ............</p>
                                <p id="keliling">Keliling: ............</p>
                                <p id="ukuranLuas">Ukuran luas belah ketupat: ............</p>
                                <p id="ukuranKeliling">Ukuran keliling belah ketupat: ...........</p>
                            </div>
                        </div>
                    </div>`

  const hitungBelahKetupat = document.getElementById('hitungBelahKetupat');
  hitungBelahKetupat.addEventListener('click', () => {
    const diag1 = Number(document.getElementById('diagonal1').value);
    const diag2 = Number(document.getElementById('diagonal2').value);
    const sisi  = Number(document.getElementById('sisi').value);

    const luas = 0.5 * diag1 * diag2;
    const keliling = 4 * sisi;

    const tentukanUkuran = (nilai, jenis) => {
      if (nilai >= 500) {
        return `ukuran ${jenis} belah ketupat: BESAR!!`;
      } else if (nilai >= 100) {
        return `ukuran ${jenis} belah ketupat: SEDANG..`;
      } else if (nilai >= 1) {
        return `ukuran ${jenis} belah ketupat: kecil..`;
      } else {
        return `ukuran tidak diketahui.. input anda tidak lengkap!!`;
      }
    };

    const ukuranL = tentukanUkuran(luas, 'luas');
    const ukuranK = tentukanUkuran(keliling, 'keliling');

    const ukuranLuas = document.getElementById('ukuranLuas');
    const ukuranKeliling = document.getElementById('ukuranKeliling');

    ukuranLuas.classList.remove('hijau-bg', 'merah-bg');
    ukuranKeliling.classList.remove('hijau-bg', 'merah-bg');

    if (luas >= 1) {
      ukuranLuas.classList.add('hijau-bg');
    } else {
      ukuranLuas.classList.add('merah-bg');
    }

    if (keliling >= 1) {
      ukuranKeliling.classList.add('hijau-bg');
    } else {
      ukuranKeliling.classList.add('merah-bg');
    }

    document.getElementById('luas').textContent = `luas: ${luas}`;
    document.getElementById('keliling').textContent = `keliling: ${keliling}`;
    ukuranLuas.textContent = ukuranL;
    ukuranKeliling.textContent = ukuranK;
    console.log('ini dari dalam');
  });
});

  const hitungBelahKetupat = document.getElementById('hitungBelahKetupat');
  hitungBelahKetupat.addEventListener('click', () => {
    const diag1 = Number(document.getElementById('diagonal1').value);
    const diag2 = Number(document.getElementById('diagonal2').value);
    const sisi  = Number(document.getElementById('sisi').value);

    const luas = 0.5 * diag1 * diag2;
    const keliling = 4 * sisi;

    const tentukanUkuran = (nilai, jenis) => {
      if (nilai >= 500) {
        return `ukuran ${jenis} belah ketupat: BESAR!!`;
      } else if (nilai >= 100) {
        return `ukuran ${jenis} belah ketupat: SEDANG..`;
      } else if (nilai >= 1) {
        return `ukuran ${jenis} belah ketupat: kecil..`;
      } else {
        return `ukuran tidak diketahui.. input anda tidak lengkap!!`;
      }
    };

    const ukuranL = tentukanUkuran(luas, 'luas');
    const ukuranK = tentukanUkuran(keliling, 'keliling');

    const ukuranLuas = document.getElementById('ukuranLuas');
    const ukuranKeliling = document.getElementById('ukuranKeliling');

    ukuranLuas.classList.remove('hijau-bg', 'merah-bg');
    ukuranKeliling.classList.remove('hijau-bg', 'merah-bg');

    if (luas >= 1) {
      ukuranLuas.classList.add('hijau-bg');
    } else {
      ukuranLuas.classList.add('merah-bg');
    }

    if (keliling >= 1) {
      ukuranKeliling.classList.add('hijau-bg');
    } else {
      ukuranKeliling.classList.add('merah-bg');
    }

    document.getElementById('luas').textContent = `luas: ${luas}`;
    document.getElementById('keliling').textContent = `keliling: ${keliling}`;
    ukuranLuas.textContent = ukuranL;
    ukuranKeliling.textContent = ukuranK;
    console.log('ini dari luar');
  });

kubik.addEventListener('click', () => {
  tempatRusmus.innerHTML = `<div class="w-100 bg-white shadow-lg rounded-4 p-4">
                        <h4 class="text-center mb-4 text-primary">
                        Hitung luas dan volume <b>Kubik</b>
                        </h4>

                        <div class="d-flex flex-column bg-dark text-white p-4 rounded-4 shadow-sm">
                            <h6 class="mb-3">
                                Masukan <span class="text-info fw-bold">sisi</span> untuk
                                menghitung <span class="text-info fw-bold">luas</span> dan
                                <span class="text-info fw-bold">Volume</span>.
                            </h6>

                            <label for="diagonal1" class="mt-2">Sisi:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="sisiKubik"
                                placeholder="Masukkan Sisi"/>

                            <button
                                type="button"
                                id="hitungKubik"
                                class="mx-auto text-white rounded-3 px-4 py-2 my-3 bayangan" >
                                Hitung
                            </button>

                            <div class="bg-white text-dark p-3 rounded-3 shadow-sm">
                                <h5 class="text-center text-primary mb-3">Hasil:</h5>
                                <p id="luasKubik">Luas: ............</p>
                                <p id="volumeKubik">Volume: ............</p>
                                <p id="ukuranKubik">Ukuran Kubik: ............</p>
                            </div>
                        </div>
                    </div>`

  const hitungKubik = document.getElementById('hitungKubik');
  hitungKubik.addEventListener('click', () => { 
    const sisiKubik = Number(document.getElementById('sisiKubik').value);
    const rumusLuasKubik = 6 * (sisiKubik*sisiKubik);
    const rumusVolumeKubik = sisiKubik * sisiKubik * sisiKubik;
    const luasKubik = document.getElementById('luasKubik');
    const volumeKubik = document.getElementById('volumeKubik');
    const ukuranKubik = document.getElementById('ukuranKubik');
    let ukuran = "";

    if (rumusLuasKubik >= 300) {
      ukuran = "Ukuran kubik: BESAR";
    } else if (rumusLuasKubik >= 200) {
      ukuran = "Ukuran kubik: Sedang";
    } else if (rumusLuasKubik > 1) {
      ukuran = "Ukuran kubik: kecil";
    } else {
      ukuran = "Masukan sisi terlebih dahulu";
    }

    ukuranKubik.classList.remove('hijau-bg', 'merah-bg' );

    if (rumusLuasKubik > 0) {
      ukuranKubik.classList.add('hijau-bg');
    } else {
      ukuranKubik.classList.add('merah-bg');
    }

    luasKubik.textContent = `luas: ${rumusLuasKubik}`;
    volumeKubik.textContent = `Volume: ${rumusVolumeKubik}`;
    ukuranKubik.textContent = `${ukuran}`;
  });
});

silinder.addEventListener('click', () => {
  tempatRusmus.innerHTML = `<div class="w-100 bg-white shadow-lg rounded-4 p-4">
                        <h4 class="text-center mb-4 text-primary">
                        Hitung luas dan volume <b>Silinder</b>
                        </h4>

                        <div class="d-flex flex-column bg-dark text-white p-4 rounded-4 shadow-sm">
                            <h6 class="mb-3">
                                Masukan <span class="text-info fw-bold">jari-jari & Tinggi</span> untuk menghitung
                                <span class="text-info fw-bold">Luas & volume</span>.
                            </h6>

                            <label for="jari-jari" class="mt-2">Jari-jari:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="jarijariSilinder"
                                placeholder="Masukkan Jari-jari"/>
                            <label for="Tinggi" class="mt-2">Tinggi:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="tinggiSilinder"
                                placeholder="Masukkan Tinggi"/>

                            <button
                                type="button"
                                id="hitungSilinder"
                                class="mx-auto text-white rounded-3 px-4 py-2 my-3 bayangan" >
                                Hitung
                            </button>

                            <div class="bg-white text-dark p-3 rounded-3 shadow-sm">
                                <h5 class="text-center text-primary mb-3">Hasil:</h5>
                                <p id="luasSilinder">Luas: ............</p>
                                <p id="volumeSilinder">Volume: ............</p>
                                <p id="ukuranSilinder">Ukuran Silinder: ............</p>
                            </div>
                        </div>`
  
  const hitungSilinder = document.getElementById('hitungSilinder');
  hitungSilinder.addEventListener('click', () => {
    const jarijariSilinder = Number(document.getElementById('jarijariSilinder').value);
    const tinggiSilinder = Number(document.getElementById('tinggiSilinder').value);
    const LSilinder = document.getElementById('luasSilinder');
    const VSilinder = document.getElementById('volumeSilinder');
    const ukuranSilinder = document.getElementById('ukuranSilinder');

    const luasSilinder = 2 * Math.PI * jarijariSilinder * (jarijariSilinder + tinggiSilinder);
    const volumeSilinder = Math.PI * (jarijariSilinder * jarijariSilinder) * tinggiSilinder;
    let ukuran = "";

    if  (luasSilinder >= 300) {
        ukuran = "Ukuran silinder: BESAR";
    } else if (luasSilinder >= 200) {
        ukuran = "Ukuran silinder: Sedang";
    } else if (luasSilinder > 1) {
        ukuran = "Ukuran silinder: kecil";
    } else {
        ukuran = "Masukan jari-jari dan tinggi terlebih dahulu..";
    }

    ukuranSilinder.classList.remove('hujau-bg', 'merah-bg');
    if (luasSilinder > 0) {
        ukuranSilinder.classList.add('hijau-bg');
    } else {
        ukuranSilinder.classList.add('merah-bg');
    }

    LSilinder.textContent = `Luas: ${luasSilinder.toFixed(2)}`;
    VSilinder.textContent = `Volume: ${volumeSilinder.toFixed(2)}`;
    ukuranSilinder.textContent = `${ukuran}`;
  }); 
});

bola.addEventListener('click', () => {
  tempatRusmus.innerHTML = `<div class="w-100 bg-white shadow-lg rounded-4 p-4">
                        <h4 class="text-center mb-4 text-primary">
                        Hitung luas dan volume <b>Bola</b>
                        </h4>

                        <div class="d-flex flex-column bg-dark text-white p-4 rounded-4 shadow-sm">
                            <h6 class="mb-3">
                                Masukan <span class="text-info fw-bold">jari-jari </span> untuk menghitung
                                <span class="text-info fw-bold">Luas & volume</span>.
                            </h6>

                            <label for="jari-jari" class="mt-2">Jari-jari:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="jarijariBola"
                                placeholder="Masukkan Jari-jari"/>
                        
                            <button
                                type="button"
                                id="hitungBola"
                                class="mx-auto text-white rounded-3 px-4 py-2 my-3 bayangan" >
                                Hitung
                            </button>

                            <div class="bg-white text-dark p-3 rounded-3 shadow-sm">
                                <h5 class="text-center text-primary mb-3">Hasil:</h5>
                                <p id="luasBola">Luas: ............</p>
                                <p id="volumeBola">Volume: ............</p>
                                <p id="ukuranBola">Ukuran bola: ............</p>
                            </div>
                        </div>
                    </div>`

  const hitungBola = document.getElementById('hitungBola');
  hitungBola.addEventListener('click', () => {
    const r = Number(document.getElementById('jarijariBola').value);
    const LBola = document.getElementById('luasBola');
    const VBola = document.getElementById('volumeBola');
    const ukuranBola = document.getElementById('ukuranBola');

    const luasBola = 4 * Math.PI * (r * r);
    const volumeBola = (4/3) * Math.PI  * (r * r * r);
    let ukuran = "";

    if  (luasBola >= 300) {
        ukuran = "Ukuran bola: BESAR";
    } else if (luasBola >= 200) {
        ukuran = "Ukuran bola: Sedang";
    } else if (luasBola > 1) {
        ukuran = "Ukuran bola: kecil";
    } else {
        ukuran = "Masukan jari-jari terlebih dahulu..";
    }

    ukuranBola.classList.remove('hujau-bg', 'merah-bg');
    if (luasBola > 0) {
        ukuranBola.classList.add('hijau-bg');
    } else {
        ukuranBola.classList.add('merah-bg');
    }

    LBola.textContent = `Luas: ${luasBola.toFixed(2)}`;
    VBola.textContent = `Volume: ${volumeBola.toFixed(2)}`;
    ukuranBola.textContent = `${ukuran}`;
  }); 
});

balok.addEventListener('click', () => {
  tempatRusmus.innerHTML = `<div class="w-100 bg-white shadow-lg rounded-4 p-4">
                        <h4 class="text-center mb-4 text-primary">
                        Hitung luas dan volume <b>Balok</b>
                        </h4>

                        <div class="d-flex flex-column bg-dark text-white p-4 rounded-4 shadow-sm">
                            <h6 class="mb-3">
                                Masukan <span class="text-info fw-bold">Panjang, Lebar dan Tinggi </span> untuk menghitung
                                <span class="text-info fw-bold">Luas & volume</span>.
                            </h6>

                            <label for="Panjang" class="mt-2">Panjang:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="panjang"
                                placeholder="Masukkan Panjang"/>
                            <label for="lebar" class="mt-2">Lebar:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="lebar"
                                placeholder="Masukkan Lebar"/>
                            <label for="tinggi" class="mt-2">Tinggi:</label>
                            <input
                                class="mb-2 form-control"
                                type="number"
                                id="tinggi"
                                placeholder="Masukkan Tinggi"/>

                        
                            <button
                                type="button"
                                id="hitungBalok"
                                class="mx-auto text-white rounded-3 px-4 py-2 my-3 bayangan" >
                                Hitung
                            </button>

                            <div class="bg-white text-dark p-3 rounded-3 shadow-sm">
                                <h5 class="text-center text-primary mb-3">Hasil:</h5>
                                <p id="luasBalok">Luas: ............</p>
                                <p id="volumeBalok">Volume: ............</p>
                                <p id="ukuranBalok">Ukuran balok: ............</p>
                            </div>
                        </div>
                    </div>`

  const hitungBalok = document.getElementById('hitungBalok');
  hitungBalok.addEventListener('click', () => {
    const P = Number(document.getElementById('panjang').value);
    const L = Number(document.getElementById('lebar').value);
    const T = Number(document.getElementById('tinggi').value);
    const LBalok = document.getElementById('luasBalok');
    const VBalok = document.getElementById('volumeBalok');
    const ukuranBalok = document.getElementById('ukuranBalok');

    const volumeBalok = P * L * T;
    const luasBalok = 2 * (P*L + P*T + L*T);
    let ukuran = "";

    if  (luasBalok >= 300) {
        ukuran = "Ukuran balok: BESAR";
    } else if (luasBalok >= 200) {
        ukuran = "Ukuran balok: Sedang";
    } else if (luasBalok > 1) {
        ukuran = "Ukuran balok: kecil";
    } else {
        ukuran = "Masukan panjang, lebar dan tinggi terlebih dahulu..";
    }

    ukuranBalok.classList.remove('hujau-bg', 'merah-bg');
    if (luasBalok > 0) {
        ukuranBalok.classList.add('hijau-bg');
    } else {
        ukuranBalok.classList.add('merah-bg');
    }

    LBalok.textContent = `Luas: ${luasBalok}`;
    VBalok.textContent = `Volume: ${volumeBalok}`;
    ukuranBalok.textContent = `${ukuran}`;
}); 
})