async function fetchHit(url, data, method) {
  try {
    const res = await fetch(base_url + url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "GET" ? null : JSON.stringify(JSON.parse(data)),
    });

    const json = await res.json();
    return {
      success: true,
      data: json,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
}

async function axiosHit(url, data, method) {
  try {
    const res = await axios({
      method: method,
      url: base_url + url,
      data: data,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
}

async function ajaxHit(url, data, method) {
  try {
    const res = await $.ajax({
      url: base_url + url,
      method: method,
      data: data,
    });
    return {
      success: true,
      data: res,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: err,
    };
  }
}

async function ajaxPromise(url, data, method) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: base_url + url,
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: (res) => {
        resolve({
          success: true,
          data: res,
        });
      },
      error: (err) => {
        reject({
          success: false,
          error: err,
        });
      },
    });
  });
}

async function xhrPromise(url, data, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, base_url + url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          success: true,
          data: JSON.parse(xhr.response),
        });
      } else {
        reject({
          success: false,
          error: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        success: false,
        error: xhr.statusText,
      });
    };
    xhr.send(data);
  });
}

async function xhrHit(url, data, method) {
  try {
    const res = await xhrPromise(url, data, method);
    return res;
  } catch (err) {
    return err;
  }
}

async function ajaxPromiseHit(url, data, method) {
  try {
    const res = await ajaxPromise(url, data, method);
    return res;
  } catch (err) {
    return err;
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const url = document.getElementById("url").value;
  const method = document.getElementById("method").value;
  const data = document.getElementById("data").value;
  const result = document.getElementById("result");

  result.value = "Loading...";

  const type = document.getElementById("type").value
    ? document.getElementById("type").value
    : "fetch";

  const res =
    type === "fetch"
      ? await fetchHit(url, data, method)
      : type === "axios"
      ? await axiosHit(url, data, method)
      : type === "ajax"
      ? await ajaxHit(url, data, method)
      : type === "ajaxPromise"
      ? await ajaxPromiseHit(url, data, method)
      : await xhrHit(url, data, method);

  if (res.success) {
    result.value = JSON.stringify(res, null, 2);
  } else {
    result.value = JSON.stringify(res, null, 2);
  }
}

function main() {
  const form = document.getElementById("form");
  form.onsubmit = handleSubmit;
}

document.addEventListener("DOMContentLoaded", main);
