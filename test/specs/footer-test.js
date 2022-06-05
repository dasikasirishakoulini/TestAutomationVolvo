const { URL } = require('../utils/commons')

describe('Footer test', () => {
    it('Open page and accept cookies', async () => {
        await browser.url(URL);
        const acceptCookiesButton = await $('#onetrust-accept-btn-handler');
        await acceptCookiesButton.click();
        expect(browser).toHaveUrl(URL);
    })

    /* TEST CASE 1 - Footer links */
    it('Footer container exists and has correct links', async () => {
        const footerContainer = await $("[data-autoid='footer:container']");
        expect(footerContainer).toBeDisplayed();

        //Check footer links
        const footerLinks = await footerContainer.$$("[data-autoid='footer:links']") 
        expect(footerLinks).toHaveChildren(5);

        //Links are correct
        var index = 0;
        const linksText = ['Cookies', 'Legal', 'Privacy', 'Social media', 'Tell us'];
        const linksRefs = ['cookies', 'legal', 'privacy', 'social-media', 'tell-us-reporting-line'];
        const legalURL = 'https://www.volvocars.com/intl/v/legal/';
        for(var index = 0; index < footerLinks.length; index++) {
            //Link text
            const element = footerLinks[index];
            expect(element).toBeClickable;
            expect(element).toHaveText(linksText[index]);
    
            //Link href
            const linkRef = await element.getAttribute('href');
            const linkURL = legalURL + linksRefs[index];
            expect(linkRef).toBe(linkURL);

        };

        //Copyright section footer:copyright
        const copyrightSection = await $("[data-autoid='footer:copyright']");
        expect(copyrightSection).toBeDisplayed();
    })
})

