import {Globals} from "./Globals.js";

export class CvGenerator {
    constructor (page){
        this.page = page;
        this.buttonNext = page.getByRole("button", {name:"Next"});
        this.globals = new Globals(page);

        //Personal Info
        this.name = page.locator("#name");
        this.email = page.locator("#email");
        this.phone = page.locator("#phone");
        this.location = page.locator("#location");
        this.linkedin = page.locator("#linkedin");
        this.github = page.locator("#github");
        this.portfolio = page.locator("#portfolio");
        this.summary = page.locator("#summary");
        this.languages = page.locator("#languages");
        this.buttonMenuBuildYourCV = page.getByRole("link", {name:"Build Your CV"});

        //Experience
        
    }

    async BuildYourCV(){
        await this.globals.goto();
        await this.buttonMenuBuildYourCV.click();
        await this.name.fill("Oktavia Dwi Putri Permatasari");
        await this.email.fill("oktaviadwiputri506@gmail.com");
        await this.phone.fill("082311439450");
        await this.location.fill("Jakarta");
        await this.linkedin.fill("https://www.linkedin.com/in/oktaviadpp/");
        await this.github.fill("https://github.com/oktaviadpp");
        await this.portfolio.fill("https://github.com/oktaviadpp");
        await this.summary.fill("I am an Information System graduate and have over 1,5+ years of work experience Quality Assurance and Software Tester. Proficient in various testing methodologies, including manual and automation testing, with expertise in utilizing tools such as Katalon for automation. Skilled in API testing, performance testing, test case development, and bug reporting. Experience in preparing design documents for several government projects. Committed to continuous learning and improvement to stay updated with the latest technologies and industry best practices in Quality Assurance.");
        await this.languages.fill("Indonesia");
        await this.globals.takeScreenshot('CVGenerator-personal-info');
        await this.buttonNext.click();

    }
};