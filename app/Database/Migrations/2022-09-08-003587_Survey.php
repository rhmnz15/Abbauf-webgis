<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Survey extends Migration
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
                'type' => 'INT'
            ],
            'geom' => [
                'type' => 'geometry(Point, 4326)'
            ],
            'survey_date' => [
                'type' => 'DATETIME'
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
        $this->forge->createTable('surveys', true);
    }

    public function down()
    {
        $this->forge->dropTable('surveys', true);
    }
}