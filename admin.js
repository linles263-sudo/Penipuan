// ===== CONFIG ASLI DARI index.html LU =====
const firebaseConfig = {
  apiKey: "AIzaSyDymhDdWpz17nJWrqbxc6djp",
  authDomain: "cekpenipuan-f1c13.firebaseapp.com",
  databaseURL: "https://cekpenipuan-f1c13-default-rtdb.firebaseio.com",
  projectId: "cekpenipuan-f1c13",
  storageBucket: "cekpenipuan-f1c13.appspot.com",
  messagingSenderId: "678145277685",
  appId: "1:678145277685:web:7117058bab9"
};
// ===== UDAH BENER. JANGAN DIUBAH LAGI =====

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const listLaporan = document.getElementById('list-laporan');

// ===== GANTI PASSWORD INI JADI RAHASIA LU =====
const passwordAsli = "hokage2026"; // <-- GANTI INI KALO MAU
// =============================================

const password = prompt("Masukin Password Hokage:");
if (password!== passwordAsli) {
    alert("Lu bukan Hokage! Akses ditolak.");
    document.body.innerHTML = "<h1 style='color:#ff4444;text-align:center;margin-top:50px'>AKSES DITOLAK</h1>";
    throw new Error("Password salah");
}

db.ref('laporan').orderByChild('status').equalTo('pending').on('value', (snapshot) => {
    listLaporan.innerHTML = '';
    if (!snapshot.exists()) {
        listLaporan.innerHTML = '<p class="loading">✅ Semua laporan udah di-ACC. Aman Prof!</p>';
        return;
    }

    snapshot.forEach((data) => {
        const key = data.key;
        const laporan = data.val();

        let fotoHTML = '<i>Tidak ada bukti foto</i>';
        if (laporan.bukti && laporan.bukti[0]) {
            fotoHTML = `<img src="${laporan.bukti[0]}" alt="Bukti Chat" loading="lazy">`;
        }

        const div = document.createElement('div');
        div.className = 'laporan';
        div.innerHTML = `
            <div class="nomor">📱 ${laporan.nomor || 'Nomor kosong'}</div>
            <div class="kronologi"><b>Kronologi:</b> ${laporan.kronologi || '-'}</div>
            <div><b>Waktu Lapor:</b> ${laporan.waktu || '-'}</div>
            <div><b>Bukti Chat:</b><br>${fotoHTML}</div>
            <br>
            <button class="acc" onclick="updateStatus('${key}', 'verified')">✅ ACC JADI VERIFIED</button>
            <button class="tolak" onclick="hapusLaporan('${key}')">❌ TOLAK/HAPUS</button>
        `;
        listLaporan.appendChild(div);
    });
}, (error) => {
    listLaporan.innerHTML = `<p style="color:#ff4444">Error: ${error.message}</p>`;
});

function updateStatus(key, statusBaru) {
    if (confirm('Yakin mau ACC laporan ini jadi VERIFIED?')) {
        db.ref('laporan/' + key).update({ status: statusBaru });
        alert('Berhasil di-ACC! Auto masuk web utama.');
    }
}

function hapusLaporan(key) {
    if (confirm('Yakin mau HAPUS laporan ini? Data hilang permanen.')) {
        db.ref('laporan/' + key).remove();
        alert('Laporan palsu berhasil dihapus.');
    }
      }
