function statusJS(options) {
  var defaults = {
    user       : 'StatusJS',        // Twitter username
    problem    : '[PROBLEM]',       // Problem prefix
    solved     : '[SOLVED]',        // Solved prefix
    info       : '[INFO]',          // Info prefix
    delay      : 6000,              // FadeOut delay
    sticky     : true,              // only takes effect for problem updates; Solved/Info updates fade out after the delay by default
    expiration : 1,                 // Don't show updates older than this in hours
    domain     : false,             // Cross domain cockie support 
    debug      : false
  };

  var o = $.extend(defaults, options);

  // Get latest tweet
  $.getJSON("https://api.twitter.com/1/statuses/user_timeline/"+o.user+".json?count=1&include_rts=1&callback=?", function(data) {
     
     var notification = {
        'text'       : data[0].text,
        'id'         : data[0].id_str,
        'created_at' : data[0].created_at,
        'img'        : data[0].user['profile_image_url']
     }

     console.log(notification['img']);

     notificationTest(notification);
  });

  function notificationTest(notification) {
    
    // Get type of update
    if (notification['text'].indexOf(o.problem) != -1) {
      notification['type'] = o.problem;
    } else if (notification['text'].indexOf(o.solved) != -1) {
      notification['type'] = o.solved;
    } else if (notification['text'].indexOf(o.info) != -1) {
      notification['type'] = o.info;
    } else {
      notification['type'] = false;
    }

    var now          = new Date();                           // Now
    var creationDate = new Date(notification['created_at']); // Notification creation date
    var expireDate   = o.expiration*1000*60*60;

    // Test if notification is not older than 1 hour
    if ((now-creationDate) > expireDate) {
      c('Notification older than '+o.expiration+' hour')
    } else {

      // Test if type is [problem], [info] or [solved]
      if (notification['type'] !== false) {

        c('tweet is a notification!');

        // Get notification content
        notification['text'] = notification['text'].split(notification['type'])[1].replace('\ ','');

        // Inject CSS
        $('head').append(css);

        // Display notification
        renderNotification(notification);

      } else {
        c('No Problem/Solved/Info identifier found. Might be a regular tweet...')
      }
    }
  }

  function renderNotification(notification) {
    // css class for styling
    notification['class'] = (notification['type'] == o.problem) ? 'problem' : ((notification['type'] == o.info) ? 'info' : 'solved'); 
    // pretty notification title
    notification['title'] = notification['type'].replace(/[^a-z0-9\s]/gi, '').toProperCase();

    // Test if title is stated (text in brackets)
    // if not, notification['type'] will be used as title
    if (notification['text'].match(/\[(.*)\]/)) {
      notification['title'] = notification['text'].split('[')[1].split(']')[0];
      notification['text'] = notification['text'].replace(/\[(.*)\]/,'').replace('\ ','');
    }

    // Test if url is stated
    if (notification['text'].match(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/)) {
      notification['url'] = notification['text'].match(/((^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?))/)[0];
      console.log(notification['url']);
    } else {
      notification['url'] = 'https://twitter.com/'+o.user+'/status/'+notification['id'];
    }

    c(notification);
    c('Notification title: '+notification['title']+'\nNotification content: '+notification['text']);    

    // Markup for notification bubble
    var notificationMarkup  = 
    $('<a href="'+notification['url']+'" class="notification '+notification['class']+'">\
<h1 class="notification-title">'+notification['title']+'</h1>\
<span class="notification-content">'+notification['text']+'</span>\
</a>');

    // Test if notification['type'] is [problem]
    if (notification['type'] == o.problem) {
      c('Show notification!') 

      // append notification bubble to dom
      $('body').append(notificationMarkup);
      
      var css = {
        'background-image'   : 'url('+notification['img']+')',
        'background-position': '6px 6px',
        'background-repeat'  : 'no-repeat'
      }

      $('.notification').css(css).hide().fadeIn();

    // Test if notification['type'] is [solved] or [info]
    } else if (notification['type'] == o.solved || notification['type'] == o.info) {

      // get id stored in cookie
      cookieID = readCookie('id');
      c('Cookie ID: '+cookieID);

      // Test if notification was shown before
      if (cookieID == notification['id']) {
        c('Notification already posted!');
      } else {
        c('Set cookie: '+notification['id']);
        
        // set cookie
        createCookie('id', notification['id'], 1);
        c('Show notification!')

        // append notification bubble to dom
        $('body').append(notificationMarkup);
        $('.notification').hide().fadeIn();

        // remove notification if notification notification['type'] is [solved] or [info]
        if (notification['type'] == o.solved || notification['type'] == o.info || o.sticky == false) {
          setTimeout(function() {
            c('Hide notification!')
            $('.notification:not(:hover)').fadeOut();
          }, o.delay);
        }
      }
    }
  }

  function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    if (o.domain) {
      document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/; domain="+o.domain+"";
    } else {
      document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    }
    
  }

  function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  function c(m) {
    if (o.debug == true)
      console.log(m);
  }

  var css =
$('<style type="text/css">\
.notification {\
position: fixed;\
right: 20px;\
top: 20px;\
background: #fff;\
background-color: rgba(250,250,250,.9);\
//box-shadow: 0 0 0px 1px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.1),0 1px 0 rgba(255,255,255,.8) inset,0 -1px 0 rgba(0,0,0,.1) inset,0 -80px 40px -40px rgba(0,0,0,.1) inset;\
box-shadow: 0 1px 1px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.1);\
border-radius: 4px;\
border: 3px solid grey;\
width: 200px;\
font-family: "Helvetica Neue", sans-serif;\
padding: 10px 10px 10px 60px;\
color: #333;\
text-decoration: none;\
}\
.notification.problem {\
border: 3px solid red;\
}\
.notification.solved {\
border: 3px solid green;\
}\
.notification-title {\
margin: 0 0 5px 0;\
padding: 0;\
font-size: 14px;\
}\
.notification-content {\
margin: 0;\
padding: 0;\
font-size: 12px;\
}\
</style>');
}