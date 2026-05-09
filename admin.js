// 1. GANTI firebaseConfig INI SAMA PUNYA LU DARI index.html
const firebaseConfig = {
  apiKey: "PASTE_API_KEY_LU",
  authDomain: "PASTE_AUTH_DOMAIN_LU",
  databaseURL: "PASTE_DATABASE_URL_LU",
  projectId: "PASTE_PROJECT_ID_LU",
  storageBucket: "PASTE_STORAGE_BUCKET_LU",
  messagingSenderId: "PASTE_SENDER_ID_LU",
  appId: "PASTE_APP_ID_LU"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const listLaporan = document.getElementById('list-laporan');

// 2. GANTI PASSWORD INI JADI RAHASIA LU
const password = prompt("Masukin Password Hokage:");
if (password!== "GANTI_PASSWORD_LU_DISINI") { 
    alert("Lu bukan Hokage!");
    document.body.innerHTML = "<h1>AKSES DITOLAK</h1>";
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
        let fotoHTML = 'Tidak ada bukti foto';
        if (laporan.bukti && laporan.bukti[0]) {
            fotoHTML = `<img src="${laporan.bukti[0]}" alt="Bukti Chat">`;
        }
        const div = document.createElement('div');
        div.className = 'laporan';
        div.innerHTML = `
            <div class="nomor">${laporan.nomor}</div>
            <div class="kronologi"><b>Kronologi:</b> ${laporan.kronologi}</div>
            <div><b>Bukti Chat:</b><br>${fotoHTML}</div>
            <br>
            <button class="acc" onclick="updateStatus('${key}', 'verified')">✅ ACC JADI VERIFIED</button>
            <button class="tolak" onclick="hapusLaporan('${key}')">❌ TOLAK/HAPUS</button>
        `;
        listLaporan.appendChild(div);
    });
});

function updateStatus(key, statusBaru) {
    if (confirm('Yakin mau ACC laporan ini jadi VERIFIED?')) {
        db.ref('laporan/' + key).update({ status: statusBaru });
        alert('Berhasil di-ACC! Auto masuk web.');
    }
}

function hapusLaporan(key) {
    if (confirm('Yakin mau HAPUS laporan ini? Data hilang permanen.')) {
        db.ref('laporan/' + key).remove();
        alert('Laporan palsu berhasil dihapus.');
    }
  }
