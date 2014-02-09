## status.js

### jQuery Plugin to display status notifications based on twitter updates. 

Problem updates are sticky by default. Solved/Info updates fade out after stated delay and will only be shown once (cookie).

Since Twitter disabled their v1 API we had to switch to an PHP wrapper to handle the OAuth authentication. More informations below

## Informations

#### Required format

    [Prefix] [optional title in brackets] status info

#### Basic Usage

    statusJS({
      user : 'StatusJS'
    });

#### Advanced Usage

    statusJS({
      user       : 'StatusJS',        // Twitter username
      problem    : '[PROBLEM]',       // Problem prefix
      solved     : '[SOLVED]',        // Solved prefix
      info       : '[INFO]',          // Info prefix
      delay      : 6000,              // FadeOut delay
      sticky     : true,              // only takes effect for problem updates
      expiration : 1,                 // Don't show updates older than this in hours
      domain     : 'domain.com'       // Cross domain cockie support
    });

## Installation


### Setup a Twitter application

1. Visit https://dev.twitter.com/apps/ and sign in using your Twitter username and password.  
1. Select 'Create new application' and enter the application details.  
  1. The name and description can be anything you like.  
  1. The website field can be your main website and doesn’t have to be the site where your Twitter feed or feeds are located.  
  1. Callback URL can be left blank
1. Enter the CAPTCHA info and click 'create'
1. On the next details screen, click 'create my access token'. You may need to refresh the page after a few seconds if it doesn’t appear automatically.

### Server side configuration

#### PHP

* Upload the files inside the `php/` folder to your web server which supports PHP.
* Open the the `json.php` file and change the following values: 

### 

    $twitteruser = "StatusJS";
    $consumerkey = "Xjs89sk98sVSHKA7AJs72";
    $consumersecret = "sucmV8A7s74js8hfFDhS72MXhg78SjS87Sh2HVyY";
    $accesstoken = "1457528362-D6Sj28ShKSgNA6SjgFzp6SknWgWHkA6ShKw7Shj";
    $accesstokensecret = "rx92J82JOiUlS8uSVc28Js7AsS6dFjDgS8SJaS7fFj";

#### JavaScript

* Upload rather `status.js` or `status.min.js` to your webserver
* Open the the `status*.js` file and replace:  
  
### 

    http://yourdomain.com/status/json.php

with the actual URL of your `json.php` file.

### JavaScript implemention

Now the easy part: just include the `status*.js` into the `<head>` area of your website where you want to display a status notification:

    <script src="http://yourdomain.com/status/status*.js"></script>
