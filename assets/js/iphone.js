		var IPHONE = window.IPHONE || {};

		IPHONE.loading = function(){    
	      setTimeout(function(){
	        $('.loading').fadeOut(200, function(){
	        	IPHONE.init();
	        });
	      }, 1);
		}

		IPHONE.controls = function(){
			$('.app a, .home a').on('click', function(e){
				e.preventDefault();

				IPHONE.alert('show');
			});

			$('.alert a').on('click', function(e){
				e.preventDefault();

				IPHONE.alert('hide');
			});

			$('.power').on('click', function(e){
				e.preventDefault();
          		$('.overlay').fadeOut();
				$('.lock').fadeIn();
			});

		}

		IPHONE.alert = function( action ){

			if(action === 'show'){
				$('.overlay').fadeIn(200, function(){
					$('.alert').addClass('pop');
				})
			} else {
				$('.overlay').fadeOut(200, function(){
					$('.alert').removeClass('pop');
				});
			}
		}

		IPHONE.switch = function(){
			$('#switch a').on('click', function(e){
				e.preventDefault();
				var $color = $(this).data('color');

				$('#iphone-6').removeClass().addClass($color);
			})
		}

		IPHONE.setTime = function(){
			var $now = new Date();
			var $hours = ($now.getHours() > 9) ? $now.getHours() : '0'+$now.getHours();
			var $minutes = ($now.getMinutes() > 9) ? $now.getMinutes() : '0'+$now.getMinutes();

			$('.time').text($hours + ':' + $minutes);
		}


		IPHONE.parallaxBG = function(){
				$.parallaxify({
					positionProperty: 'transform',
					responsive: true,
					motionType: 'natural',
					mouseMotionType: 'performance',
					motionAngleX: 70,
					motionAngleY: 70,
					alphaFilter: 0.5,
					adjustBasePosition: true,
					alphaPosition: 0.025,
				});
		}

		IPHONE.pin = function(){
			var $pin = 1234;
			var $input = '';
			var $count = 0;

			$('.keyboard div').on('click', function(e){

				e.preventDefault();
				var $number = $(this);
				var $value = $number.find('em').text();
				$input += $value;

				$('.keyboard div').removeClass('click');

				$number.addClass('click').delay(200).queue(function(){
					$(this).removeClass('click');
				});
				
				$('.pills').removeClass('error').find('span').eq($count).addClass('fill');

				$count++;

				if($count === 4)
				checkPin($input);

			});

			function checkPin($check){
				$count = 0;
				$input = '';
				$('.pills').find('span').removeClass('fill');
				
				if($check == $pin){
					$('.lock').fadeOut(200);
				} else {
					$('.pills').addClass('error');
				}
			}
		}


		IPHONE.init = function(){
			IPHONE.controls();
		}

		$(window).load(function(){
			IPHONE.loading();
			IPHONE.switch();
			IPHONE.setTime();
			IPHONE.pin();
			IPHONE.parallaxBG();
		});