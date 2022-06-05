const config = {
    hostname: 'chromedriver',
    path: '/',
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
    reporters: ['spec',['junit',{
        outputDir: './test/testReports',
        errorOptions: {
            error: 'message',
            failure: 'message',
            stacktrace: 'stack'
        }
    }],['allure',{
        outputDir: 'allure-results',
        disableWebdriverScreenshotsReporting: true,
    }]],
    framework: 'jasmine',
    jasmineNodechaOpts: {
        defaultTimeInterval: 100000,
        expectationResultHandler: function(passed, assertion){
        
        },
    },
    specs: [
        './test/specs/**/car-Safety-Page-test.js'
    ],  
   
    baseUrl: 'https://www.volvocars.com/',    
    bail: 0,   
    connectionRetryTimeout: 120000,    
    connectionRetryCount: 3,
    services: ['selenium-standalone'],   

    afterTest: function (test, context, { error, result, duration, passed, retries }) {        
          browser.takeScreenshot();       
      },

    beforeBase: function() {
        browser.setTimeout({ 'pageLoad': 10000 })
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

    exports.config = Object.assign({}, config)