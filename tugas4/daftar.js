    const form = document.getElementById("pendaftaranForm");
    const successMsg = document.getElementById("successMsg");
    const errorMsg = document.getElementById("errorMsg");

    form.addEventListener("submit", function(e) {
      e.preventDefault(); // cegah refresh halaman

      // ambil semua input
      const nama = document.getElementById("nama").value.trim();
      const ttl = document.getElementById("ttl").value.trim();
      const jk = document.getElementById("jk").value;
      const alamat = document.getElementById("alamat").value.trim();
      const telepon = document.getElementById("telepon").value.trim();
      const pendidikan = document.getElementById("pendidikan").value.trim();
      const nisn = document.getElementById("nisn").value.trim();
      const nik = document.getElementById("nik").value.trim();


      if (nama && ttl && jk && alamat && telepon && pendidikan && nisn && nik) {
        errorMsg.style.display = "none";
        successMsg.style.display = "block";

        // reset form
        form.reset();
      } else {
        successMsg.style.display = "none";
        errorMsg.style.display = "block";
      }
    });