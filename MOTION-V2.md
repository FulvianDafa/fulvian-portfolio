# Portfolio V2 — Motion & Interaction Polish

Implementasi lokal, 28 Oktober 2026. Tidak melakukan commit, push, atau deploy.

## Perubahan

- Reveal fade + gerakan vertikal 14 px, durasi 560 ms dengan easing halus. Stagger 65/130/195 ms diterapkan pada elemen pendukung hero, kartu fokus, proyek, pengalaman, keterampilan, dan kontak. Heading section dan research spotlight ikut menggunakan reveal.
- Headline `I build. I test.` tetap langsung terbaca. Bidang portrait tetap memakai visual yang sudah ada, dengan drift dekorasi 4,6 detik sekali, tanpa foto tambahan.
- Descriptor hero berputar melalui empat judul dari `focusAreas`, sehingga tidak membuat klaim atau positioning baru. Teks lengkap pertama langsung tersedia, ditahan 2,4 detik, lalu dihapus dan diketik ulang dengan timer rekursif `setTimeout`.
- Ruang descriptor dicadangkan menggunakan ukuran seluruh descriptor dalam grid bertumpuk. Panjang teks animasi tidak menentukan tinggi baris. Daftar statis tersedia untuk pembaca layar; perubahan per karakter tidak diumumkan melalui live region.
- Tombol pause/resume tersedia untuk typing. Timer berhenti ketika hero keluar viewport, tab tersembunyi, pengguna menjeda, atau reduced motion aktif.
- Navigasi aktif memakai warna lime dan underline yang bertransisi. Perhitungan posisi dijadwalkan melalui `requestAnimationFrame`; perubahan tinggi konten ikut diperhatikan, termasuk filter proyek dan tab riset. Contact tetap aktif di akhir halaman.
- Smooth scrolling tetap memakai perilaku CSS/native anchor, tanpa scroll hijacking. Menu mobile memakai transisi masuk/keluar yang singkat. Pemilihan section menunggu dialog melepaskan scroll lock, memperbarui hash, lalu memindahkan fokus dan scroll ke section tujuan. Penutupan biasa tetap memakai perilaku fokus bawaan Radix.
- Kartu proyek mendapat lift 3 px, border/shadow restrained, gerak diagram/thumbnail ringan, serta CTA dan focus state yang lebih jelas. Efek gerak hover dibatasi ke pointer presisi yang mendukung hover.
- Tab riset memakai transisi opacity singkat; tautan dan ikon CTA ikut dipoles.

## Pendekatan teknis dan aksesibilitas

Tidak ada dependency tambahan. `PortfolioMotion` menggunakan satu `IntersectionObserver` untuk reveal, dengan `MutationObserver` agar kartu hasil filter yang baru muncul juga terdaftar. Elemen yang sudah diperlihatkan dilepas dari observer dan tidak diulang setiap scroll. Elemen yang sudah di atas viewport tidak dianimasikan ulang saat halaman dibuka melalui deep link.

Konten HTML awal tetap terlihat tanpa JavaScript. Hanya elemen di bawah viewport yang disembunyikan sementara setelah enhancement aktif. Fokus keyboard langsung memperlihatkan elemen terkait. Efek menggunakan opacity/transform/translate, tanpa animasi ukuran layout atau listener scroll untuk parallax.

`prefers-reduced-motion` menonaktifkan animasi, transisi dan smooth scrolling, menampilkan descriptor lengkap yang statis, serta menyembunyikan caret dan kontrol typing. Perubahan preferensi saat halaman terbuka juga ditangani. Observer, timer, dan listener dibersihkan saat komponen dilepas.

## File yang diubah pada task ini

Baru:

- `components/portfolio/motion.tsx`
- `components/portfolio/typed-descriptor.tsx`
- `MOTION-V2.md`

Diperbarui:

- `app/page.tsx`
- `app/globals.css`
- `components/portfolio/header.tsx`
- `components/portfolio/hero.tsx`
- `components/portfolio/section-heading.tsx`
- `components/portfolio/focus.tsx`
- `components/portfolio/projects.tsx`
- `components/portfolio/research.tsx`
- `components/portfolio/experience.tsx`
- `components/portfolio/skills.tsx`
- `components/portfolio/contact.tsx`

Repository sudah memiliki perubahan V2 yang belum di-commit sebelum task ini. Daftar di atas hanya mencakup file yang disentuh untuk motion polish. Data pada `lib/portfolio/`, isi utama, dan metrik riset tidak diubah.

## Pengujian aktual

| Pemeriksaan | Hasil |
| --- | --- |
| `pnpm lint` | Selesai, exit 0 |
| `pnpm exec tsc --noEmit --incremental false` | Selesai, exit 0 |
| `pnpm build` | Selesai, exit 0; seluruh lima tahap build Vinext selesai |
| `git diff --check` | Exit 0; Git memberi peringatan normalisasi LF/CRLF |
| Preview `http://127.0.0.1:5173/` | HTTP 200; HTML memuat headline, descriptor awal, dan atribut reveal |
| Chrome desktop | Tampilan hero dan Work diperiksa; `Explore My Work` mencapai Work, indikator Work aktif terlihat |
| Filter proyek di Chrome | Research menampilkan satu proyek; dikembalikan ke All |
| Emulasi mobile iPhone 16, 393 × 853 | Hero dan Research diperiksa secara visual; menu terbuka, pemilihan Research menutup menu dan mencapai `#research` |
| Emulasi `prefers-reduced-motion: reduce` | Descriptor lengkap statis terlihat; caret dan tombol typing tidak ditampilkan; konten tetap terbaca |
| Console yang terlihat setelah interaksi | Tidak terlihat pesan error; ada pesan informasi React DevTools |

Server dev yang sudah aktif dipakai kembali. Percobaan menjalankan `pnpm dev` kedua ditolak Vinext karena server yang sama sudah berjalan; server milik sesi sebelumnya tidak dihentikan. Override reduced motion DevTools dikembalikan ke `No emulation` setelah pemeriksaan.

Build menampilkan peringatan Node tentang experimental glob, statistik waktu plugin, dan keterbatasan klasifikasi route Vinext (`/` ditandai unknown). Tidak ada error build.

## Dampak UX dan batas verifikasi

Gerak pendek dan konsisten memberi ritme saat membaca tanpa menunda headline utama. Navigasi aktif dan hover memberi umpan balik, sementara reduced motion mempertahankan akses langsung ke konten.

Pemeriksaan browser pada sesi ini memverifikasi tampilan fallback reduced motion dan interaksi navigasi/filter. Kelancaran loop typing, tombol pause/resume pada mode motion penuh, urutan waktu reveal, drift portrait, dan hover bergerak belum diverifikasi end-to-end secara langsung. Dukungan tanpa JavaScript ditinjau dari implementasi/HTML awal, bukan melalui sesi browser dengan JavaScript dimatikan.

Tidak terlihat overflow horizontal pada area desktop/mobile yang diperiksa. Belum dilakukan pengukuran `scrollWidth`, CLS, Lighthouse, profiling FPS/CPU, uji seluruh lebar layar, audit keyboard lengkap, pengujian pembaca layar, atau pengujian lintas browser. Tidak ada klaim PASS untuk pemeriksaan tersebut. Pengujian motion penuh pada perangkat dengan animasi aktif serta pengukuran CLS merupakan tindak lanjut yang paling relevan.
