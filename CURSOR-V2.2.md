# Portfolio V2.2 — Custom Interactive Cursor

Tanggal: 28 Oktober 2026 (Asia/Jakarta).

## Implementasi

- Komponen reusable `components/portfolio/custom-cursor.tsx`, dipasang sekali di `app/layout.tsx` untuk homepage dan studi kasus.
- Dot 7px, ring 30px, warna lime `#c7f36b`. Posisi dot langsung mengikuti pointer; ring memakai easing berbasis waktu melalui `requestAnimationFrame`, yang berhenti setelah mencapai posisi tujuan.
- Hover link/button memperbesar ring menjadi 45px. Tautan judul dan Explore Project memakai ring 60px berlabel `VIEW ↗`. Bagian kartu yang tidak bisa diklik tetap mengikuti perilaku default atau native untuk teks.
- Perubahan visual 150–200ms, seluruh gerakan posisi memakai transform. Tidak ada state React per gerakan mouse, dependency baru, particle, trail panjang, atau perpindahan posisi tombol akibat cursor.
- Seluruh layer `pointer-events: none`, `aria-hidden`, dan tidak bisa diseleksi. Overlay fixed dengan containment dan clipping, sehingga tidak ikut mengubah layout atau memperluas halaman.
- Konten, headline “I build. I test.”, research metrics, focus indicator, layout, dan design system existing dipertahankan.

## Fallback dan lifecycle

- JS dan CSS sama-sama mensyaratkan `(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`; input touch/pen tidak mengaktifkan cursor.
- Native tetap tersedia sampai event mouse pertama menyiapkan posisi kedua layer. CSS menyembunyikan native hanya ketika komponen yang masih terpasang memiliki `data-visible="true"` dalam media query yang sesuai.
- Input, textarea, select, contenteditable, role textbox, teks noninteraktif, seleksi aktif, serta media/canvas/iframe memakai native. Native juga dipulihkan saat keyboard digunakan, pointer keluar, drag, tab tersembunyi, window blur, resize, atau pagehide.
- Perubahan media query langsung menghentikan animasi dan listener aktif. Cleanup memakai AbortController, cancelAnimationFrame, dan removeEventListener untuk media query. Error atau unhandled rejection mematikan enhancement dan memulihkan native sampai komponen dipasang kembali.
- Untuk integrasi berikutnya: `data-cursor="view"` pada link/button yang benar-benar interaktif; `data-cursor="native"` pada area yang harus selalu memakai native; `data-cursor="text"` pada blok teks khusus.

## Validasi aktual

| Pemeriksaan | Hasil |
| --- | --- |
| `pnpm lint` | Lulus, exit 0. |
| `pnpm exec tsc --noEmit --incremental false` | Lulus, exit 0. |
| `pnpm build` | Lulus, exit 0 melalui script framework existing. |
| `git diff --check` | Lulus; Git menampilkan pemberitahuan normalisasi LF/CRLF existing. |
| HTTP development `/` | 200, markup CustomCursor tersedia. |
| Browser Chrome lokal | Halaman portfolio berhasil dimuat; kontrol dan konten tampil dalam accessibility tree/screenshot. Ini bukan verifikasi perilaku cursor. |

Build masih mencetak peringatan experimental glob Node, informasi waktu plugin, dan keterbatasan klasifikasi route statis Vinext. Build selesai sukses.

Pengujian interaksi Chrome terhalang deteksi input pengguna. Saat mencoba browser Edge terpisah, Computer Use dihentikan pengguna dengan tombol Escape; tidak ada interaksi browser berikutnya dilakukan.

**Belum terverifikasi secara aktual di browser:** gerakan/easing cursor, pembesaran hover dan VIEW, klik/navigasi setelah perubahan, scroll, text selection/input, keyboard focus, touch/mobile, reduced motion dan perubahan preferensi live, pemulihan saat error/unmount, horizontal overflow, layout shift, serta console errors. Dukungan tersedia dalam implementasi, tetapi pemeriksaan kode/build tidak menggantikan uji browser.

## Checklist manual lanjutan

1. Desktop dengan mouse dan reduced motion nonaktif: gerakkan pointer pada ruang kosong; periksa dot responsif dan ring dengan lag ringan tanpa trail.
2. Hover navigasi, CTA, dan filter; hover kedua link pada kartu untuk `VIEW ↗`. Klik dan pastikan aksi berjalan seperti sebelumnya.
3. Scroll saat pointer diam untuk memastikan mode mengikuti elemen di bawahnya; pindah ke scrollbar dan keluar window.
4. Seleksi headline, paragraf, tags, dan metrik; pastikan native tersedia. Untuk pengujian komponen pada halaman berform, uji input, textarea, dan contenteditable.
5. Gunakan Tab/Shift+Tab/Enter: native kembali dan focus indicator tetap terlihat.
6. Emulasikan touch/mobile serta reduced motion; periksa custom cursor tidak tampil. Ubah preferensi saat halaman terbuka dan periksa fallback langsung.
7. Periksa console, overflow horizontal pada desktop/mobile, layout shift, dan pemulihan native saat komponen dilepas/error.

Tidak ada commit, push, atau deployment. Perubahan V2/V2.1 yang sudah ada sebelum pekerjaan ini dipertahankan.

## Pemeriksaan lanjutan — 1 November 2026

Pengguna melaporkan cursor belum berubah. Server `http://127.0.0.1:5173/` dipastikan menyajikan komponen terbaru. Server development dimulai ulang pada alamat yang sama setelah cache Vite lama dipindahkan ke `work/node_modules/vite-cache-before-cursor-recheck-20261101/`.

Ditambahkan `data-status` pada layer cursor (`pending`, `ready`, `reduced-motion`, `unsupported-pointer`, `error`, atau `inactive`) dan pesan Console khusus development. Ini membantu membedakan komponen yang belum aktif dengan fallback yang disengaja, tanpa menambah UI pada portfolio. Pesan diagnostik tidak masuk bundle produksi.

**Penyebab cursor native terkonfirmasi oleh Console pengguna:**

```text
[CustomCursor] Native cursor: prefers-reduced-motion is active. The custom cursor is intentionally disabled to respect your animation preference.
```

Pembacaan preferensi Windows juga berhasil dan menunjukkan client-area animations nonaktif. Tidak ada perubahan preferensi Windows/browser yang dilakukan. Fallback reduced motion dipertahankan sesuai brief; untuk preview dengan animasi, pengguna dapat memilih `prefers-reduced-motion: no-preference` melalui DevTools Rendering. Ini petunjuk pengujian manual, bukan override yang dipasang dalam aplikasi.

Pemeriksaan modul ESM dan decoding Flight melalui Node berhasil; ini bukan pengujian DOM, React effects, atau klik browser. Pesan Console pengguna membuktikan efek komponen cursor telah berjalan dan memilih fallback reduced motion. Laporan bahwa filter tidak merespons belum direproduksi secara independen; tidak diklaim sudah diperbaiki oleh restart.

Akses UI otomatis pada pemeriksaan ini dihentikan alat karena URL browser Windows tidak dapat dipastikan. Hover, klik, text selection, dan mode no-preference belum diuji melalui UI otomatis. Tidak ada commit, push, atau deployment.
