# Panduan edit portfolio

## 1. Mengubah nama dan deskripsi

Buka `app/page.tsx`. Cari `Hi, I’m`, `hero-description`, atau nama lengkap untuk menemukan bagian perkenalan. Ubah teks di antara tag JSX, lalu simpan file.

Untuk judul pada tab browser dan deskripsi metadata, buka `app/layout.tsx` dan ubah `title` serta `description`.

## 2. Mengubah atau menambah proyek

Di bagian atas `app/page.tsx`, cari:

```tsx
const projects: Project[] = [
```

Setiap objek merupakan satu proyek. Field utama:

| Field | Fungsi |
| --- | --- |
| `id` | Nomor unik proyek, misalnya `"05"` |
| `title` | Nama proyek |
| `category` | Label jenis pekerjaan yang tampil pada kartu |
| `disciplines` | Satu atau lebih kategori filter: `Delivery`, `Development`, `Quality`, atau `Research` |
| `context` | Konteks singkat yang tampil di bagian atas kartu |
| `role` | Peran kamu dalam proyek, jika relevan |
| `team` | Ukuran tim yang telah dikonfirmasi, jika relevan |
| `website` | URL publik proyek, jika tersedia |
| `roadmap` | Fitur yang masih direncanakan, jika relevan |
| `summary` | Deskripsi singkat di kartu |
| `tags` | Daftar teknologi atau topik |
| `problem` | Masalah yang diselesaikan |
| `contribution` | Daftar pekerjaan yang kamu lakukan |
| `outcome` | Hasil yang dapat dipertanggungjawabkan |
| `note` | Konteks atau batasan hasil |

Contoh pola untuk menambahkan proyek:

```tsx
{
  id: "05",
  title: "Nama proyekmu",
  category: "Web development",
  disciplines: ["Development"],
  context: "Client project",
  role: "Frontend Developer",
  summary: "Ringkasan singkat proyekmu.",
  tags: ["Teknologi yang digunakan"],
  problem: "Masalah yang ingin diselesaikan.",
  contribution: ["Pekerjaan yang kamu lakukan."],
  outcome: "Hasil atau progres yang sudah ada.",
  note: "Konteks yang relevan."
},
```

Hitungan proyek pada filter diperbarui otomatis. Jika menambah disiplin baru, tambahkan namanya juga ke daftar `filters` di bagian atas file. Hanya isi peran, ukuran tim, website, dan roadmap jika informasinya sudah terkonfirmasi.

## 3. Mengubah warna dan layout

Buka `app/globals.css`. Warna utama berada pada `:root`:

```css
--background: #101210;
--foreground: #f1f3ec;
--primary: #c7f36b;
```

Beberapa aksen memakai warna langsung pada selector. Cari kode warna lama untuk mengganti aksen tersebut secara konsisten. Selector seperti `.hero`, `.project-grid`, `.project-card`, dan `.contact-layout` mengatur bagian halaman. Blok `@media` di bawah mengatur ukuran tablet dan mobile.

## 4. Mengubah skills, pengalaman, dan penelitian

Semua berada di `app/page.tsx`. Cari `id="skills"`, `id="experience"`, atau `id="research"`.

Angka penelitian muncul di beberapa tempat: hero, detail proyek, konteks Anugrah Jaya, dan tab Results. Jika hasil penelitian diperbarui, sesuaikan semua kemunculan agar konsisten. Jangan menyamakan Healing Success Rate dengan ketepatan kandidat; versi ini mencatat false positive secara terpisah.

## 5. Mengubah kontak

Cari email di `app/page.tsx`. Ubah **teks yang tampil dan nilai `mailto:`** pada tautan yang sama, misalnya:

```tsx
<a href="mailto:alamat@example.com">...</a>
```

Alamat di atas hanya contoh; gunakan alamatmu sendiri. Situs tidak memiliki form pengiriman pesan. Tautan email membuka aplikasi email milik pengunjung.

## 6. Menambahkan foto

Simpan foto di `public/`, misalnya `public/foto-profil.jpg`, kemudian tempatkan elemen gambar pada posisi yang diinginkan di `app/page.tsx`:

```tsx
<img src="/foto-profil.jpg" alt="Foto Fulvian" width="400" height="400" />
```

Gunakan ukuran/aspect ratio yang sesuai, dan tambahkan aturan CSS agar gambar tidak melebar di mobile, misalnya `max-width: 100%; height: auto;`.

## 7. Mengecek sebelum menyimpan versi final

- Buka situs lokal di browser dan coba setiap filter serta detail proyek.
- Periksa tab Method, Results, dan Limits.
- Coba menu mobile dan pastikan halaman tidak perlu digeser horizontal.
- Periksa email serta teks agar sesuai informasi terbaru.
- Jalankan `pnpm build` setelah perubahan.

Simpan cadangan proyek atau gunakan Git untuk melacak perubahan. Membuat ZIP baru dari folder sumber bisa menjadi cadangan sederhana; tidak perlu memasukkan `node_modules`, `dist`, atau cache.
