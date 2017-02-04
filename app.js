var net = require('net');
var random = require("random-js")();
var toFixed = require('tofixed');
var client = new net.Socket();
setInterval(()=>{
	client.connect(5511, '127.0.0.1', function() {
		console.log('Connected');
		var dat = "$00,SIPL,"+toFixed(random.real(100, 300),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+","+toFixed(random.real(1, 100),2)+"#";
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