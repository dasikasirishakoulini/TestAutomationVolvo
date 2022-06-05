const { URL } = require('../utils/commons')

describe('Header test', () => {
    it('Open page and accept cookies', async () => {
        await browser.url(URL);
        const acceptCookiesButton = await $('#onetrust-accept-btn-handler');
        await acceptCookiesButton.click();
        expect(browser).toHaveUrl(URL);
    })

    /* TEST CASE 1 - Logo home link */
    it('Logo home link is displayed and working', async () => {
        const topBar = await $("#sitenav\\:topbar");
        const homeLink = await topBar.$("[data-autoid='nav:siteNavLogoSmall']");
        expect(homeLink).toBeDisplayed();
        expect(homeLink).toBeClickable();

        //Home link url
        const homeURL = 'https://www.volvocars.com/intl';
        const homeLinkRef = await homeLink.getAttribute('href');
        expect(homeLinkRef).toBe(homeURL);
        
        //Click home link
        await homeLink.click();
        expect(browser).toHaveUrl(homeURL);
        await browser.url(URL);
           
    })
    
    /* TEST CASE 2 - Our cars link */
    it('Our cars link is displayed and opens car menu', async () => {
        const carsLink = await $("[data-autoid='nav:topNavCarMenu']");
        expect(carsLink).toBeDisplayed();

        //Open cars link
        await carsLink.click();
        expect(browser).toHaveUrl(URL);

        //Check menu opens
        const menu = await $("[data-autoid='nav:carMenuDesktop']");
        expect(menu).toBeDisplayed();

        //Check close button exists
        const closeMenu = await $("[data-autoid='nav:carMenuCloseIcon']");
        expect(closeMenu).toBeDisplayed();
        expect(closeMenu).toBeClickable();

        //Close menu
        await closeMenu.click();
        !expect(menu).toBeDisplayed();
        !expect(closeMenu).toBeDisplayed();
           
    })

    /* TEST CASE 3 - Side navigation link */
    it('Menu link is displayed and opens side menu', async () => {
        const sideMenuLink = await $("#sitenav-sidenav-toggle");
        expect(sideMenuLink).toBeDisplayed();
        expect(sideMenuLink).toBeClickable();

        //Menu link text
        const menuLinkText = await sideMenuLink.$("em");
        expect(menuLinkText).toHaveText("Menu");

        //Open side menu
        await sideMenuLink.click();
        expect(browser).toHaveUrl(URL);

        //Check side menu is displayed
        const sideMenu = await $("#nav\\:sideNavigation");
        expect(sideMenu).toBeDisplayed();

        //Check close button exists
        const closeMenu = await $("[data-autoid='nav:siteNavCloseIcon']");
        expect(closeMenu).toBeDisplayed();
        expect(closeMenu).toBeClickable();

        //Close menu
        await closeMenu.click();
        !expect(sideMenu).toBeDisplayed();
        !expect(closeMenu).toBeDisplayed();
           
    })
})

