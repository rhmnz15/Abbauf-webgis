<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SHP extends Migration
{
    public function up()
    {
        // Create field for shp table
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'user_id' => [
                'type' => 'INT',
                'constraint' => 11
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 255
            ],
            'type' => [
                'type' => 'INT',
                'unsigned' => true,
                'constraint' => 1
            ],
            'table_name' => [
                'type' => 'VARCHAR',
                'constraint' => 255
            ],
            'status' => [
                'type' => 'BOOLEAN',
                'default' => true
            ],
            'created_at' => [
                'type' => 'DATETIME'
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ]
        ]);

            // Create primary key id
            $this->forge->addKey('id', true);
            
            // Create foreign key user_id
            $this->forge->addForeignKey('user_id', 'users', 'user_id');
            
            // Create shp table
            $this->forge->createTable('shps', true);
    }

    public function down()
    {
        // Drop shp table
        $this->forge->dropTable('shps', true);
    }
}