const { URL } = require('../utils/commons')

describe('volvo url search Test', async () => {
    it('should verify url', async () => {
        await browser.url(URL);
        const consent = await $("#onetrust-accept-btn-handler")
        await consent.click()
        const link = await $('a')
        await expect(link).toHaveHref('#skip-to-content')
    })

    it('should click on learn safety', async () => {
        const linkA = await $('=LEARN MORE ABOUT CAR SAFETY')
        console.log(await linkA.getText()) // outputs: "/intl/v/car-safety"
        console.log(await linkA.getAttribute('href'))
        await linkA.click()
    })

    it('should click on learn more', async ()=>{
        const linkB=await $('=LEARN MORE')
        console.log(await linkB.getText())//outputs: "/intl/v/car-safety/driver-assistance"
        console.log(await linkB.getAttribute('href'))
        await linkB.click()
    })


    it('should click on recharge', async ()=>{
        const linkC=await $('=RECHARGE')
        console.log(await linkC.getText())//outputs: "/intl/v/cars/recharge"
        console.log(await linkC.getAttribute('href'))
        await linkC.click()
    })

    it('should click on learn more', async ()=>{
        const linkD=await $('=EXPLORE CHARGING')
        console.log(await linkD.getText())//outputs: ""
        console.log(await linkD.getAttribute('href'))
        await linkD.click()
    })
})