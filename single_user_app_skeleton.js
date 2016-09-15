var login = require("facebook-chat-api");
function find_friend(api, data_array, i, callback){
	if(i == 10)
		return 0;
	console.log(data_array[i]);
	var user_id = data_array[i].userID;
	api.getUserInfo(user_id, function(err, ret){
		console.log(ret);
		var user = ret[user_id];
		console.log("-----------------");
		console.log(user);
		console.log(callback);
		if (user.isFriend)
			callback(api, data_array[i].userID);
		else
			find_friend(api, data_array, i+1, callback);
	});
    	
}


module.exports = {
	start_the_app_against_user: function (mail, password, whom, function_against_him){
		login({email: mail, password: password}, function callback (err, api) {
		    if(err) return console.error(err);
		    api.getUserID(whom, function(err, data){
		        var threadId = find_friend(api, data, 0, function_against_him);
		    });
		});
	}
}
