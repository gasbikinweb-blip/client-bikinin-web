// Dijalankan sebelum halaman tampil agar tidak "berkedip" saat memuat tema.
// Default tema adalah 'light' (Warm Architectural Cream & Champagne Gold).
// File eksternal (bukan inline) supaya aman untuk CSP script-src 'self'.
(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
