const hitung = document.getElementById('hitung');

hitung.addEventListener('click', () => {
  const diag1 = Number(document.getElementById('diagonal1').value);
  const diag2 = Number(document.getElementById('diagonal2').value);
  const sisi  = Number(document.getElementById('sisi').value);

  const luas = (d1, d2) => 0.5 * d1 * d2;
  const keliling = s => 4 * s;

  const L = luas(diag1, diag2);
  const K = keliling(sisi);
  
  let ukuranL = "";
  let ukuranK = "";

  if (L >= 500){
      ukuranL = "ukuran luas belah ketupat: BESAR!!";
  } else if (L < 500 && L >= 100){
      ukuranL = "ukuran luas belah ketupat: SEDANG..";
  } else if (L >= 1 && L < 100){
      ukuranL = "ukuran luas belah ketupat: kecil..";
  } else {
      ukuranL = "ukuran tidak diketahui.. input anda tidak lengkap!!";
  };

  if (K >= 500){
      ukuranK = "ukuran keliling belah ketupat: BESAR!!";
  } else if (K < 500 && K >= 100){
      ukuranK = "ukuran keliling belah ketupat: SEDANG..";
  } else if (K >= 1 && K < 100){
      ukuranK = "ukuran keliling belah ketupat: kecil..";
  } else {
      ukuranK = "ukuran tidak diketahui.. input anda tidak lengkap!!";
  };   

  // ambil elemen dulu
  const elLuas = document.getElementById('ukuranLuas');
  const elKeliling = document.getElementById('ukuranKeliling');

  // hapus class lama supaya gak numpuk
  elLuas.classList.remove('hijau-bg', 'merah-bg');
  elKeliling.classList.remove('hijau-bg', 'merah-bg');

  // tambahkan class sesuai hasil
  if (L >= 1){
      elLuas.classList.add('hijau-bg', 'pudar');
  } else{
      elLuas.classList.add('merah-bg', 'pudar');
  }

  if (K >= 1){
      elKeliling.classList.add('hijau-bg', 'pudar');
  } else{
      elKeliling.classList.add('merah-bg', 'pudar');
  }

  document.getElementById('luas').textContent = `luas: ${L}`;
  document.getElementById('keliling').textContent = `keliling: ${K}`;
  elLuas.textContent = ukuranL;
  elKeliling.textContent = ukuranK;
});
