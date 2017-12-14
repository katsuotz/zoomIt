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
    			mainImage.attr('src', $(this).attr('src'));
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
        			console.log(currentMargin);
        			$(imageList).css('margin-left', currentMargin + 'px');
	        		console.log(currentPosition);
    			}
    		});

    		$(document).on('click', '.arrow.next-image', function () {
    			if (currentPosition < imageListWidth.length - 1) {
        			currentMargin -= imageListWidth[currentPosition];
        			currentPosition += 1;
        			console.log(currentMargin);
        			$(imageList).css('margin-left', currentMargin + 'px');
	        		console.log(currentPosition);
    			}
    		});

    		$('.image-overlay').prepend(
    			'<img src="arrow-left.png" class="arrow prev-image">\
    			<img src="arrow-right.png" class="arrow next-image">');

    	}

    	$(this).css('cursor', 'zoom-in');
    	$(this).click(function () {

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

        	$('.zoomed-image').css({
        		'cursor': 'zoom-out'
        	});

        	$('.zoom-overlay').css({
        		'opacity': '1',
        		'visibility': 'visible',
        	});
    	});

		$(document).on('click', '.zoomed-image', function () {
        	$('.zoomed-image').css({
        		'cursor': 'default'
        	});

        	$('.zoom-overlay').css({
        		'opacity': '0',
        	});

        	setTimeout( function() {
	        	$('.zoom-overlay').css({
	        		'visibility': 'hidden',
	        	});
        	}, 400);
		});

		$(document).on('click', '.zoom-image-content img', function () {
			var src = $(this).attr('src');

        	$('.zoomed-image').attr('src', src);

		});

        return this;
    };
})( jQuery );