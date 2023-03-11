// run when document loaded
window.onload = function () {
  const ctx = document.getElementById("chart").getContext("2d");

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Premium User",
          data: [10, 150, 200, 250, 240, 220, 180, 150, 170, 200, 300, 400],
          borderColor: "#4461F2",
          backgroundColor: "rgba(0, 0, 0, 0)",
        },
        {
          label: "Free User",
          data: [100, 320, 310, 250, 100, 200, 250, 210, 190, 110, 15, 10],
          borderColor: "#D8D2FC",
          backgroundColor: "rgba(0, 0, 0, 0)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 100,
          },
          grid: {
            borderColor: "rgba(0, 0, 0, 0)",
          },
        },
      },
    },
  });
};
