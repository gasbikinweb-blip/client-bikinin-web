// Structured data (JSON-LD) tanpa dangerouslySetInnerHTML.
// JSON dirender sebagai teks anak <script>; karakter "<" di-escape agar tidak bisa menutup tag script.
// Tidak diblokir CSP karena type="application/ld+json" bukan script yang dieksekusi.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json">{JSON.stringify(data).replace(/</g, '\\u003c')}</script>
  );
}
