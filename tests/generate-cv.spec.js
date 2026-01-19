import { test,expect  } from "@playwright/test";

test ('01-generate cv successfullt', async ({page})=> {
    await page.goto('https://cv.review.aforsy.my.id/');

    //Input Access Code
    const buttonGenerateNewCode = page.getByRole("button", {name:"Generate New Code"});
    const textGenerateCode = page.locator("p.tracking-wider");
    const buttonContinuePlatform = page.getByRole("button", {name:"OK - Continue to Platform"});

    await buttonGenerateNewCode.click();
    await expect(textGenerateCode).toBeVisible();
    await buttonContinuePlatform.click();

    //Tutorial Process
    const buttonNext = page.getByRole("button", {name:"Next"});
    const buttonGetStarted = page.getByRole("button", {name:"Get Started"});

    
    while(await buttonNext.isVisible()){
        await buttonNext.click();
    }
    
    if(await buttonGetStarted.isVisible()){
        await buttonGetStarted.click();
    }

    //Generate CV Process
    const buttonMenuBuildYourCV = page.getByRole("link", {name:"Build Your CV"})

    await expect(buttonMenuBuildYourCV).toBeVisible();
    await buttonMenuBuildYourCV.click();
    await expect(buttonNext).toBeVisible();
});