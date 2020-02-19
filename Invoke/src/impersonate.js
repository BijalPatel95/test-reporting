require('dotenv').config();
async function login(page, user,uname,pass) {
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/tmp/downloads'});    
    await page.goto(process.env.edsAdmin);
    console.log('on'+process.env.edsAdmin)
    await page.type('input[name=username]', uname, {delay: 20});
    await page.type('input[name=password]', pass, {delay: 20});
    console.log('cred done')
    await page.keyboard.press('Enter');
    await page.waitFor(25000);
    console.log('impersonating')
    await page.goto(link);
    await page.waitFor(30000);
    console.log('impersonate done')
}

exports.login = login;