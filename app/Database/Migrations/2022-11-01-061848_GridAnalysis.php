<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class GridAnalysis extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => true,
                'constraint' => 11,
                'auto_increment' => true
            ],
            'layer_id' => [
                'type' => 'INT',
                'unsigned' => true
            ],
            'attribute' => [
                'type' => "TEXT"
            ],
            // 'geom' => [
            //     'type' => "geometry(4326)"
            // ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('layer_id', 'layers', 'id');
        $this->forge->createTable('grid_analysis', true);
    }

    public function down()
    {
        $this->forge->dropTable('grid_analysis', true);
    }
}
