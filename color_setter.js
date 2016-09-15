var color = "#000000";
var login = require("facebook-chat-api");
var app_skelet = require("./single_user_app_skeleton.js");

var mail = process.argv[2];
var password = process.argv[3];
var whom = process.argv[4];


function hold_the_color(api, friend_id){
	api.changeThreadColor(color, friend_id,function callback(err) {
            if(err) return console.error(err);
        });
		
	api.setOptions({listenEvents: true});
	api.listen(function callback(err, message) {
	    if(err) return console.error(err);
        	if(message.type == 'event' &&
	   	   message.logMessageData.message_type == 'change_thread_theme' && 
        	   message.threadID == friend_id) {
          		  api.changeThreadColor(color, message.threadID,function callback(err) {
            	  	  if(err) return console.error(err);
           		 });
        	}
	});
}


app_skelet.start_the_app_against_user(mail, password, whom, hold_the_color);
