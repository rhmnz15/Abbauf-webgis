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
            'user_id' => [
                'type' => 'INT',
                'unsigned' => true
            ],
            'analysis_type' => [
                'type' => "VARCHAR"
            ],
            'hasil_analysis' => [
                'type' => "GEOMETRY"
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
    }

    public function down()
    {
        // $this->forge->dropTable('analysis', true);
    }
}
