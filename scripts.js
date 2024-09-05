// Event listener untuk form pendaftaran (register)
document.getElementById('daftar')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Ambil nilai dari form pendaftaran
    const namabaru = document.getElementById('namabaru').value;
    const passbaru = document.getElementById('passbaru').value;
    const repass = document.getElementById('repass').value;
    const emails = document.getElementById('emails').value;

    // Cek apakah password dan konfirmasi password cocok
    if (passbaru !== repass) {
        alert('Password dan konfirmasi password tidak cocok.');
        return;
    }

    // Simpan nama, email, dan password ke localStorage
    localStorage.setItem('nama', namabaru);
    localStorage.setItem('email', emails);
    localStorage.setItem('password', passbaru);

    alert('Pendaftaran berhasil! Silakan login.');

    // Redirect ke halaman login setelah berhasil daftar
    window.location.href = 'login.html';
});

// Event listener untuk form login
document.getElementById('login')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Ambil nilai dari form login
    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;

    // Ambil nama dan password yang tersimpan di localStorage
    const storedNama = localStorage.getItem('nama');
    const storedPassword = localStorage.getItem('password');

    // Cek apakah data login sesuai
    if (nama === storedNama && password === storedPassword) {
        alert('Login Berhasil!');
        // Redirect ke halaman setelah login (misal: dashboard)
        window.location.href = 'thanks.html';
    } else {
        alert('Nama atau Password salah.');
    }
});
