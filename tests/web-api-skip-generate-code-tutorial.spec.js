import {test, expect, request} from "@playwright/test";
const {ApiUtils} = require('./utils/api-utils.spec');

test('01-generate cv without generate code and tutorial successfully', async ({page})=> {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);

    const userCode = await apiUtils.getUserCode();
    await apiUtils.injectLocalStrorage(page, userCode);

    await page.goto('https://cv.review.aforsy.my.id/');

    //Generate CV Process
    const buttonMenuBuildYourCV = page.getByRole("link", {name:"Build Your CV"})
    const buttonNext = page.getByRole("button", {name:"Next"});
    

    await expect(buttonMenuBuildYourCV).toBeVisible();
    await buttonMenuBuildYourCV.click();
    await expect(buttonNext).toBeVisible();
});