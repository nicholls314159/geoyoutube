/**
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *  @fileoverview  This code is an example implementation of how to implement YouTube geo-search
 *  and search filters via established APIs.  The application itself is directed toward the use
 *  case of journalists trying to discover citizen journalism on YouTube.   It integrates with the Google Maps API to plot
 *  the upload location of geo-tagged video results.
 *  @author:  Stephen Nicholls, May 9, 2016
 */


//inputObject contains all the inputs from the User
var viewObject = {};

/**   
  */
$(document).ready(function() {
  console.log("Yipppppppppppeeeeeeee0");
  loadParamsFromURL();
  console.log("Yipppppppppppeeeeeeee1");
  //generateVideoViewer();
  console.log("Yipppppppppppeeeeeeee2");
});


/**  This function loads parameters from a URL into the input object
 */
function loadParamsFromURL() {
  //retrieve URL from browser window
  var startURL = decodeURIComponent(window.location);
  console.log("StartURL:  " + startURL);
  
  //If the URL does not contain search parameters to parse skip to end of function
  if (startURL && startURL.indexOf('?v=') > 0) {
    //create an array of parameters parsed from URL
    var paramListCollection = startURL.slice(startURL.indexOf('?v=') + 1).split("&");

    //define the urlParams array
    var urlParams = {};
    for (var i = 0; i < paramListCollection.length; i++) {
      //parse the individual parameters and values into a temporary array
      var individualParamCollection = paramListCollection[i].split("=");

      //store the URL parameter/value pairs into the urlParams array
      urlParams[individualParamCollection[0]] = individualParamCollection[1];
    }else{
     console.log("no video id")
    }
}
/*
    //start loading inputObject from the URL parameters
    viewObject.inputVideoID = urlParams['v'];
    console.log("viewObject.inputVideoID:  " + viewObject.inputVideoID);
}
*/
/**
function generateVideoViewer(){
    console.log("donkey balls 1");
    var div = $('<div>');
    div.addClass('videoPlayer');
    var embeddedVideoPlayer = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+viewObject.inputVideoID+'" frameborder="0" allowfullscreen></iframe>');	
    $('#videoPlayer').append(embeddedVideoPlayer);
    console.log("donkey balls 2");
}
*/


