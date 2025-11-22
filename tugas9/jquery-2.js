$(document).ready(function() {
    $('#hitung').on('click', function (){
        const diag1 = Number($('#diagonal1').val());
        const diag2 = Number($('#diagonal2').val());
        const sisi = Number($('#sisi').val());

        const rumusLuas = (d1, d2) => 0.5 * d1 * d2;
        const rumusKeliling = s => 4 * s;

        const luas = rumusLuas(diag1,diag2);
        const keliling = rumusKeliling(sisi);

        const tentukanUkuran = (nilai, jenis) => {
            if (nilai >= 500){
                return `ukuran ${jenis} belah ketupat: BESAR!!!`;
            } else if (nilai >= 100){
                return `ukuran ${jenis} belah ketupat: SEDANG..`;
            } else if (nilai >= 1){
                return `ukuran ${jenis} belah ketupat: kecil..`;
            } else {
                return `ukuran tidak diketahui.. input anda tidak lengkap!!`;
            }
        };

        const ukuranL = tentukanUkuran(luas,'luas');
        const ukuranK = tentukanUkuran(keliling,'keliling');

        //RAGU
        $('#ukuranLuas, #ukuranKeliling').removeClass('hijau-bg merah-bg');

        if (luas >= 1){
            $('#ukuranLuas').addClass('hijau-bg');
        } else {
            $('#ukuranLuas').addClass('merah-bg');
        }

        if (keliling >= 1){
            $('#ukuranKeliling').addClass('hijau-bg');
        } else {
            $('#ukuranKeliling').addClass('merah-bg');
        }

        $('#luas').text(`luas: ${luas}`);
        $('#keliling').text(`keliling: ${keliling}`);
        $('#ukuranLuas').text(ukuranL);
        $('#ukuranKeliling').text(ukuranK);
    });
});