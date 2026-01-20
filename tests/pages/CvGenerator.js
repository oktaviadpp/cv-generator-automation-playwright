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

        //Work Experience
        this.cardExperience = page.locator("div.grid.mb-4");
        this.buttonAdd = page.getByRole('button', { name: 'Add', exact: true });
        this.jobTitle = page.locator('input[name$=".title"]');
        this.company = page.locator('input[name$=".company"]');
        this.workExperienceLocation = page.locator('input[name$=".location"]');
        this.duration = page.locator('input[name$=".duration"]');
        this.description = page.locator('textarea[name$=".description"]');        
    }

    async PersonalInfo(){
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

    async WorkExperience(){
        const experience = [
            {
                title : 'Quality Assurance Analyst',
                company : "PT. METROCOM JADDI TECHNOLOGY",
                workExperienceLocation : "JAKARTA",
                duration : "Oct 2024 – Present",
                description : "Developed and executed automated API test scenarios using Postman, Newman, and JMeter",
            },
            {
                title : 'QUALITY ASSURANCE - FREELANCE',
                company : "PT. FINNET INDONESIA",
                workExperienceLocation : "JAKARTA",
                duration : "Jan 2024 – Jan 2026",
                description : "Created and executed automated test cases for functional Web UI testing using Katalon Studio and Newman",
            },
            {
                title : 'SOFTWARE TESTER',
                company : "PT. KNITTO TEKSTIL INDONESIA",
                workExperienceLocation : "BANDUNG",
                duration : "Jan 2024 – Oct 2024",
                description : "Understand the flowchart, design UI, and Business Requirements Document (BRD) prepared by the system analyst.",
            },
            {
                title : 'QUALITY ASSURANCE AND ANALYST',
                company : "PROFILE IMAGE STUDIO",
                workExperienceLocation : "MALANG",
                duration : "Oct 2022 – Dec 2023",
                description : "Design 3 documents requirement such as PRD, UML Diagram, and Flowchart for 2 government project Batu City and Public Worksand Water Resources Department East Java",
            },
        ]

        console.log ("experience length",experience.length);

        for(let i=0; i < experience.length; i++){
            if(i >= await this.cardExperience.count()){
                console.log ("cardExperience length", await this.cardExperience.count());
                await this.buttonAdd.click();
                await this.cardExperience.nth(i).waitFor();
            }

            const data = experience[i];

            await this.jobTitle.nth(i).fill(data.title);
            await this.company.nth(i).fill(data.company);
            await this.workExperienceLocation.nth(i).fill(data.workExperienceLocation);
            await this.duration.nth(i).fill(data.duration);
            await this.description.nth(i).fill(data.description);
        }
        await this.globals.takeScreenshot('CVGenerator-work-experience');
        await this.buttonNext.click();
    }
};