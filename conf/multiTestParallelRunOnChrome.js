exports.config = {    
    //runner: 'local',
    hostname: 'chromedriver',
    specs: [
        './test/specs/**/*.js'
    ],    
    exclude: [
        // 'path/to/excluded/files'
    ],    
    maxInstances: 10,   
    capabilities: [{
        maxInstances: 5,        
        browserName: 'chrome',
        acceptInsecureCerts: true,       
        'goog:chromeOptions': {
            //args: ['--headless', 'disable-gpu']            
            args: ['--window-size=1440,900']
          }    
    }],   
    logLevel: 'error',    
    bail: 0,    
    baseUrl: 'https://www.volvocars.com/',    
    waitforTimeout: 10000,    
    connectionRetryTimeout: 120000,    
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'jasmine',
    reporters: ['spec',['junit',{
        outputDir: './test/testReports',
        errorOptions: {
            error: 'message',
            failure: 'message',
            stacktrace: 'stack'
        }
    }]],
    jasmineNodechaOpts: {
        defaultTimeInterval: 50000,
        expectationResultHandler: function(passed, assertion){
        
        },
    },
    maximizeWindow:true,   
}
