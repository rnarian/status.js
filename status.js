$(document).ready(function() {

  var twitterUsername = 'yeahstatuswhat';
  var identProblem     = '[PROBLEM]';
  var identSolved      = '[SOLVED]';

  css = $('<style type="text/css"> \
            .notification { \
              position: fixed; \
              right: 20px; \
              top: 20px; \
              background: rgba(250,250,250,.9); \
              box-shadow: 0 0 0px 1px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.1),0 1px 0 rgba(255,255,255,.8) inset,0 -1px 0 rgba(0,0,0,.1) inset,0 -40px 40px -40px rgba(0,0,0,.2) inset; \
              border-radius: 4px; \
              width: 200px; \
              font-family: "Helvetica Neue", sans-serif; \
              padding: 10px 10px 10px 60px; \
            } \
            .notification:before { \
              position: absolute; \
              left: 0; \
              right: 0; \
              content: ":)"; \
              margin: -4px 20px; \
              font-size: 36px; \
            } \
            .notification.problem:before { \
              position: absolute; \
              left: 0; \
              right: 0; \
              content: ":("; \
              margin: -4px 20px; \
              font-size: 36px; \
            } \
         \
            .notification-title { \
              margin: 0 0 5px 0; \
              padding: 0; \
              font-size: 14px; \
            } \
         \
            .notification-content { \
              margin: 0; \
              padding: 0; \
              font-size: 12px; \
            } \
          </style>');

  $('head').append(css);

  function renderNotification(type, content) {

    var notificationStyle   = (type == identProblem) ? 'problem' : 'solved';    // css class for styling
    var notificationTitle   = type.replace(/[^a-z0-9\s]/gi, '').toProperCase(); // pretty notification title
    var notificationContent = content;

    // Test if title is given (text in brackets)
    // if not, notification type will be used as title, as specified above
    if (notificationContent.match(/\[(.*)\]/)) {
      notificationTitle = notificationContent.split('[')[1].split(']')[0];
      notificationContent = notificationContent.replace(/\[(.*)\]/,'').replace('\ ','');
    }
    console.log('notification title: '+notificationTitle+'\nnotification content: '+notificationContent);    

    // Markup for our notification bubble
    var notificationMarkup  = $('<div class="notification '+notificationStyle+'"> \
                                    <h1 class="notification-title">'+notificationTitle+'</h1> \
                                    <span class="notification-content">'+notificationContent+'</span> \
                                  </div>');

    // append notification bubble to dom
    // keep onscreen if type is a problem
    if (type == identProblem) {
      
      $('body').append(notificationMarkup);
      $('.notification').hide().fadeIn();
    } 

    // remove after 2000 ms if problem is solved
    else if (type == identSolved) {
      $('body').append(notificationMarkup);
      setTimeout(function() {
        $('.notification').fadeOut();
      }, 2000);
    }
  }

  function notificationTest(tweet) {
    
    var notificationType;
    
    // get type of update
    if (tweet.indexOf(identProblem) != -1) {
      notificationType = identProblem;
    } else if (tweet.indexOf(identSolved) != -1) {
      notificationType = identSolved;
    } else {
      notificationType = false;
    }

    // if type is either problem/solved
    if (notificationType !== false) {

      // get notification content
      var notificationContent = tweet.split(notificationType)[1].replace('\ ','');
      console.log('notification type: '+notificationType+'\nnotification content: '+notificationContent);

      // display notification
      renderNotification(notificationType, notificationContent);

    } else {
      console.log('no identifier found. might be a regular tweet...')
    }
  }

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  $.getJSON("https://api.twitter.com/1/statuses/user_timeline/"+twitterUsername+".json?count=1&include_rts=1&callback=?", function(data) {
     var latestTweet = data[0].text;
     console.log("latest tweet: "+latestTweet);
     notificationTest(latestTweet);
  });
}); 