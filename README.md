# Portfolio Fulvian

Kode sumber portfolio Mochammad Fulvian Dafa Pranaja. Situs ini memuat filter proyek, dialog detail, tab penelitian, bagian skills, pengalaman, dan kontak.

## Mulai di komputer sendiri

1. Ekstrak ZIP ini.
2. Buka folder `fulvian-portfolio` di VS Code.
3. Pastikan Node.js minimal **22.13.0** sudah terpasang.
4. Buka terminal VS Code. Pasang pnpm jika belum tersedia:

```sh
npm install -g pnpm@11.25.0
```

5. Jalankan dari folder proyek:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Buka alamat yang muncul di terminal; konfigurasi pengembangan menggunakan `http://localhost:5173`. Saat file disimpan, halaman akan diperbarui selama server pengembangan masih berjalan. Tekan `Ctrl+C` di terminal untuk menghentikannya.

Tidak perlu database atau API key untuk fitur portfolio yang sekarang.

## File yang paling sering diedit

| File | Isi |
| --- | --- |
| `app/page.tsx` | Teks, data proyek, penelitian, skills, pengalaman, kontak, serta interaksi halaman |
| `app/globals.css` | Warna, ukuran teks, jarak, layout, animasi, dan tampilan mobile |
| `app/layout.tsx` | Judul tab browser, deskripsi situs, bahasa halaman, dan metadata |
| `public/favicon.svg` | Ikon pada tab browser |
| `public/` | Tempat menambahkan foto dan aset lain |

Lihat **PANDUAN-EDIT.md** untuk contoh perubahan.

## Memeriksa hasil perubahan

```sh
pnpm build
pnpm start
```

`pnpm build` membuat hasil di `dist/`. `pnpm start` menjalankan hasil tersebut secara lokal; gunakan alamat yang dicetak di terminal.

Pemeriksaan TypeScript tambahan:

```sh
pnpm exec tsc --noEmit
```

## Teknologi

React, TypeScript, Tailwind CSS, komponen Radix/Shadcn, dan Vinext dengan struktur App Router bergaya Next.js. Build produksi ditujukan untuk Cloudflare Workers; folder `dist/` bukan ekspor HTML statis biasa.

`pnpm-lock.yaml` disertakan supaya versi dependency dapat dipasang secara konsisten. Gunakan alur pnpm di atas. Script `install:ci` merupakan helper lingkungan build asal, bukan langkah instalasi lokal yang diperlukan.

## Deployment

Proyek ini dapat dideploy ke Cloudflare Workers, Vercel, atau platform hosting modern lainnya.

Untuk build produksi:
```sh
pnpm build
```
