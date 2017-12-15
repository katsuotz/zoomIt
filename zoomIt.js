(function ($) {
    $.fn.zoomIt = function (data) {

    	$('body').append(
			'<div class="zoom-overlay">\
				<div class="zoom-image">\
					<img src="#" class="zoomed-image">\
				</div>\
				<div class="zoom-image-list">\
					<div class="zoom-image-content">\
					</div>\
				</div>\
			</div>');

    	var mainImage = $(this);

    	var slider = data.slider;
    	if (slider) {
            var currentMargin = 0;
            var currentPosition = 0;
            var imageList = slider.imageList;
            var imageListWidth = [];
            var imageListWidthTotal = 0;
            var imageListHeight = 80;
            var imageMargin = {
                l: 5,
                r: 5,
                t: 0,
                b: 0
            }

            $(imageList).css('transition', '.3s');
            $(imageList + ' div').css({
                'float': 'left',
                'cursor': 'pointer'
            });

            $(imageList).wrap('<div class="image-overlay"><div class="image-slider"></div></div>');

            if (slider.width) {
                $('.image-overlay').width(slider.width);
            }

            if (slider.list.height) {
                imageListHeight = slider.list.height;
            }

            $(imageList + ' img').height(imageListHeight);

            if (slider.list.margin) {
                if (slider.list.margin.l) {
                    imageMargin.l = slider.list.margin.l;
                }
                if (slider.list.margin.r) {
                    imageMargin.r = slider.list.margin.r;
                }
                if (slider.list.margin.t) {
                    imageMargin.t = slider.list.margin.t;
                }
                if (slider.list.margin.b) {
                    imageMargin.b = slider.list.margin.b;
                }

                $(imageList + ' img').css('margin-left', imageMargin.l + 'px');
                $(imageList + ' img').css('margin-right', imageMargin.r + 'px');
                $(imageList + ' img').css('margin-top', imageMargin.t + 'px');
                $(imageList + ' img').css('margin-bottom', imageMargin.b + 'px');
            }

    		$(document).on('click', imageList + ' img', function () {
                var src = $(this).attr('src');
                mainImage.fadeOut('fast', function () {
        			mainImage.attr('src', src);
                    mainImage.fadeIn('fast');
                });
    		});

    		if ($(imageList + ' div').length) {
    			$.each($(imageList + ' div'), function() {
        			var width = $(this).width();
                    var margin = {
                        x: parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right')),
                        y: parseInt($(this).css('margin-top')) + parseInt($(this).css('margin-bottom')),
                    }

        			imageListWidth.push(width + (margin.x));
        			imageListWidthTotal += width + (margin.x);
                });
            }

            $(imageList).width(imageListWidthTotal + 1);

    		$('.image-overlay').prepend(
    			'<span class="arrow prev-image"><</span>\
    			<span class="arrow next-image">></span>');
            
            $(document).on('click', '.arrow.prev-image', function () {
                if (currentPosition > 0) {
                    currentMargin += imageListWidth[currentPosition - 1];
                    currentPosition -= 1;
                    $(imageList).css('margin-left', currentMargin + 'px');
                }
            });

            $(document).on('click', '.arrow.next-image', function () {
                if (currentPosition < imageListWidth.length - 1) {
                    currentMargin -= imageListWidth[currentPosition];
                    currentPosition += 1;
                    console.log(imageList);
                    $(imageList).css('margin-left', currentMargin + 'px');
                }
            });


    	}

    	$(this).css('cursor', 'zoom-in');
    	$(this).click(function () {

    		$('body').css('overflow-y', 'hidden');

    		var src = $(this).attr('src');

    		$('.zoomed-image').attr('src', src);

        	if (slider) {
        		if ($(imageList + ' div img').length) {
        			$('.zoom-image-content').empty();
        			$.each($(imageList + ' div img'), function() {
        				$('.zoom-image-content').append('<img src="' + $(this).attr('src') +'">')
        			});
        		}

                var sliderZoomHeight = 50;

                if (slider.zoomList.height) {
                    sliderZoomHeight = slider.zoomList.height;
                    $('.zoom-image-content img').height(sliderZoomHeight);
                }

            }
            setTimeout( function() {
                $('.zoom-overlay').addClass('zoom-active');
            }, 0);

            $('.zoom-overlay').css({
                'opacity': '1',
                'visibility': 'visible',
                'overflow-y': 'scroll'
            });

    	});

		$(document).on('click', '.zoomed-image', function () {
        	$('.zoom-overlay').css({
        		'opacity': '0',
        		'overflow-y': 'hidden'
        	});

            $('body').css('overflow-y', 'scroll');

            $('.zoom-overlay').removeClass('zoom-active');

        	setTimeout( function() {
	        	$('.zoom-overlay').css({
	        		'visibility': 'hidden',
	        	});
        	}, 400);
		});

		$(document).on('click', '.zoom-image-content img', function () {
			var src = $(this).attr('src');

            $('.zoomed-image').fadeOut('fast', function () {
                $('.zoomed-image').attr('src', src);
                $('.zoomed-image').fadeIn('fast');
            });

		});

        return this;
    };
})( jQuery );