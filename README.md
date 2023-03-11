<h1 align="center">Abbauf WebGIS Intelligence</h1>

## Contributing

Sebelum melakukan merge pada branch ini pastikan anda sudah membaca guideline kontribusi pada file [CONTRIBUTION.md](./CONTRIBUTION.md).

[Best practices response](https://gist.github.com/igorjs/407ffc3126f6ef2a6fe8f918a0673b59)

Persyaratan

- PHP 8.0.\*

Vendor Facebook

ubah baris code 108 vendor/facebook/graph-sdk/src/facebook/http/GrapRawResponse

preg_match('/HTTP\/\d(?:\.\d)?\s+(\d+)\s+/',$rawResponseHeader, $match);
// preg_match('|HTTP/\d\.\d\s+(\d+)\s+.\*|', $rawResponseHeader, $match);

<!-- Response
```json
{
    "status": 404,
    "error": 404,
    "messages": {
        "error": "Not Found"
    }
}
```

```php
$data = [
    [
        "110 200",
        "300 200",
    ],
    [
        "110 200",
        "300 200",
    ]
];
// ST_Polygon('polygon((110 120, 110 140, 120 130, 110 120))', 1))
// ST_Polygon('polygon((110 120, 110 140, 130 140, 130 120, 110 120), (115 125, 115 135, 125 135, 125 135, 115 125))', 1))
// ST_Polygon('LINESTRING(75 29, 77 29, 77 29, 75 29)', 4326)
// ST_Polygon('(75 29, 77 29, 77 29, 75 29), (110 120, 110 140, 130 140, 130 120, 110 120)', 4326)
``` -->

input file zip
extract ZIP membuat folder baru berdasarkan timestamp
import ogr2ogr table timestamp
reset file
generate map file
