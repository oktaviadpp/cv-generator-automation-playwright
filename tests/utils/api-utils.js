const {expect} = require('@playwright/test');

class ApiUtils{
    constructor(apiContext){
        this.apiContext = apiContext;
    }

    async getUserCode(){
        const response = await this.apiContext.get('https://api.cv.review.aforsy.my.id/api/get-code');
        if(!response.ok){
            throw new Error(`Get Code Failed: ${response.message()}`);
        }

        const body = await response.json();
        const userCode = body.data.code;
        return userCode;
    }

    async injectLocalStrorage(page, userCode){
        await page.addInitScript((code) => {
            localStorage.setItem('hasValidatedCode', 'true');
            localStorage.setItem('hasSeenTutorial', 'true');
            localStorage.setItem('tutorialCompleted', 'true');
            localStorage.setItem('userCode', code);
        }, userCode);
    }
}

module.exports = { ApiUtils };