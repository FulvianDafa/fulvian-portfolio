# Fulvian — Portfolio V2

Personal editorial portfolio Mochammad Fulvian Dafa Pranaja: software engineering, analysis, quality, dan delivery. Dibangun di repository existing menggunakan React, TypeScript, Tailwind, komponen Radix/Shadcn, serta Vinext/Cloudflare.

## Menjalankan lokal

Gunakan Node.js **22.13.0 atau lebih baru** dan pnpm **11.25.0**.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Buka `http://localhost:5173` atau URL yang dicetak terminal. Jika Vinext mendeteksi server proyek yang sudah berjalan, gunakan URL server tersebut. Portfolio ini tidak memerlukan database atau API key.

```sh
pnpm lint
pnpm exec tsc --noEmit --incremental false
pnpm build
pnpm start
```

`pnpm build` memakai script framework existing dan menghasilkan build Cloudflare Workers di `dist/`. `pnpm start` menjalankan build melalui Wrangler lokal; buka URL yang dicetak terminal. `dist/` bukan ekspor HTML statis biasa. Script `install:ci` merupakan helper lingkungan build asal.

## Struktur konten dan komponen

| Lokasi | Tanggung jawab |
| --- | --- |
| `app/page.tsx` | Komposisi beranda |
| `components/portfolio/` | Header, hero, professional focus, work/filter, riset, pengalaman, skills, kontak, visual proyek, dan heading bersama |
| `lib/portfolio/projects.ts` | Empat proyek, slug, peran, kontribusi, pendekatan, hasil, status, teknologi, dan preview opsional |
| `lib/portfolio/profile.ts` | Identitas, kontak, foto/CV/LinkedIn opsional, domain kerja, dan skills |
| `lib/portfolio/types.ts` | Tipe data proyek |
| `app/projects/[slug]/page.tsx` | Halaman studi kasus berbasis data proyek |
| `app/not-found.tsx` | Halaman 404 |
| `app/globals.css` | Token desain, layout per bagian, breakpoint, focus, dan reduced motion |
| `app/layout.tsx` | Metadata, bahasa, favicon, dan robots noindex/nofollow existing |

Empat studi kasus tersedia di `/projects/lims`, `/projects/sapi-berkah-amanah`, `/projects/digital-archive`, dan `/projects/self-healing-selenium`. Detail menggunakan halaman khusus agar dapat ditautkan, dibuka kembali, dan dibaca tanpa batas tinggi dialog. Radix Dialog tetap dipakai untuk navigasi mobile; Radix Tabs untuk riset.

## Aset dan integritas konten

Foto belum tersedia. Hero memakai komposisi geometris CSS tanpa gambar pengganti. Simpan foto asli ke `public/images/profile-portrait.png`, lalu isi `profile.portrait.src` dengan `/images/profile-portrait.png`. Lihat [PANDUAN-EDIT.md](PANDUAN-EDIT.md) untuk pengaturan posisi, skala, screenshot, dan kontak.

Visual proyek saat ini adalah diagram CSS berlabel **CONCEPT DIAGRAM**, bukan screenshot produk. URL LinkedIn dan CV tetap kosong sampai data/aset valid tersedia. GitHub mengarah ke repository yang diberikan dalam brief. Angka riset, pengalaman, dan kontribusi bersumber dari konten repository sebelum redesign.

Konfigurasi framework, dependency aplikasi, Cloudflare, dan privacy/indexing dipertahankan. Implementasi ini tidak menjalankan commit, push, atau deployment publik.

Catatan audit, keputusan desain, serta hasil verifikasi aktual ada di [VALIDASI-V2.md](VALIDASI-V2.md).
