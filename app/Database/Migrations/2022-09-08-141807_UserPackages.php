<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UserPackages extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'package_id' => [
                'type'       => 'INT'
            ],
            'user_id' => [
                'type' => 'INT'
            ],
            'status' => [
                'type' => 'BOOLEAN',
                'unsigned'       => true,
            ],
            'active_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'expired_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME'
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('user_id', 'users', 'user_id');
        $this->forge->addForeignKey('package_id', 'packages', 'id');
        $this->forge->createTable('user_packages', true);
    }

    public function down()
    {
        $this->forge->dropTable('user_packages', true);
    }
}