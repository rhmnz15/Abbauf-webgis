<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CircleAnalysis extends Migration
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
        $this->forge->createTable('circle_analysis', true);
    }

    public function down()
    {
        $this->forge->dropTable('circle_analysis', true);
    }
}
