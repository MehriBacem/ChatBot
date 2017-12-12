'use strict';
var VERIFY_TOKEN = "bacem";
var https = require('https');
var PAGE_ACCESS_TOKEN = "EAAHXCZCScr1MBADvIcE4o7beSmkSmtqdk3DXz7S8RsQ5BFMZC0rLSLsJS9UFFXe5XT1RSpwzrn0LySNaPSx7TQxq6biCTAtkBSb3Wm9SYotNCd6cHkGcJCGlp3GcVYvxWq6NchoqoBnfbNjkUcpAjSWJTKoHaY3IU6AsIBAqtVsHquxwP5";
module.exports.ChatBot = (event, context, callback) => {
    
  // process GET request to check our endpoint during configuration.
  if(event.method === 'GET'){
  
  if(event.query){
  
    var VerifyToken = event.query['hub.verify_token'] 
 
    if (VerifyToken === VERIFY_TOKEN) {  // verify that the hub.verify_token matches the value provided when activating the Webhook. This is a security measure to authenticate the request and identify the Webhook.
      var challenge = event.query['hub.challenge']  // a random string
      
      callback(null, parseInt(challenge)); // We will know that our endpoint is correctly configured and that the answer is authentic.
    }else{

     callback(null, 'Error, wrong validation token' );
    }
  
  
  }
    }else{
        // process POST request 
        if(event.method === 'POST'){
    var data =event.body;  
    // Make sure this is a page subscription
    if (data.object === 'page') {
    // Iterate over each entry 
    // entry : The list of modifications

    data.entry.forEach(function(entry) {
        // Iterate over each messaging event
        entry.messaging.forEach(function(msg) {
          if (msg.message) { 
            receivedMessage(msg);
          } else {
            console.log("Webhook received unknown event: ", event);
          }
        });
    });
    
    }
    // if all went well. 
    callback(null, 'ok');
  }}
}


function receivedMessage(event) {
  console.log("Message data: ", event.message);
  
  var senderID = event.sender.id;
  var message = event.message;
  var messageText = message.text;
  var messageAttachments = message.attachments;
  if (messageText) {
    // If we receive a text message, just echo the text we received.
    if (messageText) {

        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
        // If we receive an attachement, we respond by the same attachement.
     
    var attachment_url = messageAttachments[0].payload.url;
     sendTextMessage(senderID, attachment_url );
}}

//This  function will echo the text we received.
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {   
      id: recipientId    //The same Id of the sender. He becomes the recipient.
    },
    message: {
      text: messageText
    }
  };
  var body = JSON.stringify(messageData);
 // Send our message by sending a POST request to the Send API on https://graph.facebook.com/v2.6/me/messages
  var path = '/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN;  //PAGE_ACCESS_TOKEN is required to start using APIS.
  var options = {
    host: "graph.facebook.com",
    path: path,
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  };

  var callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
 
    });
  }
  // Send the HTTP request to the Messenger Platform
  var req = https.request(options, callback);

  req.on('error', function(e) {
    console.log('problem with request: '+ e);
  });
 
  req.write(body);
  req.end();
}

