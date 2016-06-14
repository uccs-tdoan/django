
    google.charts.load('current', {'packages':['corechart']});
    //google.charts.setOnLoadCallback(drawChart);
    function drawChart(arguments,flag,color) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'secs');
    if(flag==1)
      data.addColumn('number', 'heartrate');
    if(flag==2)
      data.addColumn('number', 'watts');
    if(flag==3)
        data.addColumn('number', 'speed');
    if(flag==4)
            data.addColumn('number', 'Elevation');
    var watts=[];
    for(i = 0; i < arguments.length; i++){
    watts.push([i,parseInt(arguments[i])]);
    }
    for(i = 0; i < watts.length; i++){
    data.addRow(watts[i]);
    }
    var options = {
     chart: {
       title: '',
       subtitle: ''
     },
     width: 850,
     height: 120,
     hAxis: {title: 'Seconds',  titleTextStyle: {color: '#333'}},
     vAxis: {minValue: 0},
     colors: [color],
     areaOpacity:1,
     legend: {position: 'none'}
            };
    if(flag==1){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material'));
    // Add our over/out handlers.
    document.getElementById("chartlefttab").innerHTML = '<span style="font-size:12px;"> Speed</span> <span style="font-size:12px;color:#A81111;"></br> Max-32.3 </br> Avg-27.4</span>';
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    if(flag==2){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material1'));
    document.getElementById("chartlefttab1").innerHTML ='<span style="font-size:12px;"> Watts</span> <span style="font-size:12px;color:#A81111;"></br> Max-476 </br> Avg-294.6</span>';
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    if(flag==3){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material2'));
    document.getElementById("chartlefttab2").innerHTML ='<span style="font-size:12px;">Heart Rate</span><span style="font-size:12px;color:#A81111;"></br> Max-135 </br> Avg-101.4 </span>';
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    if(flag==4){
    var chart = new google.visualization.AreaChart(document.getElementById('linechart_material3'));
    document.getElementById("chartlefttab3").innerHTML ='<span style="font-size:12px;">Elevation</span><span style="font-size:12px;color:#A81111;"></br> Max-135 </br> Avg-101.4 </span>';
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'onmouseover', chartMouseOver);
    }
    function chartMouseOver(e) {
      //var selectedItem = chart.getFormattedValue()[0];
      //var range1 = chart.getDataTable().getColumnRange(1);
      var value=0;
      var xvalue=0;
      var a=159;
      var b=850;
      var xa=0;
      var xb=2562;
      value = 1+((e.row-xa)*(b-a)/(xb-xa));
      console.log(value);
      xvalue=value+159;
    }
    }
    var heartRate=[];
    var watts=[];
    var speed=[];
    var elevation=[];
    var tempWatts=[];
          $.ajax({
            url:'/riderlist',
            dataType:'json',
            type:'get',
            cache:false,
            success:function(data){
              //console.log('success');
              $(data).each(function(index, value){
                $('#riderlistid').append('<option value="'+value.pk+'">'+value.fields.riderNo+'</option>');
                })
            }
          });
          function get_rider_ride_list(){
            var xk=0;
            var results=[];
            var i;
            var riderNo = $('#riderlistid').val();
            $('#ridelistid').empty();
            $.ajax({
              url:'/ridelist',
              type:"get",
              cache:false,
              data:{riderNo:riderNo},
              success:function(data){
                $('#ridelistid').append('<option value="">'+'Select a Ride'+'</option>');
                $(data).each(function(index, value){

                  if(jQuery.inArray(value.fields.rideNo,results)<0){
                    results.push(value.fields.rideNo);
                    $('#ridelistid').append('<option value="'+value.fields.rideNo+'">'+value.fields.rideNo+'</option>');

                  }
                })

              }
            });
          }
            function drawridechart(){
              var heartRate=[];
              var ht=[];
              var delay=1000;
              var pWatts=[];
              var speed=[];
              var elevation=[];
              var tempWatts=[];
              var tempSecs=[];
              var rideNo = $('#ridelistid').val();
              var riderNo = $('#riderlistid').val();
              var color1='#2155CF';
              var color2='#442B59';
              var color3='#084D0D';
              var color4='#ccc';
              $.ajax({
                url:'/ridechart',
                type:"get",
                cache:false,
                data:{rideNo:rideNo,riderNo:riderNo},
                success:function(data){
                  //console.log(data);
                  $(data).each(function(index, value){
                  heartRate.push(value.fields.heartRate);
                  pWatts.push(value.fields.watts);
                  speed.push(value.fields.speed);
                  elevation.push(value.fields.elevation)
                  })
                  $.ajax({
                    url:'/ridebar',
                    type:"get",
                    cache:false,
                    data:{rideNo:rideNo,riderNo:riderNo},
                    success:function(data){
                      var t = new Array();
                       data = JSON.parse(data);
                      $(data).each(function(index, value){
                          ht.push(Math.ceil(338-((338/100)*value)));
                          //console.log(ht);
                      })
                    }

                  });
                  drawChart(heartRate,1,color1);
                  drawChart(pWatts,2,color2);
                  drawChart(speed,3,color3);
                  drawChart(elevation,4,color4);
                  //console.log(ht);
                  //drawbar(ht);
                }
              });
            }
          window.onload=function(){
          var x=300;
          var canvas=document.getElementById('canvas');
          var ctx=canvas.getContext('2d');
          var cdt=[200,320,310,300,290];
          function renderbar(){
            var now = new Date();
            var hours=now.getHours();
            var mins=now.getMinutes();
            var secs=now.getSeconds();
            var time=now.toLocaleTimeString();
              ctx.fillStyle="white";
              ctx.clearRect(0,0,canvas.width,canvas.height);
              ctx.fillRect(0,0,228,x);
              ctx.stroke();
              ctx.font="30px Arial";
              ctx.fillStyle="black";
              ctx.fillText(hours+":"+mins+":"+secs,62,320);
              x=x-5;
              if(x<30){
                x=300;
              }
            }
            var setintrvl=setInterval(renderbar,600);
          };

            function uploadfitfile(){
              var riderNo = $('#riderlistid').val();
              $.ajax({
                url:'/uploadfitfile',
                type:"post",
                cache:false,
                riderNo:riderNo,
                data:{csrfmiddlewaretoken: "{{ csrf_token }}",riderNo:riderNo},
                success:function(data){
                  //console.log(data);
                }
              });

            }

            function readcsv(){
              var riderNo = $('#riderlistid').val();
              $.ajax({
                url:'/readcsv',
                type:"get",
                cache:false,
                data: { csrfmiddlewaretoken: "{{ csrf_token }}",   // < here
           state:"inactive",riderNo:riderNo
         },
                success:function(data){
                //console.log(data);

                }
              });
            }
            function getPos(e){
            x=e.clientX;
        		y=e.clientY;
            var value=0;
            var a=0;
            var b=124;
            var xa=159;
            var xb=850;
            value = ((Math.ceil(1+(((x-8)-xa)*(b-a)/(xb-xa)))*10)/10)-1;
            $('.overlay').css({'left' : x-8,'border-left':'1px solid'});
            $('.overlay1').css({'left' : x-8,'border-left':'1px solid'});
            $('.overlay2').css({'left' : x-8,'border-left':'1px solid'});
            $('.overlay3').css({'left' : x-8,'border-left':'1px solid'});
            //$('.charttooltip').css({'left' : x-8});
            //console.log(speed[value]);
            document.getElementById("charttooltip").innerHTML = speed[value]+'</br>mi/hr';
            document.getElementById("charttooltip1").innerHTML = watts[value]+'</br>watts';
            document.getElementById("charttooltip2").innerHTML = heartRate[value]+'</br>bpm';
            document.getElementById("charttooltip3").innerHTML = elevation[value]+'</br>ft';
    	}
    	function stopTracking(){
        $('.overlay').css({'left' : x-8,'border-left':'0px solid'});
        $('.overlay1').css({'left' : x-8,'border-left':'0px solid'});
        $('.overlay2').css({'left' : x-8,'border-left':'0px solid'});
        $('.overlay3').css({'left' : x-8,'border-left':'0px solid'});
        document.getElementById("charttooltip").innerHTML = '';
        document.getElementById("charttooltip1").innerHTML = '';
        document.getElementById("charttooltip2").innerHTML = '';
        document.getElementById("charttooltip3").innerHTML = '';
    	}
  	 // function from the jquery form plugin
  	 $('#myForm').ajaxForm({
  	 	beforeSend:function(){
        $(".screen-block").show();
  	 		 $(".progress").show();
  	 	},
  	 	uploadProgress:function(event,position,total,percentComplete){
  	 		$(".progress-bar").width(percentComplete+'%'); //dynamicaly change the progress bar width
  	 		$(".sr-only").html(percentComplete+'%'); // show the percentage number
  	 	},
  	 	success:function(){
        $(".screen-block").hide();
  	 	},
  	 	complete:function(response){

  	 	}
  	 });

  	 //set the progress bar to be hidden on loading
  	 $(".progress").hide();
