<script src="/AGC/template/lib/jquery/jquery.min.js"></script>
    <script src="/AGC/template/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/AGC/template/lib/ionicons/ionicons.js"></script>
    <script src="/AGC/template/lib/jquery.flot/jquery.flot.js"></script>
    <script src="/AGC/template/lib/jquery.flot/jquery.flot.categories.js"></script>
    <script src="/AGC/template/lib/jquery.flot/jquery.flot.resize.js"></script>
    <script src="/AGC/template/lib/flot.curvedlines/curvedLines.js"></script>

    <script src="/AGC/template/js/azia.js"></script>
    <script src="/AGC/template/js/dashboard.sampledata.js"></script>
    <script src="/AGC/template/js/chart.flot.sampledata.js"></script>
    <script>
      $(function(){
        'use strict'

        $('.az-iconbar .nav-link').on('click', function(e){
          e.preventDefault();

          $(this).addClass('active');
          $(this).siblings().removeClass('active');

          $('.az-iconbar-aside').addClass('show');

          var targ = $(this).attr('href');
          $(targ).addClass('show');
          $(targ).siblings().removeClass('show');
        });

        $('.az-iconbar-toggle-menu').on('click', function(e){
          e.preventDefault();

          if(window.matchMedia('(min-width: 992px)').matches) {
            $('.az-iconbar .nav-link.active').removeClass('active');
            $('.az-iconbar-aside').removeClass('show');
          } else {
            $('body').removeClass('az-iconbar-show');
          }
        })

        $('#azIconbarShow').on('click', function(e){
          e.preventDefault();
          $('body').toggleClass('az-iconbar-show');

          var targ = $('.az-iconbar .nav-link.active').attr('href');
          $(targ).addClass('show');
        });

        $(document).bind('click touchstart', function(e){
          e.stopPropagation();

          var azContent = $(e.target).closest('.az-content').length;
          var azIconBarMenu = $(e.target).closest('.az-header-menu-icon').length;

          if(azContent) {
            $('.az-iconbar-aside').removeClass('show');

            // for mobile
            if(!azIconBarMenu) {
              $('body').removeClass('az-iconbar-show');
            }
          }
        });

        /******************* DASHBOARD CHARTS **************************/

        $.plot('#flotBar1', [{
          data: [[1,0],[2,0],[3,0],[4,1],[5,3],[6,3],[7,10],[8,11],[9,10],[10,9],[11,12],[12,8],[13,10],[14,6],[15,3]],
          bars: {
            show: true,
            lineWidth: 0,
            fillColor: '#dee2e6',
            barWidth: .3,
            order: 'left'
          }
        },{
          data: [[1,0],[2,0],[3,1],[4,2],[5,2],[6,5],[7,8],[8,12],[9,10],[10,11],[11,3]],
          bars: {
            show: true,
            lineWidth: 0,
            fillColor: '#006adb',
            barWidth: .3,
            align: 'right'
          }
        }], {
          grid: {
            borderWidth: 0
          },
          yaxis: {
            min: 0,
            max: 15,
            tickColor: '#ddd',
            ticks: [[0,''],[5,'$500'],[10,'$1000'],[15,'$3000']],
            font: {
              color: '#444',
              size: 10
            }
          },
          xaxis: {
            mode: 'categories',
            tickColor: '#eee',
            ticks: [[0,'3am'],[1,'4am'],[2,'5am'],[3,'6am'],[4,'7am'],[5,'8am'],[6,'9am'],[7,'10am'],[8,'11am'],[9,'12nn'],[10,'1pm'],[11,'2pm'],
          [12,'3pm'],[13,'4pm'],[14,'5pm']],
            font: {
              color: '#999',
              size: 9
            }
          }
        });


        $.plot('#flotLine1', [{
          data: [[1,0],[2,0],[3,0],[4,1],[5,3],[6,3],[7,10],[8,11],[9,12],[10,9],[11,12],[12,8],[13,5],[14,10],[15,11]],
          color: '#ced4da'
        },{
          data: [[1,0],[2,0],[3,1],[4,2],[5,2],[6,5],[7,8],[8,12],[9,9],[10,11],[11,5]],
          color: '#f10075'
        }], {
          series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: 0.12 } ] }
            }
    			},
          grid: {
            borderWidth: 0
          },
          yaxis: {
            min: 0,
            max: 15,
            tickColor: '#ddd',
            ticks: [[0,''],[5,'100K'],[10,'200K'],[15,'300K']],
            font: {
              color: '#444',
              size: 10
            }
          },
          xaxis: {
            mode: 'categories',
            tickColor: '#eee',
            ticks: [[0,'3am'],[1,'4am'],[2,'5am'],[3,'6am'],[4,'7am'],[5,'8am'],[6,'9am'],[7,'10am'],[8,'11am'],[9,'12nn'],[10,'1pm'],[11,'2pm'],
          [12,'3pm'],[13,'4pm'],[14,'5pm']],
            font: {
              color: '#999',
              size: 9
            }
          }
        });

        $.plot('#flotChart1', [{
            data: dashData5,
            color: '#560bd0'
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 60
          },
    			xaxis: { show: false }
    		});

        $.plot('#flotChart2', [{
            data: dashData6,
            color: '#006adb'
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 80
          },
    			xaxis: { show: false }
    		});

        $.plot('#flotChart3', [{
            data: dashData7,
            color: '#00cccc'
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 80
          },
    			xaxis: { show: false }
    		});

        $.plot('#flotChart4', [{
            data: dashData5,
            color: '#f10075'
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 80
          },
    			xaxis: { show: false }
    		});

        $.plot('#flotChart5', [{
            data: dashData6,
            color: '#3bb001'
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 80
          },
    			xaxis: { show: false }
    		});

        $.plot('#flotChart6', [{
            data: dashData7,
            color: '#fd7e14'
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0 }, { opacity: .5 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 80
          },
    			xaxis: { show: false }
    		});

        $.plot('#flotChart7', [{
              data: dashData3,
              color: '#00cccc',
              curvedLines: { apply: true }
          },{
              data: dashData4,
              color: '#560bd0',
              curvedLines: { apply: true }
          }], {
    			series: {
    				shadowSize: 0,
            lines: {
              show: true,
              lineWidth: 0,
              fill: true,
              fillColor: { colors: [ { opacity: .5 }, { opacity: 1 } ] }
            },
            curvedLines: { active: true }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: true,
            min: 0,
            max: 50,
            ticks: [[0,''],[10,'100'],[20,'200'],[30,'300']],
            tickColor: '#f3f3f3'
          },
    			xaxis: {
            show: true,
            ticks: [[0,''],[20,'Nov 20'],[40,'Nov 21'],[60,'Nov 22']],
            tickColor: 'rgba(255,255,255,0)'
          }
    		});

        $.plot('#flotChart8', [{
          data: dashData4,
          color: '#3381d6'
        }], {
    			series: {
            bars: {
              show: true,
              lineWidth: 0,
              fill: 1,
              barWidth: .5
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: true,
            min: 0,
            max: 30,
            ticks: [[0,''],[10,'100'],[20,'200']],
            tickColor: 'rgba(255,255,255,0)'
          },
    			xaxis: {
            show: true,
            max: 40,
            ticks: [[0,''],[15,'Nov 20'],[30,'Nov 21']],
            tickColor: 'rgba(255,255,255,0)'
          }
    		});

        $.plot('#flotChart9', [{
          data: dashData3,
          color: '#fff',
          bars: {
            show: true,
            lineWidth: 0,
            barWidth: .5
          }
        },{
          data: dashData4,
          color: '#fff',
          lines: {
            show: true,
            lineWidth: 2,
            fill: .16
          }
        }], {
          series: {
            shadowSize: 0
          },
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: true,
            min: 0,
            max: 30,
            ticks: [[0,''],[10,'100'],[20,'200']],
            tickColor: 'rgba(255,255,255,0)'
          },
    			xaxis: {
            show: true,
            max: 40,
            ticks: [[0,''],[15,'Nov 20'],[30,'Nov 21']],
            tickColor: 'rgba(255,255,255,0)'
          }
    		});

        //
      });
    </script>
  </body>
</html>