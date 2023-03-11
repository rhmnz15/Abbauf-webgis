<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Package extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'constraint' => 5,
                'auto_increment' => true
            ],
            'user_id' => [
                'type' => 'INT',
            ],
            'name' => [
                'type' => 'VARCHAR',
                'length' => 255
            ],
            'price' => [
                'type' => 'BIGINT'
            ],
<<<<<<< HEAD:app/Database/Migrations/2022-09-08-036826_Package.php
            'status' => [
                'type' => 'BOOL',
                'default' => false
            ],
=======
>>>>>>> ea4c6edd8dc99148e55bcc450384b54f96760de2:app/Database/Migrations/2022-10-19-085848_Package.php
            'category' => [
                'type' => 'VARCHAR',
                'constraint' => '200',
                'null' => true
            ],
<<<<<<< HEAD:app/Database/Migrations/2022-09-08-036826_Package.php
            'created_at' => [
                'type' => 'DATETIME'
=======
            'status' => [
                'type' => 'BOOLEAN',
                'unsigned' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true
>>>>>>> ea4c6edd8dc99148e55bcc450384b54f96760de2:app/Database/Migrations/2022-10-19-085848_Package.php
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true
<<<<<<< HEAD:app/Database/Migrations/2022-09-08-036826_Package.php
            ],
=======
            ]
    
>>>>>>> ea4c6edd8dc99148e55bcc450384b54f96760de2:app/Database/Migrations/2022-10-19-085848_Package.php
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('user_id', 'users', 'user_id');
        $this->forge->createTable('packages', true);
    }

    public function down()
    {
        $this->forge->dropTable('packages', true);
    }
}