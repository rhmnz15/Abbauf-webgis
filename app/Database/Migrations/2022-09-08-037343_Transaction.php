<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Transaction extends Migration
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
            'transaction_id' => [
                'type' => 'VARCHAR',
                'length' => 200
            ],
            'order_id' => [
                'type' => 'VARCHAR',
                'length' => 200
            ],
            'gross_amount' => [
                'type' => 'BIGINT'
            ],
            'payment_type' => [
                'type' => 'VARCHAR',
                'length' => 100
            ],
            'transaction_status' => [
                'type' => 'VARCHAR',
                'length' => 20
            ],
            'user_id' => [
                'type' => 'INT',
                'unsigned' => true
            ],
            'package_id' => [
                'type' => 'INT',
                'unsigned' => true
            ],
            'pdf_url' => [
                'type' => 'VARCHAR',
                'unsigned' => true,
                'length' => 2000
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
        $this->forge->addForeignKey('package_id', 'packages', 'id');
        $this->forge->addForeignKey('user_id', 'users', 'user_id');
        $this->forge->createTable('transactions', true);
    }

    public function down()
    {
        $this->forge->dropTable('transactions', true);
    }
}
