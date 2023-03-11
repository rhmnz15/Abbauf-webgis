<?php

/**
 * ------------------------------------------
 * Map
 * ------------------------------------------
 * 
 * Peta akan diimplementasikan di file ini.
 */
?>

<?= $this->extend('template/default_template') ?>

<?= $this->section('content:map') ?>
<?= $this->include('webgis/components/map') ?>
<?= $this->endSection() ?>

<?= $this->section('javascript:footer') ?>
<script src="<?= base_url('webgis/js/ol.js') ?>"></script>
<script src="<?= base_url('webgis/js/map.js') ?>"></script>
<script src="<?= base_url('webgis/js/layerswitcher.js') ?>"></script>
<?= $this->endSection() ?>

<?= $this->section('style:header') ?>
<link rel="stylesheet" href="<?= base_url('webgis/css/style.css') ?>">
<link rel="stylesheet" href="<?= base_url('webgis/css/ol.css') ?>">
<link rel="stylesheet" href="<?= base_url('webgis/css/map.css') ?>">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
<?= $this->endSection() ?>