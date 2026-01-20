export class Globals{
    constructor(page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('https://cv.review.aforsy.my.id/');
    }

    async takeScreenshot(filename){
        await this.page.screenshot({
            path:`screenshots/${filename}.png`,
            fullPage: true
        });
    }
}