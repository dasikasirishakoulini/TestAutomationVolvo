exports.config = {
  hostname: 'chromedriver',
  path: '/',
  capabilities: [
    {
      // Set maxInstances to 1 if screen recordings are enabled:
      // maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        // Disable headless mode if screen recordings are enabled:
        //args: ['--headless', '--window-size=1440,900']
      }
    }
  ],
  logLevel: 'error',
  reporters: ['spec', 'junit'],
  framework: 'mocha',
  mochaOpts: {
    timeout: 60000
  },
  specs: ['test/specs/car-Safety-Page-test.js'],
  maximizeWindow: true,
  screenshots: {
    saveOnFail: true
  }, 
  assetsDir: '/home/webdriver/assets/', 
  baseUrl: 'https://www.volvocars.com/intl/v/car-safety/a-million-more'
}