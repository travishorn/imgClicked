function imgClicked(pageX, pageY) {
	var highestZIndex = -1;
	var highestElement = null;
	
	var clickedImages = imagesAt(pageX, pageY);
	
	clickedImages.each(function(){
		var self = $(this);
		var img = new Image();
		img.src = self.attr('src');
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		var imgData = ctx.getImageData(0, 0, img.width, img.height);
		imgClickX = pageX - self.offset().left;
		imgClickY = pageY - self.offset().top;
		
		if (imgData.data[(imgClickX*img.width+imgClickY)*4+3] != 0) {
			if (self.css('z-index') > highestZIndex) {
				highestElement = self;
			}
		}
	});
	
	return highestElement;
}

function imagesAt(x, y){
	var $images = $('img').map(function(){
		var $this = $(this);
		var offset = $this.offset();
		var l = offset.left;
		var t = offset.top;
		var h = $this.height();
		var w = $this.width();

		var maxx = l + w;
		var maxy = t + h;

		return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? $this : null;
	});

	return $images;
}