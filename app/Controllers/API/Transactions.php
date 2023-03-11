<?php

namespace App\Controllers\API;

use App\Models\TransactionModel;
use App\Models\PackageModel;
use App\Models\UserPackagesModel;
use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\I18n\Time; 

class Transactions extends ResourceController
{
    use ResponseTrait;
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        try {
            $model = new TransactionModel();
            return $this->respond($model->findAll());
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        try {
            $model = new TransactionModel();
            $transaction = $model->find($id);
            if (!$transaction) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            return $this->respond($transaction);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function snap($id = null)
    {
        $request = \Config\Services::request();
        $user_id = session()->auth['user_id'];

        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = 'SB-Mid-server-4wqYn2NHomHvsQhpCstaZ5ra';
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;
    
        if($request->getVar('item_details')){
            $data = $request->getVar('item_details')[0];
            $transaction_details = array(
                'order_id' => rand(),
                'gross_amount' => $data->price,
            );
        
            $items = array(array(
                'id' => $data->package_id,
                'price' => $data->price,
                'quantity' => $data->quantity,
                'name' => $data->name
            ));

            $transaction = array(
                'transaction_details' => $transaction_details,
                'item_details' => $items,
            );
            
            $snap = \Midtrans\Snap::getSnapToken($transaction);
            return $this->respond($snap);
        }else{
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }

    public function create($order_id = null)
    {
        try {
            $valid = $this->validate([
                'package_id' => 'required',
            ]);
            
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }

            // Set your Merchant Server Key
            \Midtrans\Config::$serverKey = 'SB-Mid-server-4wqYn2NHomHvsQhpCstaZ5ra';
            // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
            \Midtrans\Config::$isProduction = false;
            // Set sanitization on (default)
            \Midtrans\Config::$isSanitized = true;
            // Set 3DS transaction for credit card to true
            \Midtrans\Config::$is3ds = true;
            $data = $this->request->getVar();
            $model = new TransactionModel();
            $model->insert([
                'transaction_id' => $data->transaction_id,
                'order_id' => $data->order_id,
                'gross_amount' => intval($data->gross_amount),
                'payment_type' => $data->payment_type,
                'transaction_status' => $data->transaction_status,
                'user_id' => $data->user_id,
                'package_id' => $data->package_id,
                'pdf_url' => $data->pdf_url
            ]);
            
            // ADD USER SUBSCRIPTION
            $uid = $data->user_id;
            $user_packages = new UserPackagesModel();
            $user_packages->set([
                'status' => 'f'
            ]);
            $user_packages->where('user_id', $data->user_id);
            $user_packages->update();

            $user_packages->insert([
                'package_id' => $data->package_id,
                'user_id' => $data->user_id,
                'status' => 't',
                'active_date' => Time::now('Asia/Jakarta'),
                'expired_date' => date('Y-m-d H:i:s', strtotime('+1 years'))
            ]);
            
            // // DESTRYO SESSION & CREATE AGAIN
            // session_destroy();

            return $this->respondCreated([
                "message" => "Data berhasil disimpan"
            ]);
        } catch (\Throwable $th) {
            return $this->fail($th->getMessage());
        }
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */

    public function cron()
    {
        try {
            // Set your Merchant Server Key
            \Midtrans\Config::$serverKey = 'SB-Mid-server-4wqYn2NHomHvsQhpCstaZ5ra';
            // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
            \Midtrans\Config::$isProduction = false;

            $notif = new \Midtrans\Notification();
            $transaction = $notif->transaction_status;
            $type = $notif->payment_type;
            $order_id = $notif->order_id;
            $fraud = $notif->fraud_status;
            $message = 'ok';

            if ($transaction == 'capture') {
                // For credit card transaction, we need to check whether transaction is challenge by FDS or not
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        // TODO set payment status in merchant's database to 'Challenge by FDS'
                        // TODO merchant should decide whether this transaction is authorized or not in MAP
                        $message = "Transaction order_id: " . $order_id ." is challenged by FDS";
                    } else {
                        // TODO set payment status in merchant's database to 'Success'
                        $message = "Transaction order_id: " . $order_id ." successfully captured using " . $type;
                    }
                }
            } elseif ($transaction == 'settlement') {
                // TODO set payment status in merchant's database to 'Settlement'
                $message = "Transaction order_id: " . $order_id ." successfully transfered using " . $type;
            } elseif ($transaction == 'pending') {
                // TODO set payment status in merchant's database to 'Pending'
                $message = "Waiting customer to finish transaction order_id: " . $order_id . " using " . $type;
            } elseif ($transaction == 'deny') {
                // TODO set payment status in merchant's database to 'Denied'
                $message = "Payment using " . $type . " for transaction order_id: " . $order_id . " is denied.";
            } elseif ($transaction == 'expire') {
                // TODO set payment status in merchant's database to 'expire'
                $message = "Payment using " . $type . " for transaction order_id: " . $order_id . " is expired.";
            } elseif ($transaction == 'cancel') {
                // TODO set payment status in merchant's database to 'Denied'
                $message = "Payment using " . $type . " for transaction order_id: " . $order_id . " is canceled.";
            }
            var_dump($message);
        } catch (\Throwable $th) {
            return $this->fail('Data Tidak Ditemukan');
        }
    }
    
    public function update($id = null)
    {
        try {
            $valid = $this->validate([
                'pay' => 'required'
            ]);
            if (!$valid) {
                return $this->fail($this->validator->getErrors());
            }
            $model = new TransactionModel();
            $transaction = $model->find($id);
            if (!$transaction) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            $model->update($id, [
                'pay' => $this->request->getVar('pay')
            ]);
            return $this->respondUpdated($model->find($id));
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        try {
            $model = new TransactionModel();
            $transaction = $model->find($id);
            if (!$transaction) {
                return $this->failNotFound('Data tidak ditemukan');
            }
            $model->delete($id);
            return $this->respondDeleted([
                'message' => 'Data berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            return $this->fail('Ooops!, terjadi kesahalan');
        }
    }
}
