var net = require('net'),
	random = require("random-js")(),
	toFixed = require('tofixed')
const commandLineArgs = require('command-line-args')
	
const optionDefinitions = [
  { name: 'ip', alias: 'i', type: String },
  { name: 'port', alias: 'p', type: String},
  { name: 'message', alias: 'm', type: String}
]

var ip = commandLineArgs(optionDefinitions).ip,
	port = commandLineArgs(optionDefinitions).port,
	message = commandLineArgs(optionDefinitions).message

if(ip && port){
	var client = new net.Socket();
	setInterval(()=>{
		client.connect(port, ip , function() {
			console.log('Connected')
			client.write(message)
			client.destroy()
		})	
	},9000)

	client.on('error', (err)=>{
		console.log(err)
	})
	client.on('close', function() {
		console.log('Connection closed');
	});
}else{
	console.log("Please Enter an IP | PORT\n")
}
