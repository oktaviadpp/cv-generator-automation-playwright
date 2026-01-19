import {test, expect, request} from "@playwright/test";
import {CvGenerator} from "./pages/CvGenerator.js";
const {ApiUtils} = require('./utils/api-utils.js');

test('01-generate cv without generate code and tutorial successfully', async ({page})=> {
    //inject userCode to Local storage
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);

    const userCode = await apiUtils.getUserCode();
    await apiUtils.injectLocalStrorage(page, userCode);
    
    //Create CvGenerator object
    const cvGenerator = new CvGenerator(page);
    
    //Generate CV Process
    await page.goto('https://cv.review.aforsy.my.id/');
    await cvGenerator.BuildYourCV();

});