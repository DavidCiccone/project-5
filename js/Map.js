"use strict";
var locations = [
[
  39.998788, 
  -83.031421, 
  'CrossFit Grandview',
  'crossfit-grandview-columbus'
], 
[
   39.984347, 
  -83.032814, 
  'CrossFit Scioto',
  'the-fitness-loft-columbus'
],
[
  39.986675, 
  -82.997863, 
  'Ohio Strength - Home of CrossFit Italian Village',
  'ohio-strength-home-of-crossfit-italian-village-columbus'
],
[
  39.964125, 
  -82.991593, 
  '12th Round CrossFit',
  'snap-fitness-columbus-3'
],
[
  40.032481, 
  -82.999197, 
  'CrossFit Clintonville',
  'crossfit-clintonville-columbus'
],
]


  var map;
  
//Initiate the map
function initMap() {
  var self = this;
  self.yelpStars = [];
  self.place = locations;
  self.markers = [];
  self.yelp_Id = [];

  self.imgStars = [];
  self.addresses =[];
//initian lat and lng of the map view
 var myLatLng = {lat: 40.001451, lng: -83.017459};

//applying the map to the HTML file
     map = new google.maps.Map(document.getElementById('map'), {
     zoom: 13,
     center: myLatLng
  });
  

/*Infowindow has been moved outside of the scope so when a new
marker is clicked the previous marker infowindow closes.*/
  var infowindow = new google.maps.InfoWindow();

//iterate over the locations in the model and create an new marker for each location
for(var i = 0; i < place.length; i++){
  
    var marker = new google.maps.Marker({
      
      position: new google.maps.LatLng(place[i][0], place[i][1]),
      map: map,
      title: place[i][2],
      animation: google.maps.Animation.DROP
      

    });



    // Pushes newly created markers to var markers
     markers.push(marker);

    //Pushs the Yelp ID to variable yelp_ID
    yelp_Id.push(place[i][3]);

 //Generates a random number and returns it as a string for OAuthentication
    function nonce_generate() {
      return (Math.floor(Math.random() * 1e12).toString());
    }


    var yelp_url = 'https://api.yelp.com/v2/business/' + yelp_Id[i];

    var parameters = {
      oauth_consumer_key: 'Key',
      oauth_token: 'Key',
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now()/1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version : '1.0',
      callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, 'Key', 'Key');
    parameters.oauth_signature = encodedSignature;

    var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
      dataType: 'jsonp',
      
      success: function(results) {
  console.log(results);
            for(var i = 0; i < length; i++){
                self.yelpStars.push(results.rating_img_url_small);
                 
             }
            
            for(var i = 0; i < yelpStars.length; i++){
                self.starRating = '<img src=' + yelpStars[i] + '>';

             }
                  
                  //self.addresses.push(results.location.display_address);
            imgStars.push(starRating);

                },
      error: function(error) {
              console.log(error);
          //TODO: fix error function
              /*    self.noStar = "images/nostar.png";
                  self.addressError = "No Address Available"
            if(error){
                    
                    self.yelpObjects.push(self.noStar);
                    self.addresses.push(self.addressError);
                  }*/
      }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);


            //content of the marker window
            self.content = place[i][2];
            self.img = imgStars;

            //Event listiner for infowindow which adds title and star rating
            google.maps.event.addListener(marker, 'click', (function(marker,content,infowindow,img){
              return function() {
                infowindow.setContent(content + img);
                infowindow.open(map, this);

              };
            })(marker,content,infowindow,img));


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
                    }

                  //function that stops the bouncing map marker after 2 bounces
                    function stopAnimation(self) {
                      setTimeout(function(){ 
                          self.setAnimation(null); }, 1450);
                    }


  //filters locations based on search box input
  var search = function() {
    var self = this;

      //Observable array for the markers
      self.markersArray = ko.observableArray(markers);
      //Observable for the search input
      self.enteredText = ko.observable('');
      //Observable array for the addresses
      //self.address = ko.observableArray(addresses);

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
                } 
                  else {
                    markers[i].setVisible(false); 
                  } 
              }

            });


 };


ko.applyBindings(new search());


};

     //activates the corresponding map marker on click of the list item 
     function clickList(markers) {
     google.maps.event.trigger(markers, 'click');
     }



