var Service = require('node-windows').Service;
// Create a new service object
var svc = new Service({
  name:'Step1_Service',
  description: 'Step 1 Service',
  script: 'C:\\step-1\\\index.js',
  nodeOptions: [
    '--harmony'
  ],
  env:[
{
name: "NODE_ENV",
value: "production"
}
]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();