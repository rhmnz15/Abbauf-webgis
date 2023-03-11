<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Testing Page</title>
    <script>
      const base_url = "<?php echo base_url(); ?>";
    </script>
    <link rel="stylesheet" href="<?php echo base_url('/js/testing.css'); ?>" />
    <script src="/assets/js/jquery-3.6.1.min.js"></script>
    <!-- <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css"> -->
    <!-- <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script> -->
    <script src="<?php echo base_url(); ?>/js/json-editor.js"></script>
    <!-- <script>hljs.highlightAll();</script> -->
  </head>
  <body>
    <form id="form">
      <div id="form-group">
        <div>
          <label for="url">API Route</label>
          <input type="text" id="url" />
        </div>

        <div>
          <label for="method">Method</label>
          <select name="method" id="method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>
      <div class="type">
        <label for="type">Client</label>
        <select name="type" id="type">
          <option value="fetch">Fetch</option>
          <option value="axios">Axios</option>
          <option value="ajax">Jquery Ajax</option>
          <option value="ajaxPromise">Jquery Ajax Promise</option>
          <option value="xmlhttp">XML HTTP Request</option>
        </select>
      </div>
      <div class="textarea">
        <label for="data">Body</label>
        <json-editor name="data" id="data"></json-editor>
      </div>

      <button id="submit">Hit</button>
    </form>

    <code id="result-container">
      <json-editor id="result"></json-editor>
    </code>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="<?php echo base_url(); ?>/js/testing.js"></script>
  </body>
</html>
