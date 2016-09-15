
var app_skelet = require("./single_user_app_skeleton.js");
var Cleverbot = require('cleverbot-node');

var mail = process.argv[2];
var password = process.argv[3];
var whom = process.argv[4];

cleverbot = new Cleverbot;

function speak_with_a_friend(api, friend_id){
	api.listen(function callback(err, message) {
	    if(err) 
		return console.error(err);
            if(typeof message.body !== 'undefined' && message.threadID == friend_id){
			Cleverbot.prepare(function(){
				cleverbot.write(message.body, function(response) {
					api.sendMessage(response.message, message.threadID);
				});
  			});
            }
	});
}


app_skelet.start_the_app_against_user(mail, password, whom, speak_with_a_friend);
