(function(window) {

  angular.module("calApp.calendar.controller", ["calApp.calendar.service"])
    .controller("CalendarController", function($scope, $location, CalendarService, GapiService){

      // checking if user is logged in
      // if not send user back to initial page 
      if (!GapiService.isAuthorized()) {
        $location.path("/initialize");
        return;
      }

      // event object stores info for event (title, start time...)
      $scope.event = {};

      // full Calendar plugin configuration
      $scope.calendarConfig = {
        header: {
          left: 'today prev,next title',
          center: '',
          right: 'agendaDay,agendaWeek,month'
        },
        defaultView: "agendaWeek",
        height: "parent",
        windowResizeDelay: 1000,
        selectable: true,
        unselectAuto: false,
        timezone: 'local',
        select: function(start, end) {

          // function called when user selects any time/time range
          // this updates the event info object
          var timezone = jstz.determine();

          $scope.event.start = {
            dateTime: start.toISOString(),
            timeZone: timezone.name()
          }
          $scope.event.end = {
            dateTime: end.toISOString(),
            timeZone: timezone.name()
          }

          var $inviteForm = $("form.invite-form");
          $inviteForm.find(".event-time-info").addClass("show");
          $inviteForm.find(".event-start-time").html(moment(start).format("DD MMM YYYY HH:mm:SS"));
          $inviteForm.find(".event-end-time").html(moment(end).format("DD MMM YYYY HH:mm:SS"));

        },
        eventSources: [
          {
            events: function(start, end, timezone, callback) {

              // get events from google account using google calendar api
              var view = $('#calendar').fullCalendar('getView');
              CalendarService.getEvents(view.start, view.end, callback);
            }
          }
        ]
      };


      // function to add event when user presses insert invite button
      $scope.addEvent = function(){

        $scope.event.attendees = ($scope.event.emails || "").trim().split(",").filter(function(a, index) {
          return /\S+@\S+\.\S+/.test(a);
        }).map(function(a) {
          return {
            email: a.trim()
          };
        });

        // function in calendar service which takes event object and add the event
        CalendarService.addEvent($scope.event, function(){
          alert("Event Created Successfully");
          $("#calendar").fullCalendar( 'refetchEvents' );
          $("#calendar").fullCalendar( 'unselect' );
          $("form.invite-form").find(".event-time-info").removeClass("show");
          $scope.event = {};
          $scope.$apply();
        });

      }

      // resets the form on pressing cancel
      $scope.resetForm = function(){
        $scope.event = {};
        $("form.invite-form").find(".event-time-info").removeClass("show");
        $("#calendar").fullCalendar( 'unselect' );
      }

      // this is to adjusts the fullCalendar height dynamically after it is loaded
      // ideally it should had taken height from parent but bootstrap css was conflicting with it
      // so was not working correctly.
      setTimeout(function(){
        $("#calendar").fullCalendar("option", "height", $("#calendar-cont").height());
      }, 200);

    })

})(window);