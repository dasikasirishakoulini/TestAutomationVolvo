module.exports = class Page { 
    open (path) {
        //browser.maximizeWindow();
        return browser.url(`${path}`);
    }
}
