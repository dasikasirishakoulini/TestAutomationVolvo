const { addFeature,addSeverity } = require('@wdio/allure-reporter').default

const Safetypage = require('../pageobjects/safetylearnmore.page');


describe('Volvo cars safety page', () => {
     beforeEach(function() {
        Safetypage.open();
        Safetypage.handlingCookieAlert();  
        Safetypage.redirectToDetails();        
    });    
    it('check video is playing and validate pause/play', () => { 
      //updating allure report about the test
      addFeature("video playing category");
      addSeverity("Critical");
      
      browser.waitUntil(function () {
        const state = browser.execute(function () {
          return document.readyState;
        });        
        return state === 'complete';
      },
      {
        timeout: 60000, //60secs
        timeoutMsg: 'Oops! Check your internet connection'
      }); 
      // Play the video
      Safetypage.clickSafetyVideoToBeplay();    
      browser.waitUntil(function () {
        const state = browser.execute(function () {
          return document.readyState;
        });        
        return state === 'complete';
      },
      {
        timeout: 60000, //60secs
        timeoutMsg: 'Oops! Check your internet connection'
      }); 
      browser.switchToFrame(Safetypage.videoIframe) 
      Safetypage.player.waitForDisplayed(5000)
      expect(Safetypage.player).toHaveElementClass('playing-mode')      
      expect(Safetypage.playPauseButton).toBeClickable()
      Safetypage.playPauseButton.click()
      expect(Safetypage.player).toHaveElementClass('paused-mode')
      expect(Safetypage.videoTime).toHaveTextContaining('0:0') 
      
    })    
  });


