# Portfolio V2: audit dan validasi

Tanggal pengerjaan: 28 Oktober 2026 (Asia/Jakarta).

## Audit sebelum perubahan

- Git awal bersih, pada baseline `5f6eaa1`. Tidak ada perubahan pengguna yang ditimpa.
- README.md, PANDUAN-EDIT.md, package.json, konfigurasi TypeScript/ESLint/Vite, script framework, layout, halaman, stylesheet, komponen Dialog/Tabs, dan aset publik diperiksa.
- Arsitektur existing: React 19 + TypeScript, Vinext App Router, Vite, Tailwind, Radix/Shadcn, Cloudflare Workers. Script dev/build memilih execution profile existing.
- Aset publik hanya favicon. Foto, screenshot, dan CV belum tersedia; URL LinkedIn tidak ditemukan dalam baseline. GitHub repository berasal dari brief.
- Metadata existing memakai `noindex, nofollow` dan tetap dipertahankan.

## Perubahan dan keputusan desain

Hero desktop memakai tiga area: introduction, slot portrait besar, dan professional focus. Tablet menggunakan dua kolom dengan focus di bawah; mobile vertikal dengan slot 210–230 px. Slot tanpa foto menggunakan bidang, garis, dan negative space CSS tanpa avatar atau wajah pengganti. Foto transparan dapat diaktifkan dari konfigurasi, memakai object-contain dan fallback ketika gagal dimuat.

Palet near-black, charcoal/green, lime, off-white, muted text, metadata monospace, dan border tipis dipertahankan. Empat domain kerja dijelaskan melalui bagian professional focus; skills dibagi menjadi empat kelompok. Experience memakai daftar editorial bernomor tanpa tanggal rekaan. Kontak memakai email existing dan GitHub source yang tersedia.

Empat proyek memakai kartu dengan diagram CSS konseptual berlabel, role, kategori, ringkasan, tag, dan tautan eksplorasi. Halaman khusus dipilih untuk studi kasus karena rute dinamis Vinext existing cukup menanganinya tanpa dependency baru. Detail mencakup overview, problem, role, approach, contributions, outcome, technology, serta limitations/current status. Data peran pribadi dipisahkan dari konteks teknologi tim, termasuk frontend Vue.js vs backend/admin Laravel pada Sapi Berkah Amanah.

Fitur existing yang dipertahankan: empat proyek dan disiplin filter, ringkasan penelitian, tab Method/Results/Limits, Anugrah Jaya sebagai subset eksperimen, pengalaman terverifikasi, skills, dua email, active navigation, skip link, menu mobile berbasis Radix Dialog, serta reduced motion. Dialog detail proyek digantikan halaman studi kasus. Data proyek, role description, dan konfigurasi profil kini terpisah dari UI. Tidak ada dependency aplikasi baru, commit, push, atau deployment publik.

## Inventaris file

Dimodifikasi:

- `app/page.tsx`: komposisi section, dengan client boundary di komponen interaktif.
- `app/globals.css`: token, style terkelompok, breakpoint, focus, dan reduced motion.
- `README.md`: cara menjalankan dan struktur V2.
- `PANDUAN-EDIT.md`: panduan konten, portrait, screenshot, CV, dan pemeriksaan.

Dibuat:

- `app/projects/[slug]/page.tsx`
- `app/not-found.tsx`
- `components/portfolio/header.tsx`
- `components/portfolio/hero.tsx`
- `components/portfolio/focus.tsx`
- `components/portfolio/projects.tsx`
- `components/portfolio/project-visual.tsx`
- `components/portfolio/research.tsx`
- `components/portfolio/experience.tsx`
- `components/portfolio/skills.tsx`
- `components/portfolio/contact.tsx`
- `components/portfolio/section-heading.tsx`
- `lib/portfolio/projects.ts`
- `lib/portfolio/profile.ts`
- `lib/portfolio/types.ts`
- `VALIDASI-V2.md`

## Pemeriksaan aktual

| Pemeriksaan | Hasil |
| --- | --- |
| `pnpm lint` | PASS, exit 0 pada versi akhir. Temuan awal anchor footer diselesaikan dengan Next Link. |
| `pnpm exec tsc --noEmit --incremental false` | PASS, exit 0. |
| `pnpm build` | PASS, exit 0 menggunakan script framework/Vinext existing dan build Cloudflare. |
| `pnpm start` | PASS, Wrangler lokal siap di `http://127.0.0.1:8787`; dihentikan setelah smoke check. |
| HTTP development | PASS: `/` dan empat rute proyek 200; dua rute tidak dikenal 404 dengan halaman khusus. Server development existing di port 5173 digunakan dan tidak dihentikan. |
| HTTP build produksi lokal | PASS: lima halaman 200 dan dua halaman tidak ditemukan 404. |
| Metadata dan struktur HTML | PASS pada lima halaman development dan produksi: noindex/nofollow, satu h1 per halaman, ID HTML unik. |
| Anchor dan aset | PASS: 81 anchor internal mengarah ke ID yang tersedia; tiga aset yang ditemukan pada HTML development dan 16 aset pada HTML produksi merespons sukses. Cakupan ini tidak mencakup semua chunk yang mungkin diminta setelah interaksi browser. |
| Tautan eksternal | HEAD GitHub source dan sapiberkahamanah.com merespons 200 saat diperiksa; tujuan redirect final diterima. Pengiriman email tidak diuji. |
| Integritas proyek | PASS: 46 field asli dari empat objek proyek identik dengan baseline Git. Judul riset diperjelas dan role riset ditambahkan sesuai brief. |
| Integritas narasi | PASS: teks JSX research dan experience identik setelah normalisasi whitespace; nomor section research disesuaikan. Metrik, definisi, dan batasan baseline dipertahankan. |
| Data filter | PASS perhitungan data: All 4, Delivery 3, Development 2, Quality 2, Research 1. Ini bukan pengujian klik/hydration browser. |
| Kondisi tanpa foto/screenshot | PASS pada HTML default: tidak ada elemen img atau request portrait/screenshot; komposisi CSS tetap dirender. Kualitas visual belum diverifikasi melalui browser. |
| Review aksesibilitas kode/HTML | Skip link, label landmark, native link/button, aria-pressed filter, status live count, focus-visible, dan reduced motion tersedia. Dialog/Tab memakai Radix existing. Ini bukan audit aksesibilitas lengkap. |
| `git diff --check` | PASS; Git memberi peringatan konversi LF ke CRLF sesuai pengaturan lokal. |

Build mencetak peringatan Node experimental glob, informasi waktu plugin, dan keterbatasan klasifikasi route statis Vinext (`/` ditandai Unknown). Build selesai; rute berfungsi pada smoke check produksi lokal.

## Batas verifikasi browser

Computer-use dicoba, tetapi menghentikan akses sebelum membuka situs lokal karena tidak dapat menentukan URL browser Chrome Windows dengan keyakinan yang cukup untuk pemeriksaan kebijakannya. Tidak ada tindakan browser berikutnya dilakukan.

Karena itu, pemeriksaan berikut **belum terverifikasi**: screenshot dan horizontal overflow pada 1440/1024/768/390/360 px, kualitas visual tanpa foto, klik filter, active navigation saat scroll, navigasi mobile dan focus trap, Tab/Escape/panah pada kontrol, hydration, console errors, reduced-motion aktual, serta rendering foto transparan ketika aset sudah tersedia. Implementasi responsif dan interaksi tersedia dalam kode; HTTP/static checks tidak menggantikan pengujian tersebut. Checklist manual ada di PANDUAN-EDIT.md.

## Konten/aset yang masih diperlukan

- Portrait asli milik Fulvian, idealnya transparan.
- Screenshot proyek asli yang boleh dibagikan beserta caption/alt.
- CV valid dan URL LinkedIn asli jika ingin ditampilkan.
- Status rilis akhir/dampak produksi LIMS jika ingin membuat klaim tambahan.
- Tanggal pengalaman dan bukti tambahan jika kelak akan dipublikasikan; saat ini tidak diada-adakan.

Cara mengaktifkan aset tersedia di [PANDUAN-EDIT.md](PANDUAN-EDIT.md). Konfigurasi utama ada di `lib/portfolio/profile.ts` dan `lib/portfolio/projects.ts`.
