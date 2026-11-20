// Dijalankan sebelum halaman tampil agar tidak "berkedip" saat memakai mode gelap.
// File eksternal (bukan inline) supaya aman untuk CSP script-src 'self'.
(function () {
  try {
    var t = localStorage.getItem('akaa-theme');
    if (t !== 'light' && t !== 'dark') {
      t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch {
    // localStorage diblokir: pakai tema terang
  }
})();
