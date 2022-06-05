const { URL } = require('../utils/commons');
const carModels = require('../data/car-models.json');


describe('Explore car models test', () => {
    it('Open page and accept cookies', async () => {
        await browser.url(URL);
        const acceptCookiesButton = await $('#onetrust-accept-btn-handler');
        await acceptCookiesButton.click();
        expect(browser).toHaveUrl(URL);
    })

    /* TEST CASE 1 - Car carousel */
    it('Check car carousel', async () => {
        const carousel = await $('[data-autoid=ProductListCarousel-1]');
        expect(carousel).toBeDisplayed();

        //Check title
        const carouselTitle = await $("[data-autoid='productListCarousel:title']");
        expect(carouselTitle).toBeDisplayed();
        expect(carouselTitle).toHaveText('Explore our models');

        //Get all carousel items
        const allItems = await carousel.$$("[data-autoid='springCarouselPane:carouselItem']"); 
        expect(allItems).toHaveChildren(8);

        //Check each carousel item
        var index = 0;
        for(var index = 0; index < allItems.length; index++) {
            //Single carousel item
            const currentItem = allItems[index];
            const itemSingle = await currentItem.$("[data-autoid='productListCarouselItem-" + index + "']");
            expect(itemSingle).toBeDisplayed();

            //Compare with car-model definitions
            const carModelDef = carModels[index]; 

            //Category exists and matches definition
            const category = await itemSingle.$("[data-autoid='productListCarouselItem:category']");
            expect(category).toBeDisplayed();
            expect(category).toHaveText(carModelDef['category']);

            //Model name exists and matches definition
            const modelName = await itemSingle.$("[data-autoid='productListCarouselItem:modelName']");
            expect(modelName).toBeDisplayed();
            expect(modelName).toHaveText(carModelDef['model']);

            //Recharge type exists and matches definition
            const rechargeType = await itemSingle.$("[data-autoid='productListCarouselItem:rechargeType']");
            expect(rechargeType).toBeDisplayed();
            expect(rechargeType).toHaveText(carModelDef['type']);

            //Picture exists
            const picture = await itemSingle.$('picture');
            expect(picture).toBeDisplayed();

            //Link exists and matches definition
            const linkRef = await itemSingle.getAttribute('href');
            const linkURL = '/intl/cars' + carModelDef['url'];
            expect(linkRef).toBe(linkURL);

            //Learn link exists
            const learnLink = await currentItem.$("[data-autoid='productListCarouselItem:link1']"); 
            expect(learnLink).toHaveText('LEARN');
            expect(learnLink).toBeClickable();
            const learnRef = await learnLink.getAttribute('href');
            expect(learnRef).toBe(linkURL);

            //Shop link exists
            const shopLink = await currentItem.$("[data-autoid='productListCarouselItem:link2']"); 
            expect(shopLink).toHaveText('SHOP');
            expect(shopLink).toBeClickable();
            const shopRef = await shopLink.getAttribute('href');
            expect(shopRef).toContain('/intl/build' + carModelDef['url']);
        };
    })    

    it('Check car models bottom links', async () => {
        //Check recharge link
        const leftLink = await $("[data-autoid='ProductListCarousel:cta1']");
        expect(leftLink).toBeDisplayed();
        expect(leftLink).toBeClickable();
        expect(leftLink).toHaveText('RECHARGE');

        //Click recharge link
        const leftURL = '/intl/v/cars/recharge';
        const leftLinkRef = await leftLink.getAttribute('href');
        expect(leftLinkRef).toBe(leftURL);
        await leftLink.click();
        expect(browser).toHaveUrl(leftURL);
        browser.url(URL);
        
        //Check mild hybrid link
        const rightLink = await $("[data-autoid='ProductListCarousel:cta2']");
        expect(rightLink).toBeDisplayed();
        expect(rightLink).toBeClickable();
        expect(rightLink).toHaveText('MILD HYBRID CARS');

        //Click mild hybrid link
        const rightURL = '/intl/v/cars/other-powertrains';
        const rightLinkRef = await rightLink.getAttribute('href');
        expect(rightLinkRef).toBe(rightURL);
        await rightLink.click();
        expect(browser).toHaveUrl(rightURL);
        browser.url(URL);
    })

})

