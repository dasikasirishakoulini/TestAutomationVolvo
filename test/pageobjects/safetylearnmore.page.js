const Page = require('./page');

class SafetyDetails extends Page {
    
    get promortionImage(){return $('img[data-autoid="promotionBackgroundImage:image"]')}
    get safetyLearnMoreLink () { return $('#PromotionBackgroundImage-1  a[data-autoid="promotionBackgroundImage:learnMore"]') }
    get acceptBtn(){return $('button.accept-cookies-button')}
    get introVid(){return $('#Video-1 button')}
    get videoIframe(){return $('#Video-1 iframe')}
    get player(){return $('#movie_player')}
    get playPauseButton(){return $('.ytp-play-button')}
    get videoTime(){return $('.ytp-time-current')}

    //get rid of cookies
    handlingCookieAlert (){
        browser.execute(`document.cookie = "OptanonAlertBoxClosed=${new Date().toISOString()};";`)
        browser.refresh()
    }

    redirectToDetails () { 
        this.promortionImage.scrollIntoView();           
        this.safetyLearnMoreLink.click(); 
    }

    open () {
        return super.open('/intl/v/car-safety');       
    }

    clickSafetyVideoToBeplay(){
        this.introVid.click();
    }

    verifyVideoPlayPauseAndTimeFrame(){
        browser.switchToFrame(this.videoIframe)        
        expect(this.player).toHaveElementClass('playing-mode')
        expect(this.playPauseButton).toBeClickable()
        this.playPauseButton.click()
        expect(this.player).toHaveElementClass('paused-mode') 
        expect(this.verifyVideoTimeframe).toHaveTextContaining('0:0')   
        browser.switchToParentFrame();
    }

    verifyVideoPausing(){
        browser.switchToFrame(this.videoIframe)        
        expect(this.playPauseButton).toBeClickable()
        this.playPauseButton.click()
        expect(this.player).toHaveElementClass('paused-mode')   
        browser.switchToParentFrame();
    }

    verifyVideoTimeframe(){
        browser.switchToFrame(this.videoIframe);
        expect(this.verifyVideoTimeframe).toHaveTextContaining('0:0')
        browser.switchToParentFrame();
    }
}

module.exports = new SafetyDetails();
