<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coba Datatables</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?= base_url('plugins/datatables/css/datatables.min.css') ?>">
</h>
<body>
    <div class="container">
        <table id="coba" class="table table-striped" style="width:100%">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Profile Picture</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registration_date</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>

                <?php foreach ($dataUser as $index => $row) : ?>
                    <tr>
                        <td><?= ++$index ?></td>
                        <td><?= $row->profile_picture?></td>
                        <td><?= $row->name ?></td>
                        <td><?= $row->email ?></td>
                        <td><?= $row->role?></td>
                        <td><?= $row->created_at   ?></td>
                        <td><?= $row->company ?></td>
                    </tr> <?php endforeach; ?>
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
            $('#coba').DataTable();
        });
    </script>
</body>

</html>