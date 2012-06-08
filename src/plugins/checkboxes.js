bb.checkbox = {

	apply: function(elements) {
	
		if (bb.device.isBB10) {
			var i,
				input,
				touchTarget, 
				outerElement,
				innerElement,
				checkElement,
				res = (bb.device.isPlayBook) ? 'lowres' : 'hires',
				color = bb.options.bb10ControlsDark ? 'dark' : 'light';
				
				
			
			for (i = 0; i < elements.length; i++) {
				input = elements[i];
				// Outside touch target
				touchTarget = document.createElement('div');
				touchTarget.setAttribute('class','bb-bb10-checkbox-target-'+res);
				input.parentNode.insertBefore(touchTarget, input);
				input.style.display = 'none';
				touchTarget.appendChild(input);
				touchTarget.input = input;
				// Main outer border of the control
				outerElement = document.createElement('div');
				outerElement.setAttribute('class', 'bb-bb10-checkbox-outer-'+res+' bb-bb10-checkbox-outer-'+color);
				touchTarget.appendChild(outerElement);
				// Inner check area
				innerElement = document.createElement('div');
				innerElement.normal = 'bb-bb10-checkbox-inner-'+res+' bb-bb10-checkbox-inner-'+color;
				innerElement.setAttribute('class', innerElement.normal);
				outerElement.appendChild(innerElement);
				// Create our check element with the image
				checkElement = document.createElement('div');
				checkElement.hiddenClass = 'bb-bb10-checkbox-check-hidden-'+res+' bb-bb10-checkbox-check-image';
				checkElement.displayClass = 'bb-bb10-checkbox-check-display-'+res+' bb-bb10-checkbox-check-image';
				checkElement.setAttribute('class',checkElement.hiddenClass);
				checkElement.style['-webkit-transition-property'] = 'all';
				checkElement.style['-webkit-transition-duration'] = '0.1s';
				innerElement.appendChild(checkElement);
				touchTarget.checkElement = checkElement;
				
				// Set our coloring for later
				touchTarget.innerElement = innerElement;
				touchTarget.highlight = '-webkit-linear-gradient(top,  rgb('+ (bb.options.shades.R + 32) +', '+ (bb.options.shades.G + 32) +', '+ (bb.options.shades.B + 32) +') 0%, rgb('+ bb.options.shades.R +', '+ bb.options.shades.G +', '+ bb.options.shades.B +') 100%)';
				touchTarget.touchHighlight = '-webkit-linear-gradient(top,  rgba('+ (bb.options.shades.R - 64) +', '+ (bb.options.shades.G - 64) +', '+ (bb.options.shades.B - 64) +',0.25) 0%, rgba('+ bb.options.shades.R +', '+ bb.options.shades.G +', '+ bb.options.shades.B +',0.25) 100%)';

				touchTarget.ontouchstart = function() {
								if (!this.input.checked) {	
									// Do our touch highlight
									this.innerElement.style.background = this.touchHighlight;
								}
							};
				touchTarget.ontouchend = function() {
								if (!this.input.checked) {
									this.innerElement.style.background = '';
								}
							};
				touchTarget.onclick = function() {
								var evObj = document.createEvent('HTMLEvents');
								evObj.initEvent('change', false, true );
								// Set our checked state
								this.input.checked = !this.input.checked;
								this.drawChecked();
								this.input.dispatchEvent(evObj);
							};
							
				touchTarget.drawChecked = function() {
								if (this.input.checked) {
									this.checkElement.setAttribute('class',this.checkElement.displayClass);
									this.innerElement.style['background-image'] = touchTarget.highlight;
								} else {
									this.checkElement.setAttribute('class',this.checkElement.hiddenClass);
									this.innerElement.style['background-image'] = '';
								}				
							};
				touchTarget.drawChecked = touchTarget.drawChecked.bind(touchTarget);
				
				// Set our initial state
				touchTarget.drawChecked();
			}
		}	
	}
};