const hitung = document.getElementById('hitung');

hitung.addEventListener('click', () => {
  const diag1 = Number(document.getElementById('diagonal1').value);
  const diag2 = Number(document.getElementById('diagonal2').value);
  const sisi  = Number(document.getElementById('sisi').value);

  const luas = (d1, d2) => 0.5 * d1 * d2;
  const keliling = s => 4 * s;

  const L = luas(diag1, diag2);
  const K = keliling(sisi);

  // fungsi untuk menentukan ukuran
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

  const ukuranL = tentukanUkuran(L, 'luas');
  const ukuranK = tentukanUkuran(K, 'keliling');

  const elLuas = document.getElementById('ukuranLuas');
  const elKeliling = document.getElementById('ukuranKeliling');

  elLuas.classList.remove('hijau-bg', 'merah-bg');
  elKeliling.classList.remove('hijau-bg', 'merah-bg');

  if (L >= 1) {
    elLuas.classList.add('hijau-bg');
  } else {
    elLuas.classList.add('merah-bg');
  }

  if (K >= 1) {
    elKeliling.classList.add('hijau-bg');
  } else {
    elKeliling.classList.add('merah-bg');
  }

  document.getElementById('luas').textContent = `luas: ${L}`;
  document.getElementById('keliling').textContent = `keliling: ${K}`;
  elLuas.textContent = ukuranL;
  elKeliling.textContent = ukuranK;
});
