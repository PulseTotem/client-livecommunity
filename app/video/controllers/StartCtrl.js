'use strict';

/**
 * @ngdoc function
 * @name PulseTotemVideo.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the PulseTotemVideo
 */
angular.module('PulseTotemVideo')
  .controller('PulseTotemVideo.StartCtrl', ['$rootScope', '$scope', '$timeout', 'CONSTANTS', 'Upload', function ($rootScope, $scope, $timeout, CONSTANTS, Upload) {
    $rootScope.activeMenu = 'video';
    $rootScope.activeNavbar = '';

    var startRecording = document.getElementById('start-recording');
    var stopRecording = document.getElementById('stop-recording');
    var cameraPreview = document.getElementById('camera-preview');

    cameraPreview.muted = true;

    function successCallback(stream) {
      // RecordRTC usage goes here

      var optionsVideo = {
        type: 'video',
        frameInterval: 20 // minimum time between pushing frames to Whammy (in milliseconds)
      };
      $scope.recordRTCVideo = RecordRTC(stream, optionsVideo);

      var optionsAudio = {
        type: 'audio',
        bufferSize: 16384
      };
      $scope.recordRTCAudio = RecordRTC(stream, optionsAudio);

      cameraPreview.src = window.URL.createObjectURL(stream);
      cameraPreview.play();

      startRecording.disabled = false;
    }

    function errorCallback(error) {
      consle.log(error);
    }

    var mediaConstraints = {
      video: true,
      audio: true
    };

    navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);

    $scope.startRecording = function() {
      startRecording.disabled = true;

      $scope.recordRTCVideo.startRecording();
      $scope.recordRTCAudio.startRecording();

      stopRecording.disabled = false;
    };

    $scope.audioDataURL = null;
    $scope.videoDataURL = null;

    $scope.audioBlob = false;
    $scope.videoBlob = false;

    $scope.formD = new FormData();
    $scope.filename = getRandomString();
    $scope.formD['filename'] = $scope.filename;
    console.log($scope.formD);

    $scope.stopRecording = function() {
      startRecording.disabled = false;
      stopRecording.disabled = true;

      $scope.recordRTCAudio.stopRecording(function(audioURL) {
        console.log("stop audio");

        var audioBlob = $scope.recordRTCAudio.getBlob();

        $scope.formD['audio-blob'] = audioBlob;
        console.log($scope.formD);
        $scope.audioBlob = true;

        $scope.afterStopRecording();
      });

      $scope.recordRTCVideo.stopRecording(function(videoURL) {
        console.log("stop video");

        var videoBlob = $scope.recordRTCVideo.getBlob();

        $scope.formD['video-blob'] = videoBlob;
        console.log($scope.formD);
        $scope.videoBlob = true;

        $scope.afterStopRecording();
      });
    };

    $scope.afterStopRecording = function() {
      /*$scope.recordRTCAudio.getDataURL(function(audioDataURL) {
        $scope.audioDataURL = audioDataURL;
        console.log("audio");
        $scope.postFiles();
      });

      $scope.recordRTCVideo.getDataURL(function(videoDataURL) {
        $scope.videoDataURL = videoDataURL;
        console.log("video");
        $scope.postFiles();
      });*/

      if($scope.audioBlob && $scope.videoBlob) {
        $scope.postFiles();
      }

    };

    //var audio = document.querySelector('audio');

    var isFirefox = false;

    /*var recordAudio, recordVideo;
    $scope.startRecording = function() {
      startRecording.disabled = true;
      navigator.getUserMedia({
        audio: true,
        video: true
      }, function(stream) {
        cameraPreview.src = window.URL.createObjectURL(stream);
        cameraPreview.play();

        recordAudio = RecordRTC(stream, {
          bufferSize: 16384
        });

        if (!isFirefox) {
          recordVideo = RecordRTC(stream, {
            type: 'video'
          });
        }

        recordAudio.startRecording();

        if (!isFirefox) {
          recordVideo.startRecording();
        }

        stopRecording.disabled = false;
      }, function(error) {
        alert(JSON.stringify(error));
      });
    };


    $scope.stopRecording = function() {
      startRecording.disabled = false;
      stopRecording.disabled = true;

      recordAudio.stopRecording(function() {
        if (isFirefox) onStopRecording();
      });

      if (!isFirefox) {
        recordVideo.stopRecording();
        onStopRecording();
      }

      function onStopRecording() {
        recordAudio.getDataURL(function(audioDataURL) {
          if (!isFirefox) {
            recordVideo.getDataURL(function(videoDataURL) {
              postFiles(audioDataURL, videoDataURL);
            });
          } else postFiles(audioDataURL);
        });
      }
    };*/


    $scope.postFiles = function() {
      console.log("postFiles");

        cameraPreview.src = '';
        //cameraPreview.poster = '/ajax-loader.gif';

      console.log($scope.formD);

        Upload.upload({
          url: CONSTANTS.liveCommunityServiceUrl + CONSTANTS.liveCommunityUploadsPath,
          headers: {},
          data: {
            file : $scope.formD
          }
        }).then(function (response) {
          $timeout(function () {
            console.log(response);
          });
        }, function (response) {

          /*if (response.status > 0) {
           $scope.errorMsg = response.status + ': ' + response.data;
           }*/

          //TODO : Display message to User

        }, function (evt) {
          /*$scope.progress =
           Math.min(100, parseInt(100.0 * evt.loaded / evt.total));*/
          //Nothing to do ?
        });
    }

    /*var fileName;

    $scope.postFiles = function() {
      console.log("postFiles");
      if($scope.audioDataURL != null && $scope.videoDataURL != null) {
        var audioDataURL = $scope.audioDataURL;
        var videoDataURL = $scope.videoDataURL;


        fileName = getRandomString();
        var files = {};

        files.audio = {
          name: fileName + (isFirefox ? '.webm' : '.wav'),
          type: isFirefox ? 'video/webm' : 'audio/wav',
          contents: audioDataURL
        };

        if (!isFirefox) {
          files.video = {
            name: fileName + '.webm',
            type: 'video/webm',
            contents: videoDataURL
          };
        }

        files.isFirefox = isFirefox;

        cameraPreview.src = '';
        //cameraPreview.poster = '/ajax-loader.gif';

        Upload.upload({
          url: CONSTANTS.liveCommunityServiceUrl + CONSTANTS.liveCommunityUploadsPath,
          headers: {},
          data: {
            files: files
          }
        }).then(function (response) {
          $timeout(function () {
            console.log(response);
          });
        }, function (response) {

          /*if (response.status > 0) {
           $scope.errorMsg = response.status + ': ' + response.data;
           }* /

          //TODO : Display message to User

        }, function (evt) {
          /*$scope.progress =
           Math.min(100, parseInt(100.0 * evt.loaded / evt.total));* /
          //Nothing to do ?
        });

        /*xhr(CONSTANTS.liveCommunityServiceUrl + CONSTANTS.liveCommunityUploadsPath, JSON.stringify(files), function(_fileName) {
         var href = location.href.substr(0, location.href.lastIndexOf('/') + 1);
         cameraPreview.src = href + 'uploads/' + _fileName;
         cameraPreview.play();

         var h2 = document.createElement('h2');
         h2.innerHTML = '<a href="' + cameraPreview.src + '">' + cameraPreview.src + '</a>';
         document.body.appendChild(h2);
         });* /
      }
    };*/

    /*function xhr(url, data, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
          callback(request.responseText);
        }
      };
      request.open('POST', url);
      request.send(data);
    }*/

    window.onbeforeunload = function() {
      startRecording.disabled = false;
    };

    function getRandomString() {
      if (window.crypto) {
        var a = window.crypto.getRandomValues(new Uint32Array(3)),
          token = '';
        for (var i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
        return token;
      } else {
        return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
      }
    }


  }]);
