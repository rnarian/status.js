<?php
// Cross-domain support
header('Access-Control-Allow-Origin: *');
// Start session
session_start();
// Path to twitteroauth library
require_once("lib.twitteroauth.php"); 
 
// Configuration
$twitteruser = "twitteraccount";
$consumerkey = "Xjs89sk98sVSHKA7AJs72";
$consumersecret = "sucmV8A7s74js8hfFDhS72MXhg78SjS87Sh2HVyY";
$accesstoken = "1457528362-D6Sj28ShKSgNA6SjgFzp6SknWgWHkA6ShKw7Shj";
$accesstokensecret = "rx92J82JOiUlS8uSVc28Js7AsS6dFjDgS8SJaS7fFj";
 
// Connection function
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
// Connect
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
// Get tweets
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=1");
 
// Print json encoded tweets
echo json_encode($tweets);
?>