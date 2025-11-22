$(document).ready(function() {
  $('#hitung').on('click', function() {
    const diag1 = Number($('#diagonal1').val());
    const diag2 = Number($('#diagonal2').val());
    const sisi  = Number($('#sisi').val());

    const luas = (d1, d2) => 0.5 * d1 * d2;
    const keliling = s => 4 * s;

    const L = luas(diag1, diag2);
    const K = keliling(sisi);

    let ukuranL = "";
    let ukuranK = "";

    if (L >= 500) {
      ukuranL = "ukuran luas belah ketupat: BESAR!!";
    } else if (L < 500 && L >= 100) {
      ukuranL = "ukuran luas belah ketupat: SEDANG..";
    } else if (L >= 1 && L < 100) {
      ukuranL = "ukuran luas belah ketupat: kecil..";
    } else {
      ukuranL = "ukuran tidak diketahui.. input anda tidak lengkap!!";
    }

    if (K >= 500) {
      ukuranK = "ukuran keliling belah ketupat: BESAR!!";
    } else if (K < 500 && K >= 100) {
      ukuranK = "ukuran keliling belah ketupat: SEDANG..";
    } else if (K >= 1 && K < 100) {
      ukuranK = "ukuran keliling belah ketupat: kecil..";
    } else {
      ukuranK = "ukuran tidak diketahui.. input anda tidak lengkap!!";
    }

    // hapus class lama supaya gak numpuk
    $('#ukuranLuas, #ukuranKeliling').removeClass('hijau-bg merah-bg pudar');

    // tambahkan class sesuai hasil
    if (L >= 1) {
      $('#ukuranLuas').addClass('hijau-bg');
    } else {
      $('#ukuranLuas').addClass('merah-bg');
    }

    if (K >= 1) {
      $('#ukuranKeliling').addClass('hijau-bg');
    } else {
      $('#ukuranKeliling').addClass('merah-bg');
    }

    // tampilkan hasil
    $('#luas').text(`luas: ${L}`);
    $('#keliling').text(`keliling: ${K}`);
    $('#ukuranLuas').text(ukuranL);
    $('#ukuranKeliling').text(ukuranK);
  });
});
