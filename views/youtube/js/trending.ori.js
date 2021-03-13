var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];
var chDonut1 = document.querySelectorAll("#bullet-ctx");
if (chDonut1) {
  chDonut1.forEach(function (ii) {
    new Chart(ii, {
      type: 'pie',
      data: {
        labels: ['Views', 'Likes', 'Dislikes', 'Favorites'],
        datasets: [
          {
            backgroundColor: colors.slice(0, 3),
            borderWidth: 0,
            data: [ii.getAttribute('data-views'), ii.getAttribute('data-likes'), ii.getAttribute('data-dislikes'), ii.getAttribute('data-favs')]
          }
        ]
      },
      options: {
        cutoutPercentage: 85,
        legend: {
          position: 'bottom',
          labels: {
            pointStyle: 'circle',
            usePointStyle: true
          }
        }
      }
    });
  });
}