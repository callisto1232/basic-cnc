	var locations = [
	
[ "<div class='map-caption'><div class='frame'><a href='#'><img src='../images/pin1.png' alt='img'></a></div><div class='text-box'><div class='top-row'><h3>Donation For a School 1</h3><div class='map-progress'><div class='progress'><div class='bar' style='width: 60%;'></div></div><strong class='title'>$2385 Collected of $10000</strong> </div></div><div class='mid-row'> <strong class='title'>Donate Now:</strong> <span>UAN: 0800-222-3333</span> <span>Bank Details: HSBC</span> <span>Account No: 34256-8976</span> </div><div class='bottom-row'><ul><li><a href='#'>Directions</a></li><li><a href='#'>Nearby</a></li><li><a href='#'>Call for Support</a></li></ul></div></div></div>" , 43.5132101,13.2302635],  
[ "<div class='map-caption'><div class='frame'><a href='#'><img src='../images/pin1.png' alt='img'></a></div><div class='text-box'><div class='top-row'><h3>Donation For a School 2</h3><div class='map-progress'><div class='progress'><div class='bar' style='width: 60%;'></div></div><strong class='title'>$2385 Collected of $10000</strong> </div></div><div class='mid-row'> <strong class='title'>Donate Now:</strong> <span>UAN: 0800-222-3333</span> <span>Bank Details: HSBC</span> <span>Account No: 34256-8976</span> </div><div class='bottom-row'><ul><li><a href='#'>Directions</a></li><li><a href='#'>Nearby</a></li><li><a href='#'>Call for Support</a></li></ul></div></div></div>" , 42.5132101,100.2302635],  
[ "<div class='map-caption'><div class='frame'><a href='#'><img src='../images/pin1.png' alt='img'></a></div><div class='text-box'><div class='top-row'><h3>Donation For a School 3</h3><div class='map-progress'><div class='progress'><div class='bar' style='width: 60%;'></div></div><strong class='title'>$2385 Collected of $10000</strong> </div></div><div class='mid-row'> <strong class='title'>Donate Now:</strong> <span>UAN: 0800-222-3333</span> <span>Bank Details: HSBC</span> <span>Account No: 34256-8976</span> </div><div class='bottom-row'><ul><li><a href='#'>Directions</a></li><li><a href='#'>Nearby</a></li><li><a href='#'>Call for Support</a></li></ul></div></div></div>" , 23.5132101,93.2302635],  
[ "<div class='map-caption'><div class='frame'><a href='#'><img src='../images/pin1.png' alt='img'></a></div><div class='text-box'><div class='top-row'><h3>Donation For a School 4</h3><div class='map-progress'><div class='progress'><div class='bar' style='width: 60%;'></div></div><strong class='title'>$2385 Collected of $10000</strong> </div></div><div class='mid-row'> <strong class='title'>Donate Now:</strong> <span>UAN: 0800-222-3333</span> <span>Bank Details: HSBC</span> <span>Account No: 34256-8976</span> </div><div class='bottom-row'><ul><li><a href='#'>Directions</a></li><li><a href='#'>Nearby</a></li><li><a href='#'>Call for Support</a></li></ul></div></div></div>" , 15.5132101,35.2302635],
[ "<div class='map-caption'><div class='frame'><a href='#'><img src='../images/pin1.png' alt='img'></a></div><div class='text-box'><div class='top-row'><h3>Donation For a School 3</h3><div class='map-progress'><div class='progress'><div class='bar' style='width: 60%;'></div></div><strong class='title'>$2385 Collected of $10000</strong> </div></div><div class='mid-row'> <strong class='title'>Donate Now:</strong> <span>UAN: 0800-222-3333</span> <span>Bank Details: HSBC</span> <span>Account No: 34256-8976</span> </div><div class='bottom-row'><ul><li><a href='#'>Directions</a></li><li><a href='#'>Nearby</a></li><li><a href='#'>Call for Support</a></li></ul></div></div></div>" , 13.5132101,123.2302635],  
[ "<div class='map-caption'><div class='frame'><a href='#'><img src='../images/pin1.png' alt='img'></a></div><div class='text-box'><div class='top-row'><h3>Donation For a School 4</h3><div class='map-progress'><div class='progress'><div class='bar' style='width: 60%;'></div></div><strong class='title'>$2385 Collected of $10000</strong> </div></div><div class='mid-row'> <strong class='title'>Donate Now:</strong> <span>UAN: 0800-222-3333</span> <span>Bank Details: HSBC</span> <span>Account No: 34256-8976</span> </div><div class='bottom-row'><ul><li><a href='#'>Directions</a></li><li><a href='#'>Nearby</a></li><li><a href='#'>Call for Support</a></li></ul></div></div></div>" , 12.5132101,77.2302635],	    
     	
	];
	// Setup the different icons and shadows
	var iconURLPrefix = 'images';
	var icons = [
				'images/pin1.png', 
				'images/pin1.png', 
				'images/pin1.png', 
				'images/map-icon-2.png', 
				'images/map-icon-2.png', 
				'images/map-icon-2.png', 
							
			];

	var icons_length = icons.length;
	var shadow = {
	  anchor: new google.maps.Point(16,16),
	  url: iconURLPrefix + 'msmarker.shadow.png'
	};

	var myOptions = {
	  center: new google.maps.LatLng(16,18),
	  mapTypeId: 'roadmap',
	  mapTypeControl: true,
	  streetViewControl: true,
	  panControl: true,
	  scrollwheel: false,
	  draggable: true,
	  
					  
	 styles: [{
			stylers: [{
				hue: '#000000'
			}, {
				saturation: -300                        }, {
				lightness: 1                        }]
		}],
		
					
	   zoom: 3,
	}
	
	var map = new google.maps.Map(document.getElementById("map_list"), myOptions);
	var infowindow = new google.maps.InfoWindow({
	  maxWidth: 350,
	});
	var marker;
	var markers = new Array();
	var iconCounter = 0;

	// Add the markers and infowindows to the map
	for (var i = 0; i < locations.length; i++) {  
	  marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		map: map,
		icon : icons[iconCounter],
		shadow: shadow
	  });

	  markers.push(marker);
	  google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
		  infowindow.setContent(locations[i][0]);
		  infowindow.open(map, marker);
		}
	  })(marker, i));
	  
	  iconCounter++;
	  // We only have a limited number of possible icon colors, so we may have to restart the counter
	  if(iconCounter >= icons_length){
		iconCounter = 0;
	  }
	}