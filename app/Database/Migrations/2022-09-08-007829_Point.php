<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Point extends Migration
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
            'attribute' => [
                'type' => 'TEXT'
            ],
            // 'type' => [
            // 'type' => "ENUM('Point', 'Polygon', 'Line')"
            // ],
            'geom' => [
                'type' => "geometry('Point', 4326)"
            ],
            'layer_id' => [
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
        $this->forge->addForeignKey('layer_id', 'layers', 'id');
        $this->forge->createTable('points', true);
    }

    public function down()
    {
        $this->forge->dropTable('points', true);
    }
}