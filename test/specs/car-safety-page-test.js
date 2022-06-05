const { URL } = require('../utils/commons')

describe('Car safety page', () => {
   it('Open page and accept cookies', async () => {
    await browser.url(URL);
    const acceptCookiesButton = await $('#onetrust-accept-btn-handler');
    await acceptCookiesButton.click();
    expect(browser).toHaveUrl(URL);
   })

   /* TEST CASE 1 - Intro section */
   it('Is Intro section displayed', async () =>  {
    const introSection = await $('[data-autoid=ModelIntro]');
    expect(introSection).toBeDisplayed();

    //Check intro title
    const introTitle = await introSection.$('h2');
    expect(introTitle).toBeDisplayed();
    expect(introTitle).toHaveText('Ideas that change the world are often the most controversial.');

    //Check intro text
    const introText = await introSection.$('p');
    expect(introText).toBeDisplayed();
    expect(introText).toHaveTextContaining('After we introduced the 3-point safety belt');
   })

   /* TEST CASE 2 - Main video */
   it('Is main video displayed and playing', async () =>  {
    const videoSection = await $('[data-autoid=Video-1]');
    expect(videoSection).toBeDisplayed();

    //Video element exists
    const video = await videoSection.$('video');
    expect(video).toBeDisplayed();

    //Check pause button works
    const pauseButton = await videoSection.$('[aria-label=pause]');
    expect(pauseButton).toBeDisplayed();
    expect(pauseButton).toBeClickable();
    await pauseButton.click();
    const playButton = await videoSection.$('[aria-label=play]');
    expect(playButton).toBeDisplayed();
    !expect(pauseButton).toBeDisplayed();

    //Check button opens Youtube iframe
    const linkButton = await videoSection.$('button=watch the story');
    expect(linkButton).toBeDisplayed();
    await linkButton.click();
    const youtubeFrame = await videoSection.$('iframe');
    expect(youtubeFrame).toBeDisplayed();
    !expect(linkButton).toBeDisplayed();

    //switch to IFrame
    browser.switchToFrame(youtubeFrame);
    const player = await $('#player');

    // video is playing
    expect(player).toHaveElementClass('playing-mode')

    // pause video
    const playPauseButton = await $('.ytp-play-button')
    expect(playPauseButton).toBeClickable()
    await playPauseButton.click()

    // video is paused
    expect(player).toHaveElementClass('paused-mode')

    //Switch back
    browser.switchToParentFrame();
    await browser.refresh();

   })

   /* TEST CASE 3 - Text statement */
   it('Is text statement displayed', async () =>  {
    const featuresTitle = await $('[data-autoid=TextStatement-1]');
    expect(featuresTitle).toBeDisplayed();

    const statement = await featuresTitle.$('span');
    expect(statement).toHaveTextContaining('A million more.');
   })

   /* TEST CASE 4 - Safety features */
   it('Are all safety features displayed', async () =>  {
    const iconSection = await $('[data-autoid=IconCallouts]');
    expect(iconSection).toBeDisplayed();

    //Check all sections
    const allSections = await iconSection.$$("[data-autoid='iconCallouts:iconTextItem']");
    expect(allSections).toHaveChildren(4);

    var index = 0;
    const titles = ['Speed cap', 'Highway pilot', 'Driver monitoring cameras', 'Care Key'];
    for(var index = 0; index < allSections.length; index++) {
        //Icon exists
        const element = allSections[index];
        const iconElement = await element.$("[data-autoid='IconTextList:icon']");
        expect(iconElement).toBeDisplayed();

        //Check title
        const title = await element.$('em');
        expect(title).toHaveText(titles[index]);

        //Text exists
        const text = await element.$("[data-autoid='IconTextItem:text']");
        expect(text).toBeDisplayed();
    };
   })

   /* TEST CASE 5 - Learn more link */
   it('Is learn more link displayed and working', async () =>  {

    const moreLink = await $("[data-autoid='iconCallouts:cta']");
    expect(moreLink).toBeDisplayed();
    expect(moreLink).toHaveText('Learn more about car safety');

    //Click learn more link
    await moreLink.click();
    expect(browser).toHaveUrl('/intl/v/car-safety');
    await browser.url(URL);

   })

   /* TEST CASE 6 - Video testimonials */
   it('Are all video testimonials displayed', async () =>  {
    const testimonialsSection = await $('[data-autoid=VideoTestimonials-1]');
    expect(testimonialsSection).toBeDisplayed();

    //Check testimonials title
    const testimonialsTitle = await testimonialsSection.$('h2');
    expect(testimonialsTitle).toHaveText('One of a million');

    //Check all testimonials
    const allTestimonials = await testimonialsSection.$$("[data-autoid='videoTestimonials:container']");
    expect(allTestimonials).toHaveChildren(4);

    const titles = ['Amy', 'Summer', 'Linda & Molly', 'Alex'];
    for(var index = 0; index < allTestimonials.length; index++) {
        //Check video
        const element = allTestimonials[index];
        const videoElement = await element.$(`[data-autoid='videoTestimonials:video-` + index + `']`);
        expect(videoElement).toBeDisplayed();
        expect(videoElement).toBeClickable();

        //Check person name
        const personName = await element.$('em');
        expect(personName).toBeDisplayed();
        expect(personName).toHaveText(titles[index]);
    };
   })

   /* TEST CASE 7 - Innovation section */
   it('Is Innovation section displayed and working', async () =>  {

    const innovationSection = await $('[data-autoid=ImageWithText-1]');
    expect(innovationSection).toBeDisplayed();

    //Check innovation image
    const innovationImage = await innovationSection.$("[data-autoid='imageWithText:image']") 
    expect(innovationImage).toBeDisplayed();

    //Check innovation title
    const innovationTitle = await innovationSection.$("[data-autoid='imageWithText:title']"); 
    expect(innovationTitle).toBeDisplayed();
    expect(innovationTitle).toHaveText('Decades of innovation');

    //Check innovation description
    const innovationDesc = await innovationSection.$("[data-autoid='imageWithText:description']"); 
    expect(innovationDesc).toBeDisplayed();

    //Check learn more link
    const innovationLink = await innovationSection.$("[data-autoid='imageWithText:primaryCta']"); 
    expect(innovationLink).toBeDisplayed();
    expect(innovationLink).toBeClickable();

    //Click learn more link
    await innovationLink.click();
    expect(browser).toHaveUrl('/intl/v/car-safety/safety-heritage');
    await browser.url(URL);

   })

   /* TEST CASE 8 - Disclaimer section */
   it('Is disclaimer displayed', async () =>  {
    const disclaimerSection = await $('[data-autoid=Disclaimer-1]');
    expect(disclaimerSection).toBeDisplayed();
   })
})

