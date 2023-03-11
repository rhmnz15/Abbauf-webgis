<?= $this->extend("layout/template") ?>
<?= $this->section("content"); ?>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <a class="btn btn-primary pull-right mr-1" href="/pegawai/create"><i class="fa fa-pencil"></i> &nbsp;Tambah Pegawai</a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header card-header-primary">
                    <h4 class="card-title ">Table Pegawai</h4>
                    <p class="card-category"> List Data Pegawai</p>
                </div> 
                <div class="card-body">
                    <?php if (session()->getFlashdata('msg')) : ?>
                        <div class="alert alert-success">
                            <?php echo session()->getFlashdata('msg') ?>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    <?php endif; ?>
                    <div class="table-responsive">
                        <table class="table table-striped" id="tablePegawai">
                            <thead class="text-primary">
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Nama
                                    </th>
                                    <th>
                                        No.Telp
                                    </th>
                                    <th>
                                        Alamat
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->endSection(); ?>

<?= $this->section("script"); ?>
<script src="assets/js/plugins/jquery.dataTables.min.js"></script>
<script>
    $(function() {
        const url = `http://${window.location.host}`;
        let html = "";

        const tblpegawai = $('#tablePegawai').DataTable( {
            responsive: true,
            processing: true,
            serverSide: true,
            order: [],
            ajax: {
                url: `${url}/pegawai/list`,
                type: "GET"
            },
            language: {
                searchPanes: {
                    emptyPanes: 'There are no panes to display. :/'
                }
            }
        });
    });
</script>
<?= $this->endSection(); ?>