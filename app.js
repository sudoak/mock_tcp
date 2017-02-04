var net = require('net');
var random = require("random-js")();
var toFixed = require('tofixed');
const commandLineArgs = require('command-line-args')
 
const optionDefinitions = [
  { name: 'ip', alias: 'i', type: String },
]

var ip = commandLineArgs(optionDefinitions).ip

var client = new net.Socket();
setInterval(()=>{
	client.connect(5511, ip , function() {
		console.log('Connected');
		var dat = "$00,ITPL,"+toFixed(random.real(100, 300),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+"#";
		client.write(dat);
		client.destroy();
	})	
},15000)

client.on('error', (err)=>{
	console.log(err)
})
client.on('close', function() {
	console.log('Connection closed');
});