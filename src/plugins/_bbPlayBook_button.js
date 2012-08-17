_bbPlayBook_button = { 
    apply: function(elements) {
		for (var i = 0; i < elements.length; i++) {
			var outerElement = elements[i],
				disabledStyle,
				imgSrc,
				caption,
				imgElement,
				captionElement = document.createElement('div'),
				innerElement = document.createElement('div');
				disabled = outerElement.hasAttribute('data-bb-disabled'),
				normal = 'bb-pb-button',
				highlight = 'bb-pb-button-container pb-button-'+bb.screen.controlColor+'-highlight';
				outerNormal = 'bb-pb-button-container bb-pb-button-container-' + bb.screen.controlColor,
				outerNormalWithoutImageOnly = outerNormal;
				
			outerElement.isImageOnly = false;
			outerElement.enabled = !disabled;
			caption = outerElement.innerHTML;
			captionElement.innerHTML = caption;
			outerElement.innerHTML = '';
			outerElement.captionElement = captionElement;
			outerElement.appendChild(innerElement);
			outerElement.innerElement = innerElement;
			
			if (outerElement.hasAttribute('data-bb-style')) {
				var style = outerElement.getAttribute('data-bb-style');
				if (style == 'stretch') {
					outerNormal = outerNormal + ' bb-pb-button-stretch';
					highlight = highlight + ' bb-pb-button-stretch';
				}
			}
			// look for our image
			imgSrc = outerElement.hasAttribute('data-bb-img') ? outerElement.getAttribute('data-bb-img') : undefined;
			if (imgSrc) {
				if (!caption || caption.length == 0) {
					outerNormal = outerNormal + ' bb-pb-button-container-image-only';
					highlight = highlight + ' bb-pb-button-container-image-only';
					captionElement.style['background-image'] = 'url("'+imgSrc+'")';
					outerElement.style['line-height'] = '0px';
					captionElement.setAttribute('class','bb-pb-button-caption-with-image-only');
					outerElement.isImageOnly = true;
				} else {
					// Configure our caption element
					captionElement.setAttribute('class','bb-pb-button-caption-with-image');
					imgElement = document.createElement('div');
					outerElement.imgElement = imgElement;
					imgElement.setAttribute('class','bb-pb-button-image');
					imgElement.style['background-image'] = 'url("'+imgSrc+'")';
					innerElement.appendChild(imgElement);
				}
			}
			// Insert caption after determining what to do with the image
			innerElement.appendChild(captionElement);
		
			// Set our styles
			disabledStyle = normal + ' bb-pb-button-disabled-'+bb.screen.controlColor;
			normal = normal + ' bb-pb-button-' + bb.screen.controlColor;
			
			if (disabled) {
				outerElement.removeAttribute('data-bb-disabled');
				innerElement.setAttribute('class',disabledStyle);
			} else {
				innerElement.setAttribute('class',normal);
			}
			// Set our variables on the elements
			outerElement.setAttribute('class',outerNormal);
			outerElement.outerNormal = outerNormal;
			outerElement.highlight = highlight;
			outerElement.outerNormalWithoutImageOnly = outerNormalWithoutImageOnly;
			outerElement.innerElement = innerElement;
			innerElement.normal = normal;
			innerElement.disabledStyle = disabledStyle;
			if (!disabled) {
				outerElement.ontouchstart = function() {
										this.setAttribute('class', /*this.outerNormal +*/ this.highlight);
									};
				outerElement.ontouchend = function() {
										this.setAttribute('class', this.outerNormal);
										this.style.color = '';
									};
			}
							
			// Trap the click and call it only if the button is enabled
			outerElement.trappedClick = outerElement.onclick;
			outerElement.onclick = undefined;
			if (outerElement.trappedClick !== null) {
				outerElement.addEventListener('click',function (e) {
						if (this.enabled) {
							this.trappedClick();
						}
					},false);
			}
			
			// Assign our set caption function
			outerElement.setCaption = function(value) {
					if (this.isImageOnly && (value.length > 0)) {
						// Configure our caption element
						this.captionElement.setAttribute('class','bb-pb-button-caption-with-image');
						var imgElement = document.createElement('div');
						this.imgElement = imgElement;
						imgElement.setAttribute('class','bb-pb-button-image');
						imgElement.style['background-image'] = this.captionElement.style['background-image'];
						// Remove and re-order the caption element
						this.innerElement.removeChild(this.captionElement);
						this.innerElement.appendChild(imgElement);
						this.innerElement.appendChild(this.captionElement);
						// Reset our image only styling
						this.setAttribute('class',this.outerNormalWithoutImageOnly);
						this.captionElement.style['background-image'] = '';
						this.isImageOnly = false;
					} else if ((value.length == 0) && this.imgElement) {
						this.captionElement.setAttribute('class','bb-pb-button-caption-with-image-only');
						// Reset our image only styling
						this.setAttribute('class',this.outerNormalWithoutImageOnly + ' bb-pb-button-container-image-only');
						this.captionElement.style['background-image'] = this.imgElement.style['background-image'];
						this.isImageOnly = true;
						// Remove the image div
						this.innerElement.removeChild(this.imgElement);
						this.imgElement = null;
					}
					this.captionElement.innerHTML = value;
				};
				
			// Assign our set image function
			outerElement.setImage = function(value) {
					if (this.isImageOnly) {
						this.captionElement.style['background-image'] = 'url("'+value+'")';
					} else if (this.imgElement && (value.length > 0)) {
						this.imgElement.style['background-image'] = 'url("'+value+'")';
					} else if (value.length > 0){
						// Configure our caption element
						this.captionElement.setAttribute('class','bb-pb-button-caption-with-image');
						var imgElement = document.createElement('div');
						this.imgElement = imgElement;
						imgElement.setAttribute('class','bb-pb-button-image');
						imgElement.style['background-image'] = 'url("'+value+'")';
						// Remove and re-order the caption element
						this.innerElement.removeChild(this.captionElement);
						this.innerElement.appendChild(imgElement);
						this.innerElement.appendChild(this.captionElement);
					} else if (this.imgElement && (value.length == 0)){
						// Supplied an empty image value
						this.innerElement.removeChild(this.imgElement);
						this.imgElement = null;
						this.captionElement.setAttribute('class','');
					}
				};
			
			// Assign our enable function
			outerElement.enable = function(){ 
					if (this.enabled) return;
					this.innerElement.setAttribute('class', this.innerElement.normal);
					this.ontouchstart = function() {
										this.innerElement.setAttribute('class', this.innerElement.highlight);
										
									};
					this.ontouchend = function() {
										this.innerElement.setAttribute('class', this.innerElement.normal);
									};
					this.enabled = true;
				};
			// Assign our disable function
			outerElement.disable = function(){ 
					if (!this.enabled) return;
					this.innerElement.setAttribute('class', this.innerElement.disabledStyle);
					this.ontouchstart = null;
					this.ontouchend = null;
					this.enabled = false;
				};
		}
    }
};
