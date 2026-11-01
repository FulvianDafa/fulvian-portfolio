# Panduan edit Portfolio V2

## 1. Identitas, hero, dan kontak

Edit `lib/portfolio/profile.ts` untuk nama, universitas, email, domain kerja, skills, dan tautan opsional. Teks pengantar utama berada di `components/portfolio/hero.tsx`; metadata ada di `app/layout.tsx`.

- `github` saat ini adalah URL repository yang diberikan dalam brief, dengan label GitHub / Source.
- `linkedIn` dan `cv` bernilai `null`. Komponen menampilkan tautan hanya setelah nilainya diisi.
- Untuk CV, simpan PDF asli misalnya di `public/documents/fulvian-cv.pdf`, lalu set `cv: "/documents/fulvian-cv.pdf"`. Buka file tersebut untuk memeriksa isi sebelum mengaktifkan tombol.
- Isi `linkedIn` dengan URL profil asli yang sudah dikonfirmasi.
- Email menggunakan `mailto:` dan membuka aplikasi email pengunjung. Tidak ada backend/form pengiriman.

Pertahankan robots `index: false, follow: false` sampai ada keputusan tersendiri untuk mengaktifkan indexing.

## 2. Menambahkan foto profil

1. Buat folder `public/images` jika belum ada.
2. Simpan foto milik sendiri sebagai `public/images/profile-portrait.png`. PNG/WebP dengan background transparan cocok untuk komposisi ini; tidak diperlukan gambar pengganti.
3. Di `lib/portfolio/profile.ts`, ubah konfigurasi menjadi:

```ts
portrait: {
  src: "/images/profile-portrait.png",
  alt: "Portrait of Fulvian",
  objectPosition: "center bottom",
  scale: 1,
},
```

4. Buka `/images/profile-portrait.png` langsung pada server lokal untuk memastikan path benar.
5. Periksa hero di desktop dan mobile. Foto memakai `object-fit: contain`, mengikuti tinggi slot, dan mempertahankan transparansi. `objectPosition` mengatur jangkar dalam slot; `scale` mengatur pembesaran dengan titik acuan tengah bawah. Mulai dari `scale: 1`; gunakan foto dengan ruang transparan berlebih yang sudah dirapikan bila perlu.

Slot desktop besar, tablet menyesuaikan dua kolom, dan mobile dibatasi 210–230 px agar halaman tanpa foto tetap proporsional. Tingginya diatur oleh `.portrait-stage` pada `app/globals.css`.

Selama `src: null`, tidak ada request gambar atau broken image. Jika URL yang dikonfigurasi gagal dimuat, elemen foto dihapus dan komposisi CSS tetap tampil. Kegagalan path tetap perlu diperbaiki karena browser akan mencatat request gagal.

## 3. Memperbarui proyek dan studi kasus

Edit satu objek di `lib/portfolio/projects.ts`. Kartu dan halaman detail memakai data yang sama.

| Field | Fungsi |
| --- | --- |
| `id`, `slug` | ID unik dan URL halaman; slug harus unik dan memakai huruf kecil/tanda hubung |
| `title`, `category`, `context` | Judul, kategori, dan konteks |
| `disciplines` | Filter: Delivery, Development, Quality, Research |
| `role`, `roleDescription` | Peran dan batas kontribusi pribadi vs tim |
| `team`, `website` | Opsional; isi hanya jika terkonfirmasi |
| `summary`, `problem`, `approach` | Ringkasan, kebutuhan, dan pendekatan |
| `contribution` | Daftar kontribusi pribadi |
| `outcome`, `status`, `note` | Hasil, status/batasan terkini, catatan opsional |
| `roadmap` | Fitur yang masih direncanakan, bukan hasil yang sudah dicapai |
| `tags` | Teknologi/topik proyek; bukan klaim kepemilikan semua bagian |
| `preview` | Screenshot asli opsional |

Hitungan filter dan navigasi Next study mengikuti array proyek. Daftar filter berada di file yang sama. Visual CSS empat proyek berada di `components/portfolio/project-visual.tsx`; tambahkan komposisi sendiri bila menambah proyek baru.

Jangan mengubah slug yang telah dibagikan tanpa mempertimbangkan tautan lama. URL yang tidak dikenal menampilkan halaman 404.

## 4. Menambahkan screenshot asli

Simpan misalnya `public/images/projects/lims-overview.png`. Tambahkan pada objek proyek:

```ts
preview: {
  src: "/images/projects/lims-overview.png",
  alt: "Deskripsi layar asli yang benar-benar ditampilkan",
  caption: "Konteks screenshot dan bagian pekerjaan yang ditunjukkan.",
},
```

Path pada `src` dimulai dari `/images/`, tanpa awalan `public/`. Komponen menampilkan preview yang sama pada kartu dan studi kasus dengan `object-fit: contain`; gambar tidak dipotong untuk memaksakan proporsi. Caption menjelaskan konteks. Gunakan screenshot yang boleh dibagikan, tanpa data sensitif. Buka URL aset langsung sebelum mengaktifkan konfigurasi.

Jika `preview` tidak diisi, diagram CSS yang sengaja diberi label CONCEPT DIAGRAM tetap tampil. Diagram tersebut tidak dimaksudkan sebagai screenshot aplikasi.

## 5. Pengalaman, skills, dan riset

- Pengalaman terverifikasi: `components/portfolio/experience.tsx`. Tanggal tidak ditampilkan karena belum ada tanggal yang tersedia di baseline.
- Empat kelompok skills: `lib/portfolio/profile.ts`.
- Tab Method, Results, Limits dan konteks Anugrah Jaya: `components/portfolio/research.tsx`.
- Outcome dan detail penelitian: objek riset di `lib/portfolio/projects.ts` dan bagian penjelasan metrik di `app/projects/[slug]/page.tsx`.

Angka baseline: bobot text 50%, locator 30%, position 20%; threshold 0.50; 104 attempts, 96 accepted recoveries (HSR 92.31%), termasuk 11 false positives (FPR 11.46% dari accepted recoveries). Mean 11.77 s, median 5.80 s, 23 SUT; validasi dua praktisi 92.50%. Anugrah Jaya adalah subset 13 skenario, 0% false positives, mean 2,644.8 ms. Ubah semua kemunculan terkait hanya berdasarkan bukti penelitian baru, dan tetap bedakan recovery dengan ketepatan elemen.

## 6. Mengubah desain dan memeriksa hasil

Token warna berada di awal `app/globals.css`; bagian CSS dikelompokkan berdasarkan komponen dan breakpoint. Konfigurasi React/TypeScript, Vinext, Cloudflare, dan dependency existing tetap digunakan.

Jalankan:

```sh
pnpm lint
pnpm exec tsc --noEmit --incremental false
pnpm build
pnpm dev
```

Periksa desktop 1440, laptop 1024, tablet 768, mobile 390 dan 360 px. Coba filter All/Delivery/Development/Quality/Research, setiap studi kasus dan tombol kembali, tab riset dengan panah keyboard, serta menu mobile dengan Tab dan Escape. Uji skip link, focus yang terlihat, reduced motion, tautan email, URL aset, console, dan horizontal overflow. Periksa ulang saat foto/screenshot ditambahkan.

Lihat `VALIDASI-V2.md` untuk pemeriksaan yang benar-benar telah dijalankan pada implementasi ini.
