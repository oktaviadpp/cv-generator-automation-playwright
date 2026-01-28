import {test, expect, request} from "@playwright/test";
import {CvGenerator} from "./pages/CvGenerator.js";
const {ApiUtils} = require('./utils/api-utils.js');

test('02-import template cv successfully', async ({page}, testInfo)=> {
    //inject userCode to Local storage
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext);

    const userCode = await apiUtils.getUserCode();
    await apiUtils.injectLocalStrorage(page, userCode);
    
    //Create CvGenerator object
    const cvGenerator = new CvGenerator(page);

    await cvGenerator.importCV();
    await cvGenerator.newTabHtml();

});
