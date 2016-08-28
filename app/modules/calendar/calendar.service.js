(function(window) {

  // calendar service module to get and set events
  
  angular.module("calApp.calendar.service", [])
    .factory("CalendarService", function(GapiService) {

      var CalendarService = {};

      // get events from google account using google api
      CalendarService.getEvents = function(start, end, callback) {

        if (!GapiService.isAuthorized) return callback([]);

        GapiService.getEvents(start, end, function(events){
          
          var evtObj = events.map(function(e) {
            return {
              title: e.summary,
              start: e.start.dateTime || e.start.date,
              end: e.end.dateTime || e.end.date
            }
          });

          callback(evtObj);

        });
      }

      // add event to google account using google api
      CalendarService.addEvent = function(eventObj, callback){

        GapiService.addEvent(eventObj, callback);
      }

      return CalendarService;
    })

})(window);