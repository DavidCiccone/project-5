"use strict";
var locations = [
[
  39.998788, 
  -83.031421, 
  'CrossFit Grandview',
  'crossfit-grandview-columbus'
], 
[
  39.986675, 
  -82.997863, 
  'Ohio Strength - Home of CrossFit Italian Village',
  'ohio-strength-home-of-crossfit-italian-village-columbus'
],
[
  40.032481, 
  -82.999197, 
  'CrossFit Clintonville',
  'crossfit-clintonville-columbus'
],
[
  40.091431, 
  -83.088581, 
  'Friendship Crossfit',
  'friendship-crossfit-dublin'
],
[
  39.964125, 
  -82.991593, 
  '12th Round CrossFit',
  '12th-round-crossfit-columbus'
],
[
  40.159153, 
  -83.083815, 
  'ChalkDust CrossFit',
  'chalkdust-crossfit-powell'
],
[
  40.001887, 
  -82.813766, 
  'Crossfit Future',
  'crossfit-future-blacklick'
],
[
   39.984347, 
  -83.032814, 
  'CrossFit Scioto',
  'crossfit-scioto-columbus'
],
[
  40.141986, 
  -82.963956, 
  'CrossFit Polaris',
  'crossfit-polaris-westerville'
],
[
  40.160504, 
  -83.009983, 
  'Crossfit 1803',
  'crossfit-1803-lewis-center'
]
];
 

//Initiate the map
function viewModel() {
  var self = this;
  var map = null;
  var place = locations;
  var markers = [];

  //initian lat and lng of the map view
   var myLatLng = {lat: 40.052191, lng: -82.984457};

      //applying the map to the HTML file
       map = new google.maps.Map(document.getElementById('map'), {
       zoom: 12,
       center: myLatLng
   });
  
       /*Infowindow has been moved outside of the scope so when a new
         marker is clicked the previous marker infowindow closes.*/
      var infowindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(-1, -31)
      });

      //iterate over the locations in the model and create an new marker for each location
      for(var i = 0; i < place.length; i++){
                //Creates the markers
                var marker = new google.maps.Marker({
                  
                  position: new google.maps.LatLng(place[i][0], place[i][1]),
                  map: map,
                  title: place[i][2],
                  animation: google.maps.Animation.DROP,
                  icon:'images/mapicon.png'
                });
                          
               //fits the markers within the bounds of the viewport on load
               var fitToPage1 = new google.maps.LatLng(40.159153, -83.083815);
               var fitToPage2 = new google.maps.LatLng(39.964754, -82.810993);

               var bounds = new google.maps.LatLngBounds();
                   bounds.extend(fitToPage1);
                   bounds.extend(fitToPage2);
                   map.fitBounds(bounds);

                      // Pushes newly created markers to var markers
                      markers.push(marker);

                       //Function the retrieves the Yelp data starts here
                        var getYelpData = function(yelpContent, content){

                            function nonce_generate() {
                              return (Math.floor(Math.random() * 1e12).toString());
                            }
                            
                            var yelp_url = 'https://api.yelp.com/v2/business/' + yelpContent;

                            var parameters = {
                              oauth_consumer_key: '7H2uLGkdiD0oLvt8kJeJFA',
                              oauth_token: 'n9S5JNeFqoQKTV3iZ591eDd4hiiq08cQ',
                              oauth_nonce: nonce_generate(),
                              oauth_timestamp: Date.now(),
                              oauth_signature_method: 'HMAC-SHA1',
                              oauth_version : '1.0',
                              callback: 'cb'              
                            };

                            var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, 'Xrg10bFRdYiviMOPEorrk8koSN8', '8d65lHm_1wTkzn9p7jJ4RzQ7J-k');
                            parameters.oauth_signature = encodedSignature;

                            var settings = {
                              url: yelp_url,
                              data: parameters,
                              cache: true,                
                              dataType: 'jsonp',
                              //If request is successful the results are puched through the success function
                              success: function(results) {
                                console.log(results);
                                  
                                   //content of each infowindow
                                   var infoWindowContent ='<div id="infowindowframe" style=""><h1><a href="http://www.yelp.com/biz/' + yelpContent + '">' + results.name + '</a>' +'</h1>' + '<div><img src="' + 
                                                           results.rating_img_url + '"></div>' + '<h3>' + results.location.address + 
                                                           '</h3>' + '<div id="placeimage"><img src="' + results.image_url + '"></div>' + '<div id="reviewtext">' + results.snippet_text + '</div></div>';
                               
                                    infowindow.setContent(infoWindowContent);
                                    infowindow.open(map);
                                     
                              },
                              //If request is not successful the error function is execuited
                              error: function(err) {
                                      var error = "No Yelp Information Available :(";
                                      if(err){
                                      infowindow.setContent( '<h1>' + content + '</h1>' + '<h4>' + error + '<h4>');
                                      infowindow.open(map);
                                     
                                      }
                               
                              }
                            };

                                  // Send AJAX query via jQuery library.
                                  $.ajax(settings);
                       };                            
                    //Function that retrieves the Yelp data ends here
                 
                    var content = place[i][2];
                    //Unique yelp URL for each location
                    var yelpContent = place[i][3];
             
                    //Event listiner for infowindows
                    google.maps.event.addListener(marker, 'click', (function(marker,infowindow,yelpContent,content){
                      return function() {
                        infowindow.open(map, this);
                        infowindow.close(map);
                        getYelpData(yelpContent, content);
                     
                      };
                    })(marker,infowindow,yelpContent,content));

                    //click listiner for bounce function
                    marker.addListener('click', toggleBounce);

                            //bounce animation function
                            function toggleBounce() {
                            var self = this;
                              if (self.getAnimation() !== null) {
                                self.setAnimation(null);
                              } else {
                                self.setAnimation(google.maps.Animation.BOUNCE);
                              stopAnimation(self);
                                }
                              }
                          //function that stops the bouncing map marker after 2 bounces
                            function stopAnimation(self) {
                              setTimeout(function(){ 
                                  self.setAnimation(null); }, 1450);
                            }
                      //activates the corresponding map marker on click of the list item 
                       this.clickList = function(markers) {
                       google.maps.event.trigger(markers, 'click');
                       };

                      //if the info window is open and the makrers are filtered this closes the info window 
                      function closeInfoWindow() {
                        infowindow.close();
                      }
                      
                      var search = function() {
                        self.markersArray = ko.observableArray(markers);
                        self.enteredText = ko.observable('');
                       //creates the list of places on the left of the screen and applies a filter based on the entered text
                        self.listSearch = ko.computed(function(){
                          return ko.utils.arrayFilter(self.markersArray(), function(item){
                            return item.title.toLowerCase().indexOf(self.enteredText().toLowerCase()) >= 0;
                          });
                        });

                        //connects the markers to the search box and hides or shows based on its input
                        self.markerFilter = ko.computed(function(){
                          for( var i = 0; i < markers.length; i++){
                            if(markers[i].title.toLowerCase().indexOf(self.enteredText().toLowerCase()) >= 0){
                               markers[i].setVisible(true);
                              //pans to the location of the visible markers
                              map.panTo(myLatLng);
                              //sets the pan zoom level based on the width of the screen
                            if($(window).width() < 725) {
                              map.setZoom(10);
                            } else 
                              {map.setZoom(12);}
                            } 
                              else {
                                markers[i].setVisible(false);
                                //if the infowindow is open when the marker is made invisible it is closed
                                closeInfoWindow();
                              } 
                          }

                        });
      };
                      }
  
  ko.applyBindings(new search());

} 

 