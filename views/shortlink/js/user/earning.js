var plot = $.plot('#flotChart', [{
      data: flotSampleData10,
      color: '#80bdff',
      lines: {
        fillColor: {
          colors: [{
            opacity: .6
          }, {
            opacity: .4
          }]
        }
      }
    }, {
      data: flotSampleData4,
      color: '#007bff',
      lines: {
        fillColor: {
          colors: [{
            opacity: .8
          }, {
            opacity: .6
          }]
        }
      }
    }, {
      data: flotSampleData11,
      color: '#003d80',
      lines: {
        fillColor: {
          colors: [{
            opacity: .9
          }, {
            opacity: .7
          }]
        }
      }
    }], {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 0,
          fill: true
        }
      },
      grid: {
        borderWidth: 0,
        aboveData: true
      },
      yaxis: {
        show: true,
        min: 0,
        max: 150,
        color: 'rgba(255,255,255,0.2)',
        ticks: [
          [0, ''],
          [25, '$25,000'],
          [50, '$50,000'],
          [75, '$75,000'],
          [100, '$100,000']
        ]
      },
      xaxis: {
        show: true,
        ticks: [
          [0, ''],
          [8, 'Jan'],
          [20, 'Feb'],
          [32, 'Mar'],
          [44, 'Apr'],
          [56, 'May'],
          [68, 'Jun'],
          [80, 'Jul'],
          [92, 'Aug'],
          [104, 'Sep'],
          [116, 'Oct'],
          [128, 'Nov'],
          [140, 'Dec']
        ],
        color: 'rgba(255,255,255,0.2)'
      }
    });

    $.plot('#flotChart1', [{
      data: flotSampleData6,
      color: '#70737c'
    }], {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 0
            }, {
              opacity: 0.1
            }]
          }
        }
      },
      grid: {
        borderWidth: 0,
        labelMargin: 0
      },
      yaxis: {
        show: false,
        min: 0,
        max: 120
      },
      xaxis: {
        show: false
      }
    });

    $.plot('#flotChart2', [{
      data: flotSampleData7,
      color: '#007bff'
    }], {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 0
            }, {
              opacity: 0.2
            }]
          }
        }
      },
      grid: {
        borderWidth: 0,
        labelMargin: 0
      },
      yaxis: {
        show: false,
        min: 0,
        max: 120
      },
      xaxis: {
        show: false
      }
    });

    $.plot('#flotChart3', [{
      data: flotSampleData8,
      color: '#fff'
    }], {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 0
            }, {
              opacity: 0.2
            }]
          }
        }
      },
      grid: {
        borderWidth: 0,
        labelMargin: 0
      },
      yaxis: {
        show: false,
        min: 0,
        max: 120
      },
      xaxis: {
        show: false
      }
    });

    $.plot('#flotChart4', [{
      data: flotSampleData9,
      color: '#fff'
    }], {
      series: {
        shadowSize: 0,
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: {
            colors: [{
              opacity: 0
            }, {
              opacity: 0.2
            }]
          }
        }
      },
      grid: {
        borderWidth: 0,
        labelMargin: 0
      },
      yaxis: {
        show: false,
        min: 0,
        max: 120
      },
      xaxis: {
        show: false
      }
    });

    var ctx5 = document.getElementById('chartBar5').getContext('2d');
    new Chart(ctx5, {
      type: 'horizontalBar',
      data: {
        labels: ['Jul', 'Aug', 'Sep'],
        datasets: [{
          data: [12, 39, 20],
          backgroundColor: '#007bff'
        }, {
          data: [22, 30, 25],
          backgroundColor: '#6f42c1'
        }, {
          data: [40, 30, 35],
          backgroundColor: '#00cccc'
        }, {
          data: [25, 40, 25],
          backgroundColor: '#004a99'
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        scales: {
          yAxes: [{
            barPercentage: 0.75,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              max: 80
            }
          }]
        }
      }
    });

    var ctx6 = document.getElementById('chartBar6').getContext('2d');
    new Chart(ctx6, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: [150, 110, 90, 115, 125, 160, 160, 140, 100, 110, 120, 120],
          backgroundColor: '#2b91fe'
        }, {
          data: [180, 140, 120, 135, 155, 170, 180, 150, 140, 150, 130, 130],
          backgroundColor: '#054790'
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false
          }
        },
        scales: {
          xAxes: [{
            //stacked: true,
            display: false,
            barPercentage: 0.5,
            ticks: {
              beginAtZero: true,
              fontSize: 11
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 10,
              color: '#eee',
              min: 80,
              max: 200
            }
          }]
        }
      }
    });

    // Progress
    var prog1 = $('#progressBar1 .progress-bar:first-child');
    prog1.css('width', '30%');
    prog1.attr('aria-valuenow', '30');
    prog1.text('30%');

    var prog2 = $('#progressBar1 .progress-bar:last-child');
    prog2.css('width', '53%');
    prog2.attr('aria-valuenow', '53');
    prog2.text('53%');

    // Progress
    var prog3 = $('#progressBar2 .progress-bar:first-child');
    prog3.css('width', '35%');
    prog3.attr('aria-valuenow', '35');
    prog3.text('35%');

    var prog4 = $('#progressBar2 .progress-bar:last-child');
    prog4.css('width', '37%');
    prog4.attr('aria-valuenow', '37');
    prog4.text('37%');