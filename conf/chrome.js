const { join } = require('path');

exports.config = {    
    //runner: 'local',
    hostname: 'chromedriver',
    specs: [
        './test/specs/**/car-Safety-Page-test.js.js'
    ],    
    exclude: [
        // 'path/to/excluded/files'
    ],    
    maxInstances: 10,   
    capabilities: [{
        maxInstances: 1,        
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
    waitforTimeout: 20000,    
    connectionRetryTimeout: 120000,    
    connectionRetryCount: 3,       
    services: ['selenium-standalone',['image-comparison',   
    {        
        baselineFolder: join(process.cwd(), './test/baselineImg/'),
        formatImageName: '{tag}-{logName}-{width}x{height}',
        screenshotPath: join(process.cwd(), '.tmp/'),
        savePerInstance: true,
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,        
        isHybridApp: true,
        // Options for the tabbing image
        tabbableOptions:{
            circle:{
                size: 18,
                fontSize: 18,               
            },
            line:{
                color: '#ff221a', // hex-code red
                width: 3,
            },
        }        
    }]],
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
        defaultTimeInterval: 180000,
        expectationResultHandler: function(passed, assertion){
        
        },
    },
    maximizeWindow:true,  
    
    beforeBase: function() {
        browser.setTimeout({ 'pageLoad': 180000 })
        browser.timeouts("implicit",500);
        browser.setViewportSize({width:1700, height:1100}, false);
        browser.addCommand("clickAndWaitFor", function(selector, timeout){
            this.click();
            this.waitForVisible(selector,timeout || this.waitforTimeout);
        })
        browser.addCommand("ignoreDirtyData",()=>{
            return browser.execute("window,onbeforeunload = null");
        })
    }
}
