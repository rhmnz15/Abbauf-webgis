<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment</title>
</head>

<body>
  <button id="pay-button">Pay!</button>
  <pre><div id="result-json">JSON result will appear here after payment:<br></div></pre>

    <!-- TODO: Remove ".sandbox" from script src URL for production environment. Also input your client key in "data-client-key" -->
    <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-84PD1yfgn32Vwa-z"></script>
    <script type="text/javascript">
      document.getElementById('pay-button').onclick = function(){
        // SnapToken acquired from previous step
        window.snap.pay('<?= $snap ?>', {
          // Optional
          onSuccess: function(result){
            /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log(JSON.stringify(result, null, 2))
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
          },
          // Optional
          onPending: function(result){
            /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log(JSON.stringify(result, null, 2))
            /* You may add your own implementation here */
            alert("wating your payment!"); console.log(result);
          },
          // Optional
          onError: function(result){
            /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log(JSON.stringify(result, null, 2))
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          // Optional
          onClose: function(result){
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        });
        
        $.ajax({
          type: "post",
          url: "/api/transactions/snap",
          data: "data",
          dataType: "json",
          success: function (response) {
            
          }
        });
        
        // $.ajax({
        //   type: "post",
        //   url: "/api/transactions/create",
        //   data: "data",
        //   dataType: "json",
        //   success: function (response) {
            
        //   }
        // });
      };
    </script>
</body>

</html>
