## cal-invite

Invite people using google calendar api

### Flow

  1. Login page (contains just a button to sign in through google account)
  2. Calendar Page
    * All events (for current view) of user are fetched from google account and shown in calendar view
    * User can select time by clicking or dragging time/date cells in the calendar view
    * After selecting time/date, user enters information to store in google calendar as event. He can add multiple attendees using email ids.
    * After saving the invite, it is shown in the view too.


### Folder Structure

* app `contains all angular code`
  *  modules `divided modules by type`
      * calendar `calendar related code like rendering and showing events and forms to add event`
      * gapi `google api related code to fetch and save events using google calendar api`

* bower_components `all framework and library files are here(calendar, jquery, angular etc)`
* css `css files using less as css pre processor`
* js `own libraries or other vendor libraries`
* views `angularjs views (2 views currently, first page for button and then calendar view)`
* index.html `file to start`


