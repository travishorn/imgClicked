function imgClicked(pageX, pageY) {
	var highestZIndex  = -1,
        highestElement = null,
        clickedImages  = imagesAt(pageX, pageY);
	
	clickedImages.each(function(){
		var self   = $(this),
            img    = new Image(),
            canvas = document.createElement('canvas'),
            ctx    = canvas.getContext('2d'),
            imgData,
            imgClickX,
            imgClickY;
        
        img.src       = self.attr('src');
		canvas.width  = img.width;
		canvas.height = img.height;
        
		ctx.drawImage(img, 0, 0);
        
		imgData   = ctx.getImageData(0, 0, img.width, img.height);
		imgClickX = pageX - self.offset().left;
		imgClickY = pageY - self.offset().top;
		
		if (imgData.data[(imgClickX*img.width+imgClickY)*4+3] !== 0) {
			if (self.css('z-index') > highestZIndex) {
				highestElement = self;
			}
		}
	});
	
	return highestElement;
}

function imagesAt(x, y){
	var $images = $('img').map(function(){
		var $this  = $(this),
            offset = $this.offset(),
            l      = offset.left,
            t      = offset.top,
            h      = $this.height(),
            w      = $this.width(),
            maxx   = l + w,
            maxy   = t + h;

		return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? $this : null;
	});

	return $images;
}