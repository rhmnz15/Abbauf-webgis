<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class LineString extends Migration
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
            'geom' => [
                'type' => "geometry('LineString', 4326)"
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
        $this->forge->createTable('line_strings', true);
    }

    public function down()
    {
        $this->forge->dropTable('line_strings', true);
    }
}