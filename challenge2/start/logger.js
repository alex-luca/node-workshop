// TODO: expose a function called "info" which prints the date and a logging string.
var logger = {
	info  :function(text) {
		console.log(Date.now() + text)
	}
};

module.exports =  logger;
