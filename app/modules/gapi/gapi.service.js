(function(window) {

  // google api service module
  // everything for google api is handled through this service like sign in, get and set event etc.
  angular.module("calApp.gapi.service", [])
    .factory("GapiService", function(gapiConfig){

      var isSignedIn = false;

      var gapiService = {};

      // check if user is signed in
      gapiService.isAuthorized = function() {
        return isSignedIn;
      }

      // authorize user, redirects to google page and back to calendar page with user auth data
      gapiService.authorize = function(callback){
        gapi.auth.authorize(
          {
            'client_id': gapiConfig.CLIENT_ID,
            'scope': gapiConfig.SCOPES.join(' '),
            'immediate': false
          }, function(authResult) {
            
            if (authResult && !authResult.error) {

              isSignedIn = true;
              gapi.client.load('calendar', 'v3', callback);
            } else {
              callback("Something bad happened")
            }

          });
      }

      // get events from google calendar account
      gapiService.getEvents = function getEvents(start, end, callback) {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'showDeleted': false,
          'singleEvents': true,
          'orderBy': 'startTime',
          'timeMin': new Date(start).toISOString(),
          'timeMax': new Date(end).toISOString()
        });

        request.execute(function(resp) {
          var events = resp.items;
          
          callback && callback(events);
        });
      }

      // adds the event into google account
      gapiService.addEvent = function(eventObj, callback) {

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': eventObj
        });

        request.execute(function(event) {
          callback();
        });

      }

      return gapiService;
    });

})(window);