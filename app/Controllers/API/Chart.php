<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class Chart extends BaseController
{
    use ResponseTrait;
    public function chartPackage()
    {
        try {

            $json = $this->request->getJSON();
            $data = [
                'tahun' => $json->tahun,
                'paket' => $json->paket,
            ];
            $strYear = strtotime($data['tahun']);
            $tahun = date('Y', $strYear);
            $paket = $data['paket'];

            $db = \Config\Database::connect();
            $builder = $db->table('user_packages');

            $query = $builder->select("COUNT(user_id) as count, EXTRACT(month from active_date) as bulan");
            $query = $builder->where("package_id='$paket' AND EXTRACT(year from active_date)=$tahun GROUP BY EXTRACT(month from active_date)")->get();
            $record = $query->getResult();
            $sell = [];

            // var_dump($record);

            foreach ($record as $row) {
                $sell[] = array(
                    'bulan' => $row->bulan,
                    'jumlah' => $row->count,
                );
            }
            $result['sell'] = ($sell);
            // var_dump($result);
            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Chart has been made',
                    'data' => $result,
                ],
            ];
            return $this->respondCreated($response);
        } catch (\Throwable$th) {
            return $this->fail('Fail to get data');
        }
    }

    public function chartPOI()
    {
        try {
            $json = $this->request->getJSON();
            $data = [
                'tahun' => $json->tahun,
            ];
            $strYear = strtotime($data['tahun']);
            $tahun = date('Y', $strYear);

            $db = \Config\Database::connect();
            $builder = $db->table('points');

            $query = $builder->select("COUNT(id) as count, EXTRACT(month from created_at) as bulan");
            $query = $builder->where("EXTRACT(year from created_at)=$tahun GROUP BY EXTRACT(month from created_at)")->get();
            $record = $query->getResult();
            $growth = [];

            // var_dump($record);

            foreach ($record as $row) {
                $growth[] = array(
                    'bulan' => $row->bulan,
                    'jumlah' => $row->count,
                );
            }
            $result['growth'] = ($growth);
            // var_dump($result);
            $response = [
                'status' => 201,
                'error' => null,
                'messages' => [
                    'success' => 'Chart has been made',
                    'data' => $result,
                ],
            ];
            return $this->respondCreated($response);
        } catch (\Throwable$th) {
            return $this->fail('Fail to get data');
        }
    }
}