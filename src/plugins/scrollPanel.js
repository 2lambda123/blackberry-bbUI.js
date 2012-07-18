bb.scrollPanel = {
	apply: function(elements) {
		var i,j,
			outerElement,
			childNode,
			scrollArea,
			tempHolder;
		
		for (i = 0; i < elements.length; i++) {
			outerElement = elements[i];
			tempHolder = [];
			
			if (bb.device.isBB10 || bb.device.isPlayBook) {				
				// Inner Scroll Area
				scrollArea = document.createElement('div');
				outerElement.appendChild(scrollArea); 
				
				// Copy all nodes in the screen that are not the action bar
				for (j = 0; j < outerElement.childNodes.length - 1; j++) {
					tempHolder.push(outerElement.childNodes[j]);
				}
				// Add them into the scrollable area
				for (j = 0; j < tempHolder.length -1; j++) {
					scrollArea.appendChild(tempHolder[j]);
				}

				outerElement.scroller = new iScroll(outerElement, {vScrollbar: true,hideScrollbar:true,fadeScrollbar:true,
									onBeforeScrollStart: function (e) {
										if (bb.scroller) {
											bb.scroller.disable();
										}
										e.preventDefault();
									}, 
									onBeforeScrollEnd: function(e) {
										if (bb.scroller) {
											bb.scroller.enable();
										}
									}});
				
				// Set refresh
				outerElement.refresh = function() {
						this.scroller.refresh();
					};
				outerElement.refresh = outerElement.refresh.bind(outerElement);
				setTimeout(outerElement.refresh,0);
				// Set ScrollTo
				outerElement.scrollTo = function(x, y, time, relative) {
						this.scroller.scrollTo(x, y, time, relative);
					};
				outerElement.scrollTo = outerElement.scrollTo.bind(outerElement);
				// Set ScrollToElement
				outerElement.scrollToElement = function(element, time) {
						this.scroller.scrollToElement(element, time);
					};
				outerElement.scrollToElement = outerElement.scrollToElement.bind(outerElement);
				
			} 
			outerElement.setAttribute('class','bb-scroll-panel');
		}
	}
	
};
