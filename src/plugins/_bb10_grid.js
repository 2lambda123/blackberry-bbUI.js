_bb10_grid = {  
    apply: function(elements) {
		var res = (bb.device.isPlayBook) ? 'lowres' : 'hires',
			solidHeader = false,
			headerJustify;

		// Apply our transforms to all grids
		for (var i = 0; i < elements.length; i++) {
			var j,
				items,
				type,
				title,
				innerChildNode,
				contextMenu,
				outerElement = elements[i];
				
			outerElement.setAttribute('class','bb-bb10-grid-'+res);	
			// See if it is square or landscape layout
			outerElement.isSquare = (outerElement.hasAttribute('data-bb-style') && outerElement.getAttribute('data-bb-style').toLowerCase() == 'square');
			
			// Get our header style
			solidHeader = outerElement.hasAttribute('data-bb-header-style') ? (outerElement.getAttribute('data-bb-header-style').toLowerCase() == 'solid') : false;
			// Get our header justification
			headerJustify = outerElement.hasAttribute('data-bb-header-justify') ? outerElement.getAttribute('data-bb-header-justify').toLowerCase() : 'center';
			
			// Assign our context menu if there is one
			if (outerElement.hasAttribute('data-bb-context') && outerElement.getAttribute('data-bb-context').toLowerCase() == 'true') {
				contextMenu = bb.screen.contextMenu;
			}
			
			// Gather our inner items
			items = outerElement.querySelectorAll('[data-bb-type=group], [data-bb-type=row]');
			for (j = 0; j < items.length; j++) {
				innerChildNode = items[j];
				if (innerChildNode.hasAttribute('data-bb-type')) {
				
					type = innerChildNode.getAttribute('data-bb-type').toLowerCase();
					if (type == 'group' && innerChildNode.hasAttribute('data-bb-title')) {
						title = document.createElement('div');
						title.normal = 'bb-bb10-grid-header-'+res;
						title.innerHTML = '<p>'+ innerChildNode.getAttribute('data-bb-title') +'</p>';
						
						// Style our header for appearance
						if (solidHeader) {
							title.normal = title.normal +' bb10Accent';
							title.style.color = 'white';
							title.style['border-bottom-color'] = 'transparent';
						} else {
							title.normal = title.normal + ' bb-bb10-grid-header-normal-'+bb.screen.listColor;
							title.style['border-bottom-color'] = bb.options.shades.darkOutline;
						}
						
						// Style our header for text justification
						if (headerJustify == 'left') {
							title.normal = title.normal + ' bb-bb10-grid-header-left-'+res;
						} else if (headerJustify == 'right') {
							title.normal = title.normal + ' bb-bb10-grid-header-right-'+res;
						} else {
							title.normal = title.normal + ' bb-bb10-grid-header-center';
						}
						
						title.setAttribute('class', title.normal);
						
						if (innerChildNode.firstChild) {
							innerChildNode.insertBefore(title, innerChildNode.firstChild);
						} else {
							innerChildNode.appendChild(title);
						}
					}
					else if (type == 'row') {
						var k,
							table,
							columnCount = 0,
							tr,
							td,
							numItems,
							itemNode,
							subtitle,
							image,
							overlay,
							subtitle,
							height,
							width,
							hasOverlay,
							hardCodedColumnNum = -1, // none specified
							rowItems = innerChildNode.querySelectorAll('[data-bb-type=item]');
						
						numItems = rowItems.length;
						if (numItems == 0) continue;
						
						// See if they specified the number of items per column
						if (innerChildNode.hasAttribute('data-bb-columns')) {
							hardCodedColumnNum = innerChildNode.getAttribute('data-bb-columns');
						}
						
						table = document.createElement('table');
						table.style.width = '100%';
						innerChildNode.appendChild(table);
						tr = document.createElement('tr');
						table.appendChild(tr);

						// Calculate the width
						if (hardCodedColumnNum > 0) {
							width = (window.innerWidth/hardCodedColumnNum) - 6;
						} else {
							width = (window.innerWidth/numItems) - 6;
						}
							
						for (k = 0; k < numItems; k++) {
							itemNode = rowItems[k];
							
							// Do not show more than the hardcoded number of items
							if ((hardCodedColumnNum > 0) && ((k-1) > hardCodedColumnNum)) {
								itemNode.style.display = 'none';
								continue;
							}
							
							subtitle = itemNode.innerHTML;
							title = itemNode.getAttribute('data-bb-title');
							hasOverlay = (subtitle || title);
							itemNode.innerHTML = '';
							// Add our cell to the table
							td = document.createElement('td');
							tr.appendChild(td);
							td.appendChild(itemNode);
							columnCount++;
							
							// Find out how to size the images
							if (outerElement.isSquare) {
								height = width;
							} else {
								height = Math.ceil(width*0.5625);
							}
							// Set our dimensions
							itemNode.style.width = width + 'px';
							itemNode.style.height = height + 'px';

							// Create our display image
							image = document.createElement('img');
							image.setAttribute('src',itemNode.getAttribute('data-bb-img'));
							image.style.height = height + 'px';
							image.style.width = width + 'px';
							itemNode.image = image;
							itemNode.appendChild(image);
							// Create our translucent overlay
							if (hasOverlay) {
								overlay = document.createElement('div');
								if (title && subtitle) {
									overlay.setAttribute('class','bb-bb10-grid-item-overlay-'+res+ ' bb-bb10-grid-item-overlay-two-rows-'+res);
									overlay.innerHTML = '<div><p class="title title-two-rows">' + title + '<br/>' + subtitle +'</p></div>';	
								} else if (title){
									overlay.setAttribute('class','bb-bb10-grid-item-overlay-'+res+ ' bb-bb10-grid-item-overlay-one-row-'+res);
									overlay.innerHTML = '<div><p class="title title-one-row">' + title + '</p></div>';
								} else if (subtitle) {
									overlay.setAttribute('class','bb-bb10-grid-item-overlay-'+res+ ' bb-bb10-grid-item-overlay-one-row-'+res);
									overlay.innerHTML = '<div><p class="title title-one-row">' + subtitle + '</p></div>';
								}
								itemNode.appendChild(overlay);
							} else {
								overlay = null;
							}
							
							// Setup our variables
							itemNode.overlay = overlay;
							itemNode.title = title;
							itemNode.description = subtitle;
							itemNode.fingerDown = false;
							itemNode.contextShown = false;
							itemNode.contextMenu = contextMenu;
							itemNode.ontouchstart = function() {
														if (this.overlay) {
															this.overlay.style['opacity'] = '1.0';
							                                this.overlay.style['background-color'] = bb.options.highlightColor;
														}
														itemNode.fingerDown = true;
														itemNode.contextShown = false;
														if (itemNode.contextMenu) {
															window.setTimeout(this.touchTimer, 667);
														}
													};
							itemNode.ontouchend = function() {
														if (this.overlay) {
															this.overlay.style['opacity'] = '';
							                                this.overlay.style['background-color'] = '';
														}
														itemNode.fingerDown = false;
														if (itemNode.contextShown) {
															event.preventDefault();
															event.stopPropagation();
														}
													};
							itemNode.touchTimer = function() {
															if (itemNode.fingerDown) {
																itemNode.contextShown = true;
																itemNode.contextMenu.peek({title:this.title,description:this.description, selected: this});
															}
														};
							itemNode.touchTimer = itemNode.touchTimer.bind(itemNode);
						}
						
						// if there were hardcoded columns and not enough items to fit those columns, add the extra columns
						if ((hardCodedColumnNum > 0) && (columnCount < hardCodedColumnNum)) {
							var diff = hardCodedColumnNum - columnCount;
							innerChildNode.extraColumns = [];
							for (k = 0; k < diff; k++) {
								td = document.createElement('td');
								tr.appendChild(td);
								td.style.width = width + 'px';
								innerChildNode.extraColumns.push(td);
							}
						}
					}
				}
			}
			
			// Make sure we move when the orientation of the device changes
			outerElement.orientationChanged = function(event) {
									var items = this.querySelectorAll('[data-bb-type=row]'),
										i,j,
										rowItems,
										row,
										numItems,
										itemNode,
										width,
										height;
				
									for (i = 0; i < items.length; i++) {
										var hardCodedColumnNum = -1;
										row = items[i];
										rowItems = row.querySelectorAll('[data-bb-type=item]');
										numItems = rowItems.length;
										
										// See if they specified the number of items per column
										if (row.hasAttribute('data-bb-columns')) {
											hardCodedColumnNum = row.getAttribute('data-bb-columns');
										}
										
										// Calculate the width
										if (hardCodedColumnNum > 0) {
											width = (window.innerWidth/hardCodedColumnNum) - 6;
										} else {
											width = (window.innerWidth/numItems) - 6;
										}										
										
										// Adjust all the items
										for (j = 0; j < numItems; j++ ) {
											itemNode = rowItems[j];
											if (outerElement.isSquare) {
												height = width;
											} else {
												height = Math.ceil(width*0.5625);
											}
											// Animate our image and container
											itemNode.image.style.height = height+'px';
											itemNode.image.style.width = width + 'px';
											itemNode.image.style['-webkit-transition-property'] = 'all';
											itemNode.image.style['-webkit-transition-duration'] = '0.2s';
											itemNode.image.style['-webkit-transition-timing-function'] = 'linear';
											itemNode.image.style['-webkit-transform'] = 'translate3d(0,0,0)';
											itemNode.style.width = width+'px';
											itemNode.style.height = height+'px';
											itemNode.style['-webkit-transition-property'] = 'all';
											itemNode.style['-webkit-transition-duration'] = '0.2s';
											itemNode.style['-webkit-transition-timing-function'] = 'linear';
											itemNode.style['-webkit-transform'] = 'translate3d(0,0,0)';
										}
										
										// Adjust the extra columns if there was hard coded columns that were not filled
										if (row.extraColumns) {
											for (j = 0; j < row.extraColumns.length;j++) {
												row.extraColumns[j].style.width = width + 'px';
											}
										}
									}
								};
			outerElement.orientationChanged = outerElement.orientationChanged.bind(outerElement);	
			window.addEventListener('resize', outerElement.orientationChanged,false); 
			
			// Add show function
			outerElement.show = function() {
				this.style.display = 'block';
				bb.refresh();
				};
			outerElement.show = outerElement.show.bind(outerElement);

			// Add hide function
			outerElement.hide = function() {
				this.style.display = 'none';
				bb.refresh();
				};
			outerElement.hide = outerElement.hide.bind(outerElement);
	
			// Add remove function
			outerElement.remove = function() {
				this.parentNode.removeChild(this);
				bb.refresh();
				};
			outerElement.remove = outerElement.remove.bind(outerElement);
		}		
    }
};