# Contribution Guideline

Sebelum melakukan merge pada branch ini pastikan anda sudah memenuhi guideline yang sudah ditentukan pada file ini.

<span style="color:red">LAKUKAN _PULL REQUEST (PERMINTAAN TARIK)_ TERLEBIH DAHULU SEBELUM MERGE</span>.

## Frontend Guideline

---

Apabila akan melakukan perubahan diharap untuk membuat branch terlebih dahulu sesuai dengan fitur yang akan dibuat dan ditambahkan tulisan `frontend` di depan.

Contoh, apabila ingin membuat fitur `map` maka kamu membuat branch `frontend-map`. Jika ingin mengembangkan fitur lain, maka buat branch sesuai dengan nama fitur tersebut.

<details>
<summary>Bagaimana cara membuat branch baru?</summary>

Jika belum melakukan clone repository,

```sh
git clone https://git.abbauf.com/MSIB/Webgis-intelligence.git
cd Webgis-intelligence
composer update
```

Untuk membuat branch baru, pertama pilih terlebih dahulu branch yang akan menjadi base (awalan), sebagai contoh saya memilih branch `frontend` untuk menjadi branch base saya maka,

```sh
# Pull terlebih dahulu sebelum membuat branch
git pull

# Lalu switch ke branch tersebut
git switch frontend

# Disini untuk memastikan bahwa kode sudah di pull maka kalian boleh melakukan pull sekali lagi
git pull

# Setelah itu buat branch baru
git checkout -b <NAMA_BRANCH>
```

Setelah selesai melakukan edit pada branch tersebut dan sudah di commit, silahkan dipush lagi menuju remote repository.

```sh
git push origin <NAMA_BRANCH>
```

---

</details>

### Table of Contents

1. [Cont roller](#controller)
2. [Route](#route)
3. [View](#view)
4. [Public assets folder](#public-assets-folder)
5. [FAQ (Q&A)](#faq)

### Controller

---

Controller pada frontend berada pada folder [`app/Controllers/web`](./app/Controllers/web/) yang menggunakan namespace `App\Controllers\web`. Pastikan semua `Controller` yang akan digunakan berada pada folder tersebut.

- Membuat Controller baru

  1. Jika ingin membuat Controller baru, kamu bisa membuat file baru di dalam folder [`app/Controllers/web`](./app/Controllers/web/) menggunakan nama sesuai dengan kegunaan.

     > Contoh: Apabila ingin membuat Controller Webgis (yaitu halaman map), maka buat file baru bernama **`Webgis.php`** pada folder [`app/Controllers/web`](./app/Controllers/web/)

  2. Kemudian, ganti namespace menggunakan template berikut.

     ```php
     namespace App\Controllers\web;

     class Home extends \App\Controllers\BaseController
     {
         // Methods
     }
     ```

     Namespace harus diganti menjadi `App\Controllers\web` karena file berada pada folder tersebut sehingga Codeigniter bisa mencari file tersebut berdasarkan namespace.

     Karena `BaseController` berada di folder [`app/Controllers`](./app/Controllers/), maka untuk mengimport file tersebut harus menggunakan full namespace yaitu [`App\Controllers\BaseController`](./app/Controllers/BaseController.php).

### Route

---

**Routes** pada **CodeIgniter** berada pada file [app/Config/Routes.php](app/Config/Routes.php). Semua routes didefinisikan pada file tersebut.

Untuk kemudahan dalam menggunakan, maka setiap route frontend dan juga backend akan dibuatkan masing-masing **Route group**, yang mana **Route group** tersebut diberikan parameter namespace yang sesuai dengan folder **Controller** masing-masing.

- Menambahkan Route baru

  Route baru bisa ditambahkan dengan mengedit file [app/Config/Routes.php](app/Config/Routes.php) pada bagian routes frontend.

  ```php
  /*
  * --------------------------------------------------------------------
  * Frontend Routes goes here
  * --------------------------------------------------------------------
  *
  * Pastikan kamu menambahkan di dalam group namespace yang telah diberikan.
  */
  $routes->group('', ['namespace' => 'App\Controllers\web'], function ($routes) {
      // Tambahkan route disini.
      // Contoh:
      $routes->get('route-baru', 'NamaController::method');
  });
  ```

### View

---

View merupakan kumpulan dari file frontend berupa `html` yang akan dirender pada client.

- Menambah file view baru

  Buat folder pada [app/Views](app/Views/) terlebih dahulu untuk mengkategorikan sesuai dengan halaman yang akan dibuat. Lalu tambahkan file `.php` di dalam folder tersebut dan isikan dengan `html`.

  View akan muncul apabila sudah dirender melalui Controller method.

  ```php
  // Contoh:
  public function index()
  {
      return view('dashboard/index');
  }
  ```

- [Optional] Menggunakan component untuk menseparasikan sebagian dari view

  Jika pada file view utama (yang dirender pada controller) ternyata memuat begitu banyak line, maka ada baiknya dipisah menggunakan component.

  Aturan untuk membuat component adalah dengan membuat folder bernama `components` pada folder kategori yang telah dibuat di step sebelumnya. Lalu, tambahkan file component pada folder tersebut menggunakan extension `.php`. (Nama yang digunakan sesuaikan dengan bagian komponen).

  Pada file utama, include component tersebut dengan memanggil

  ```php
  <?= view("url/to/component/relative/to/Views") ?>
  ```

  > _Untuk lebih lengkapnya bisa baca pada url berikut [CI4 View Layouts](https://codeigniter4.github.io/CodeIgniter4/outgoing/view_layouts.html)._

### Using assets

---

File assets yaitu berupa style, gambar, icon, dll akan disimpan pada folder [public](./public/).

Untuk menambahkan asset baru, kamu bisa membuat terlebih dahulu folder kategori untuk memudahkan membedakan (usahakan sama dengan folder yang ada di **Views**). Taruh semua asset yang akan digunakan pada folder tersebut.

- Import assets (css, js, image) ke dalam file view

  - CSS (Stylesheet)

    Ada 2 cara untuk melakukan import css ke dalam file view (_file view berupa .php pada folder [Views](./app/Views/)_).

    1. Jika kamu menginginkan css yang akan kamu import accessible untuk semua route (global), maka kamu dapat mengimport cssmu ke dalam file [app/Views/template/css.php](./app/Views/template/css.php).

       ```html
       // file: app/Views/template/css.php // Contoh: // Kamu ingin mengimport
       bootstrap yang mana akan accessible untuk semua route, maka, etc...

       <link
         href="<?php echo base_url(); ?>/my-vendor/bootstrap-select/dist/css/bootstrap-select.min.css"
         rel="stylesheet"
       />

       etc...
       ```

       > <span style="color: red;">**Jika kamu mengimport untuk _global_ seperti contoh di atas, maka konsekuensinya _semua route juga akan mengimport style tersebut_, yang dapat menyebabkan kendala kecepatan dan lain-lain, jadi mohon bijak untuk melakukannya.**</span>

    2. Bagaimana jika ingin mengimport css hanya pada route tertentu (tidak di semua url route), maka kamu bisa melakukannya dengan menggunakan section layout pada Codeigniter. Cara untuk menggunakannya cukup simpel.

    ```php
    // File: app\Views\webgis\index.php
    // Pada file ini terdapat contoh untuk mengimport css hanya pada route tertentu.
    etc...

    <?= $this->section('style:header') ?>
        <link rel="stylesheet" href="<?= base_url('webgis/css/style.css') ?>">
        <link rel="stylesheet" href="<?= base_url('webgis/css/ol.css') ?>">
        <link rel="stylesheet" href="<?= base_url('webgis/css/map.css') ?>">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <?= $this->endSection() ?>

    etc...
    ```

    Bisa dilihat pada contoh di atas, untuk menggunakan section, kalian bisa memanggil kode di bawah sebelum konten link css dimasukkan.

    ```php
    <?= $this->section('style:header') ?>
    // Nama "style:header" adalah nama yang digunakan untuk mengimport style di dalam header atau <head> element.
    ```

    Setelah itu masukkan semua link css yang akan diimport.

    ```php
    <link rel="stylesheet" href="<?= base_url('webgis/css/style.css') ?>">
    <link rel="stylesheet" href="<?= base_url('webgis/css/ol.css') ?>">
    <link rel="stylesheet" href="<?= base_url('webgis/css/map.css') ?>">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    ```

    Lalu, tutup section dengan menggunakan fungsi berikut,

    ```php
    <?= $this->endSection() ?>
    ```

  - Javascript (JS)

    Ada 2 cara juga untuk melakukan import file js ke dalam file view (_file view berupa .php pada folder [Views](./app/Views/)_).

    1. Jika kamu menginginkan js yang akan kamu import accessible untuk semua route (global), maka kamu dapat mengimport jsmu ke dalam file [app/Views/template/js.php](./app/Views/template/js.php).

       ```html
       // file: app/Views/template/js.php // Contoh: // Kamu ingin mengimport
       bootstrap yang mana akan accessible untuk semua route, maka, etc...

       <script src="<?php echo base_url(); ?>/my-vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>

       etc...
       ```

       > <span style="color: red;">**Jika kamu mengimport untuk _global_ seperti contoh di atas, maka konsekuensinya _semua route juga akan mengimport style tersebut_, yang dapat menyebabkan kendala kecepatan dan lain-lain, jadi mohon bijak untuk melakukannya.**</span>

    2. Sama halnya dengan CSS, jika ingin mengimport JS ke dalam route tertentu, maka kamu bisa menggunakan section dengan nama _`javascript:header`_ atau _`javascript:footer`_.

       ```php
       // File: app\Views\webgis\index.php
       // Pada file ini terdapat contoh untuk mengimport css hanya pada route tertentu.
       etc...

       <?= $this->section('javascript:footer') ?>
       <script src="<?= base_url('webgis/js/ol.js') ?>"></script>
       <script src="<?= base_url('webgis/js/map.js') ?>"></script>
       <script src="<?= base_url('webgis/js/layerswitcher.js') ?>"></script>
       <?= $this->endSection() ?>

       etc...
       ```

       Contoh di atas menggunakan section `javascript:footer` yang mana semua tulisan yang ada di dalam section tersebut akan berada pada footer (bawah \<body\> tag).

# FAQ

<details>
<summary>Bagaimana cara membuat branch baru?</summary>

Jika belum melakukan clone repository,

```sh
git clone https://git.abbauf.com/MSIB/Webgis-intelligence.git
cd Webgis-intelligence
composer update
```

Untuk membuat branch baru, pertama pilih terlebih dahulu branch yang akan menjadi base (awalan), sebagai contoh saya memilih branch `frontend` untuk menjadi branch base saya maka,

```sh
# Pull terlebih dahulu sebelum membuat branch
git pull

# Lalu switch ke branch tersebut
git switch frontend

# Disini untuk memastikan bahwa kode sudah di pull maka kalian boleh melakukan pull sekali lagi
git pull

# Setelah itu buat branch baru
git checkout -b <NAMA_BRANCH>
```

Setelah selesai melakukan edit pada branch tersebut dan sudah di commit, silahkan dipush lagi menuju remote repository.

```sh
git push origin <NAMA_BRANCH>
```

---

</details>

<details>

<summary>
Apakah saya harus membuat branch baru terus menerus jika ingin membuat fitur baru?
</summary>
    Ya, kamu harus membuat branch baru, dengan alasan supaya mempermudah untuk melakukan merge ke dalam branch utama. Namun, jika sudah dimerge sebenarnya branch yang kamu buat disarankan untuk dihapus supaya tidak menumpuk.
</details>
