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
 
//  Define Constants 
var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var API_ACCESS_KEY = 'AIzaSyDJTIlvEzU-B2152hKEyUzBoAJmflJzcjU';

//inputObject contains all the inputs from the User
var viewObject = {};

/**   
  */
$(document).ready(function() {
  console.log("yavin0000");
  $.getScript('https://apis.google.com/js/client.js?onload=handleClientLoad');
  console.log("yavin9999");
});

function handleClientLoad() {
  gapi.client.load('youtube', 'v3', function() {
     console.log("yavin0");
     loadParamsFromURL();
     console.log("yavin1");
     generateVideoViewer();
     console.log("yavin2");
     pullVideoMetaData();
     console.log("yavin3");
     //populateVideoMetaData();
     console.log("yavin4");
  });
}

/**  This function loads parameters from a URL into the input object
 */
function loadParamsFromURL() {
  //retrieve URL from browser window
  var startURL = decodeURIComponent(window.location);
  console.log("StartURL:  " + startURL);
  
  //If the URL does not contain search parameters to parse skip to end of function
  if (startURL && startURL.indexOf('?v=') > 0) {
    //create an array of parameters parsed from URL
    console.log('cutting up start url '+startURL.slice(startURL.indexOf('?v=') + 1));
    var paramListCollection = startURL.slice(startURL.indexOf('?v=') + 1).split("&");

    //define the urlParams array
    var urlParams = {};
    for (var i = 0; i < paramListCollection.length; i++) {
      //parse the individual parameters and values into a temporary array
      console.log('paramListCollection['+i+'] is '+ paramListCollection[i] + '.');
      var individualParamCollection = paramListCollection[i].split("=");
      console.log('individualParamCollection[0] is '+individualParamCollection[0]+'.');
      console.log('individualParamCollection[1] is '+individualParamCollection[1]+'.');

      //store the URL parameter/value pairs into the urlParams array
      urlParams[individualParamCollection[0]] = individualParamCollection[1];
    }
  }else{
     console.log("no video id");
  }
  //start loading inputObject from the URL parameters
  viewObject.inputVideoID = urlParams['v'];
  console.log("viewObject.inputVideoID:  " + viewObject.inputVideoID);
}

/**
 */ 
function generateVideoViewer(){
    console.log("donkey balls 1");
    var div = $('<div>');
    div.addClass('videoPlayer');
    var embeddedVideoPlayer = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+viewObject.inputVideoID+'" frameborder="0" allowfullscreen></iframe>');	
    $('#videoPlayer').append(embeddedVideoPlayer);
    console.log("donkey balls 2");
}

function pullVideoMetaData(){
      console.log("zebra1")
   
      //generate request object for video search
      var videoIDRequest = gapi.client.youtube.videos.list({
        id: viewObject.inputVideoID,
        part: 'id,snippet',
        key: API_ACCESS_KEY
      });
      console.log("zebra2")

      //execute request and process the response object to pull in latitude and longitude
      videoIDRequest.execute(function(response) {
        if ('error' in response || !response) {
          showConnectivityError();
        } else {
          console.log("zebbie start");
          $.each(response.items, function(index, item) {
             viewObject.title = item.snippet.title;
             console.log('viewObject.title is' + viewObject.title);
             viewObject.channelID = item.snippet.channelId;
             console.log('viewObject.channelID is + viewObject.channelID)
             viewObject.channel = item.snippet.channelTitle;
             console.log('viewObject.channel is' + viewObject.channel);
             viewObject.thumbnailURL = item..snippet.thumbnails.default.url;
             console.log('viewObject.thumbnailURL is' + viewObject.thumbnailURL);
             viewObject.description = item.snippet.description;
             console.log('viewObject.description is' + viewObject.description);
             var year = item..snippet.publishedAt.substr(0, 4);
             var monthNumeric = item.snippet.publishedAt.substr(5, 2);
             var monthInt = 0;
             
             if (monthNumeric.indexOf("0") === 0) {
                 monthInt = monthNumeric.substr(1, 1);
             } else {
                 monthInt = monthNumeric;
             }
             var day = item.snippet.publishedAt.substr(8, 2);
             var time = item..snippet.publishedAt.substr(11, 8);
             
             var monthString = MONTH_NAMES[monthInt - 1];
             
             viewObject.displayTimeStamp = monthString + " " + day + ", " + year + " - " + time + " UTC";
             console.log('viewObject.displayTimeStamp is' + viewObject.displayTimeStamp);
             viewObject.publishTimeStamp = item.snippet.publishedAt;
             console.log('viewObject.publishTimeStamp is' + viewObject.publishTimeStamp);
        /*   
        videoResult.videoId = entryArr[i].id.videoId;
        videoIDString = videoIDString + videoResult.videoId + ",";

        videoResult.url = "https://www.youtube.com/watch?v=" + videoResult.videoId;
        videoResult.channelID = entryArr[i].snippet.channelId;
        videoResult.channel = entryArr[i].snippet.channelTitle;
        videoResult.liveBroadcastContent = entryArr[i].snippet.liveBroadcastContent;
        videoResult.thumbNailURL = entryArr[i].snippet.thumbnails.default.url;
        videoResult.description = entryArr[i].snippet.description;

        var year = entryArr[i].snippet.publishedAt.substr(0, 4);
        var monthNumeric = entryArr[i].snippet.publishedAt.substr(5, 2);
        var monthInt = 0;

        if (monthNumeric.indexOf("0") === 0) {
          monthInt = monthNumeric.substr(1, 1);
        } else {
          monthInt = monthNumeric;
        }
        var day = entryArr[i].snippet.publishedAt.substr(8, 2);
        var time = entryArr[i].snippet.publishedAt.substr(11, 8);

        var monthString = MONTH_NAMES[monthInt - 1];

        videoResult.displayTimeStamp = monthString + " " + day + ", " + year + " - " + time + " UTC";
        videoResult.publishTimeStamp = entryArr[i].snippet.publishedAt;
        */   
           
           console.log("zebbie end");

        }
      }
    
}
/**  This function displays a connectivity error to the end user in the event
 *  that we lose connectivity to one or more of the Google APIs
 */
function showConnectivityError() {
  var div = $('<div>');
  div.addClass('showErrors');
  div.append("Error connecting to Google APIs");

  $('#showErrorsContainer').empty();
  $('#showErrorsContainer').append(div);
  showErrorSection();
}

function showErrorSection() {
  $("#showErrors").show();
}
