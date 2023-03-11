<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DetailPackage extends Migration
{
    public function up()
    {
        // Create field for detail_packages table
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true
            ],
            'package_id' => [
                'type' => 'INT',
                'constraint' => 11
            ],
            'feature_id' => [
                'type' => 'INT',
                'constraint' => 11
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
            
            // Create foreign key package_id and feature_id
            $this->forge->addForeignKey('package_id', 'packages', 'id');
            $this->forge->addForeignKey('feature_id', 'features', 'id');
            
            // Create detail_packages table
            $this->forge->createTable('detail_packages', true);
    }

    public function down()
    {
        // Drop shp table
        $this->forge->dropTable('detail_packages', true);
    }
}
