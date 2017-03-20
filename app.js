var net = require('net')
const commandLineArgs = require('command-line-args')
const getUsage = require('command-line-usage')

const optionDefinitions = [
  { name: 'ip', alias: 'i', type: String },
  { name: 'port', alias: 'p', type: String},
  { name: 'message', alias: 'm', type: String},
	{ name: 'help', alias: 'h', type: String}
]
const usage = getUsage([
  {
    header: 'MOCK TCP',
    content: 'Send data to a specific TCP ip|port'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
	  header: 'Example usage:',
	  content:'node app.js --ip localhost --port 3000 --message LOGAN IS HERE'
  },
  {
    content: 'Project home: [underline]{https://github.com/sudoak/mock_tcp}'
  }
])
//console.log(usage)

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
	console.log(usage)
}
