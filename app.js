var net = require('net');
var random = require("random-js")();
var toFixed = require('tofixed');
const commandLineArgs = require('command-line-args')
 
const optionDefinitions = [
  { name: 'ip', alias: 'i', type: String },
  { name: 'port', alias: 'p', type: String}
]

var ip = commandLineArgs(optionDefinitions).ip
var port = commandLineArgs(optionDefinitions).port

if(ip && port){
	var client = new net.Socket();
	setInterval(()=>{
		client.connect(port, ip , function() {
			console.log('Connected');
			var dat = "$00,SIPL,"+toFixed(random.real(100, 300),2)+","+toFixed(random.real(1, 10),2)+","+toFixed(random.real(1, 10),2)+","+toFixed(random.real(1, 10),2)+","+toFixed(random.real(1, 10),2)+","+toFixed(random.real(1, 10),2)+"#";
			client.write(dat);
			client.destroy();
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
