(function(window){

  var calApp = angular.module("calApp", ["ngRoute", "ui.calendar", "calApp.gapi", "calApp.calendar"]);

  // saving google api config data
  calApp.constant('gapiConfig', {
    "CLIENT_ID": '592811306846-0tn7fccg0tpkgocbdne9surn1t6ugbl7.apps.googleusercontent.com',
    "SCOPES": ["https://www.googleapis.com/auth/calendar"]
  });

  // router configuration
  calApp.config(["$routeProvider", function($routeProvider){

    $routeProvider
      .when("/initialize", {
        controller: "AppCtrl",
        templateUrl: "views/login.html"
      })
      .when("/dashboard", {
        controller: "CalendarController",
        templateUrl: "views/dashboard.html"
      })
      .otherwise({
        redirectTo: "/initialize"
      });

  }]);

  // controller for first page (sign in button page)
  calApp.controller("AppCtrl", function($scope, GapiService, $location) {

    $scope.signin = function(){

      GapiService.authorize(function(e){
          
        if (e) {
          alert(e);
          return;
          return;
        }

        $location.path("/dashboard");
        $scope.$apply();
        
      });

    }

  });

})(window);