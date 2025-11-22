document
  .getElementById("pendaftaranForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // cegah submit default

    // ambil semua field
    const nama = document.getElementById("nama").value.trim();
    const ttl = document.getElementById("ttl").value.trim();
    const jk = document.getElementById("jk").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const pendidikan = document.getElementById("pendidikan").value.trim();
    const nisn = document.getElementById("nisn").value.trim();
    const nik = document.getElementById("nik").value.trim();

    const successMsg = document.getElementById("successMsg");
    const errorMsg = document.getElementById("errorMsg");

    // fungsi untuk tampilkan error dengan pesan custom
    function showError(msg) {
      errorMsg.textContent = "⚠️ " + msg;
      errorMsg.classList.remove("hide");
      successMsg.classList.add("hide");
    }

    // cek field kosong
    if (
      !nama ||
      !ttl ||
      !jk ||
      !alamat ||
      !telepon ||
      !pendidikan ||
      !nisn ||
      !nik
    ) {
      showError("Harap isi semua field!");
      return;
    }

    // validasi nomor HP (angka, mulai 08, panjang min 10)
    const hpPattern = /^08[0-9]{8,}$/;
    if (!hpPattern.test(telepon)) {
      showError("Nomor HP harus angka, diawali 08, dan minimal 10 digit!");
      return;
    }

    // validasi NISN (10 digit angka)
    const nisnPattern = /^[0-9]{10}$/;
    if (!nisnPattern.test(nisn)) {
      showError("NISN harus berupa 10 digit angka!");
      return;
    }

    // validasi NIK (16 digit angka)
    const nikPattern = /^[0-9]{16}$/;
    if (!nikPattern.test(nik)) {
      showError("NIK harus berupa 16 digit angka!");
      return;
    }

    // kalau semua valid
    successMsg.classList.remove("hide");
    errorMsg.classList.add("hide");

    // sembunyikan sukses setelah 3 detik lalu refresh
    setTimeout(() => {
      successMsg.classList.add("hide");
      location.reload(); // refresh halaman
    }, 3000);
  });
