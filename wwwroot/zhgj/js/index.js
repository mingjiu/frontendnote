//realtime
(function(window, $, template){
	$('#toSearch').on('click', function(e){
		toSearch();
	});
	$('#toSearch').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			toSearch();
		}
	});
	function toSearch(){
		if($('#searchInput').val() != ''){
			$.ajax({
				url: 'searchline?key=' + $('#searchInput').val(),
				method: 'GET',
				success: function(data, status){
					var data = JSON.parse(data.data);
					if(data.data){
						console.log(data);
						var html = template('tplSearch', data);
						$('#searchResult').html(html).show();
					}else{
						alert('no reuslt');
					}
				}
			});
		}
	}
	$('#clearSearch').on('click', function(e){
		$('#searchInput').val('');
		$('#searchResult').hide();
	});
	$('#searchResult').on('click', function(e){
		if($(e.target).attr('lineid') || $(e.target).children('p[lineid]')){
			var el = e.target.tagName == 'P' ? $(e.target) : $(e.target).find('p[lineid]');
			var lineid = $(el).attr('lineid');
			var FromStation = $(el).attr('fromstation');
			var ToStation = $(el).attr('tostation');
			var Name = $(el).attr('linename');
			$.ajax({
				url: 'getstationwithlist?lineid=' + lineid,
				method: 'GET',
				success: function(data, status){
					var data = JSON.parse(data.data);
					if(data.data){
						var html = template('tplRealtime', data);
						$('#searchResult').hide();
						$('.line-cont .from-station').html(FromStation);
						$('.line-cont .to-station').html(ToStation);

						$('#realtimePanel').show()
						$('.station-list').html(html);
						getBusOnload(FromStation,Name);
					}else{
						alert('no reuslt');
					}
				}
			})
		}
	});
	var f , n;
	function getBusOnload(FromStation, Name){
		f = FromStation;
		n = Name;
		$.ajax({
			url: 'getbusonroad?linename='+n+'&fromstation='+f,
			method: 'GET',
			success: function(data,status){
				var data = JSON.parse(data.data).data;
				console.log(data);
				if(data){
					$('.station-list .weui-cell__ft').html('');
					for(var i = 0; i<data.length; i++){
						$('.weui-cell[stationname="'+data[i].CurrentStation+'"]').find('.weui-cell__ft').html(data[i].BusNumber);
					}
				}
			}
		});
	}
	$('#realtimeUpdate').on('click', function(){getBusOnload(f,n)});



})(window, $, template);
