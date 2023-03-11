<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Layer extends Migration
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
            'name' => [
                'type' => 'VARCHAR',
                'length' => 255
            ],
            // 'type' => [
            //     'type' => "ENUM('Point', 'Polygon', 'Line')"
            // ],
            'type' => [
                'type' => "VARCHAR"
            ],
            'user_id' => [
                'type' => 'INT',
                'unsigned' => true
            ],
            'created_at' => [
                'type' => 'DATETIME'
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('user_id', 'users', 'user_id');
        $this->forge->createTable('layers', true);
    }

    public function down()
    {
        $this->forge->dropTable('layers', true);
    }
}