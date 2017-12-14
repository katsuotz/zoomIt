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

    		$(imageList).wrap('<div class="image-overlay"><div class="image-slider"></div></div>');

    		if (slider.width) {
    			$('.image-overlay').width(slider.width);
    		}

    		$(document).on('click', imageList + ' img', function () {
                var src = $(this).attr('src');
                mainImage.fadeOut('fast', function () {
        			mainImage.attr('src', src);
                    mainImage.fadeIn('fast');
                });
    		});

    		if ($(imageList + ' img').length) {
    			$.each($(imageList + ' img'), function() {
        			var width = $(this).width();
        			imageListWidth.push(width);
        			imageListWidthTotal += width;
        		});
    		}

    		$(imageList).css('width', imageListWidthTotal);

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
        			$(imageList).css('margin-left', currentMargin + 'px');
    			}
    		});

    		$('.image-overlay').prepend(
    			'<span class="arrow prev-image"><</span>\
    			<span class="arrow next-image">></span>');

    	}

    	$(this).css('cursor', 'zoom-in');
    	$(this).click(function () {

    		$('body').css('overflow-y', 'hidden');

    		var src = $(this).attr('src');

    		$('.zoomed-image').attr('src', src);

        	if (slider) {
        		if ($(imageList + ' img').length) {
        			$('.zoom-image-content').empty();
        			$.each($(imageList + ' img'), function() {
        				$('.zoom-image-content').append('<img src="' + $(this).attr('src') +'">')
        			});
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

            setTimeout( function() {
                $('.zoom-overlay').removeClass('zoom-active');
            }, 0);		

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