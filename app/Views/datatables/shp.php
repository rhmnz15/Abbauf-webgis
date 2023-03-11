<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coba Datatables</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?= base_url('plugins/datatables/css/datatables.min.css') ?>">
</head>

<body>
    <div class="container" style=" padding: 50px 0;">
        <table id="pois" class="table table-striped" style="width:100%;">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Table Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <script src="<?= base_url('plugins/datatables/js/jquery-3.5.1.js') ?>"></script>
    <script src="<?= base_url('plugins/datatables/js/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?= base_url('plugins/datatables/js/pdfmake.min.js') ?>"></script>
    <script src="<?= base_url('plugins/datatables/js/vfs_fonts.js') ?>"></script>
    <script src="<?= base_url('plugins/datatables/js/datatables.min.js') ?>"></script>
    <script>
        $(document).ready(function() {
            $('#pois').DataTable({
                'processing': true,
                'serverSide': true,
                'serverMethod': 'post',
                'ajax': "<?= base_url('api/shps/ajax') ?>",
                'columns': [{
                    "data": 'user_id'
                }, {
                    "data": 'name'
                }, {
                    "data": 'type'
                }, {
                    "data": 'table_name'
                }, {
                    "data": 'status'
                }]
            });
        });
    </script>

</body>

</html>