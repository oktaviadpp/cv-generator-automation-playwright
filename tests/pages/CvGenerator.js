import { expect } from "@playwright/test";
import {Globals} from "./Globals.js";

export class CvGenerator {
    constructor (page){
        this.page = page;
        this.buttonNext = page.getByRole("button", {name:"Next"});
        this.globals = new Globals(page);
        this.buttonAdd = page.getByRole('button', { name: 'Add', exact: true });
        this.cardInput = page.locator("div.grid-cols-1");

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
        this.jobTitle = page.locator('input[name$=".title"]');
        this.company = page.locator('input[name$=".company"]');
        this.workExperienceLocation = page.locator('input[name$=".location"]');
        this.duration = page.locator('input[name$=".duration"]');
        this.description = page.locator('textarea[name$=".description"]');
        
        //Education 
        this.degree = page.locator("input[name$='.degree']");
        this.school = page.locator("input[name$='.school']");
        this.gpa = page.locator("input[name$='.gpa']");
        this.year = page.locator("input[name$='.year']");

        //Project & Certification
        this.projectTitle = page.locator('input[name$="title"]');
        this.projectPlace = page.locator('input[name$="place"]');
        this.projectCompany = page.locator('input[name$="company"]');
        this.projectLocation = page.locator('input[name$="location"]');
        this.projectDuration = page.locator('input[name$="duration"]');
        this.projectDate = page.locator('input[name$="date"]');
        this.projectDescription = page.locator('textarea[name$="description"]');

        //Skill 
        this.skillLanguages = page.locator('input[name$="Languages"]');
        this.skillFrameworks = page.locator('input[name$="Frameworks & Libraries"]');
        this.skillDatabases = page.locator('input[name$="Databases"]');
        this.skillTools = page.locator('input[name$="Tools & Technologies"]');
        this.skillOtherSkills = page.locator('input[name$="Other Skills"]');
        this.buttonGenerateResume = page.getByRole('button', {name:"Generate Resume"})

        //CV Preview
        this.buttonRefresh = page.getByRole('button', {name:"Refresh"});
        this.buttonDownload = page.getByRole('button', {name:"Download"});
        this.alertSuccess = page.locator('div.opacity-90:has-text("CV list refreshed successfully.")');
        this.alertDownload = page.locator('div.text-sm:has-text("Download Started")');
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
        //define experience data
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
        ];

        console.log ("experience length",experience.length);

        //looping card input by experiece.length
        for(let i=0; i < experience.length; i++){
            if(i >= await this.cardInput.count()){
                console.log ("cardExperience length", await this.cardInput.count());
                await this.buttonAdd.click();
                await expect(this.cardInput).toHaveCount(i+1);
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

    async Education(){
        const education = [
            {
                degree : "Bachelor's Degree of Information Systems",
                school : "Open University (UT)",
                gpa : "-",
                year : "Oct 2025 - Present"
            },
            {
                degree : "Diplomas's Degree of Information Systems",
                school : "Brawijaya University",
                gpa : "3.86",
                year : "Aug 2019 - Jan 2023"
            }
        ];

        //looping card input by experiece.length
        for(let i=0; i < education.length; i++){
            if(i >= await this.cardInput.count()){
                await this.buttonAdd.click();
                await expect(this.cardInput).toHaveCount(i+1);
            }

            const data = education[i];
            await this.degree.nth(i).fill(data.degree);
            await this.school.nth(i).fill(data.school);
            await this.gpa.nth(i).fill(data.gpa);
            await this.year.nth(i).fill(data.year);
        }
        await this.globals.takeScreenshot('CVGenerator-education');
        await this.buttonNext.click();
    }

    async ProjectCertification(){
        const projectCertification = [
            {
                projectTitle : "Certificate in Quality Assurance Automation",
                projectPlace : "Online",
                projectCompany : "Binar Academy",
                projectLocation : "Online",
                projectDuration : "4 months",
                projectDate : "May 2023 - Aug 2023",
                projectDescription : "Automation testing with Katalon, Newman/Postman, JMeter, Android, and Web."
            }
        ];

        for(let i=0; i < projectCertification.length; i++){
            if(i >= await this.cardInput.count()){
                await this.buttonAdd.click();
                await expect(this.cardInput).toHaveCount(i+1);
            }

            const data = projectCertification[i];

            await this.projectTitle.nth(i).fill(data.projectTitle);
            await this.projectPlace.nth(i).fill(data.projectPlace);
            await this.projectCompany.nth(i).fill(data.projectCompany);
            await this.projectLocation.nth(i).fill(data.projectLocation);
            await this.projectDuration.nth(i).fill(data.projectDuration);
            await this.projectDate.nth(i).fill(data.projectDate);
            await this.projectDescription.nth(i).fill(data.projectDescription);
        }
        await this.globals.takeScreenshot('CVGenerator-project-certification');
        await this.buttonNext.click();
    }

    async Skill(){
        await this.skillLanguages.fill("JavaScript, PHP, HTML");
        await this.skillFrameworks.fill("Laravel");
        await this.skillDatabases.fill("MySQL, Postgre SQL");
        await this.skillTools.fill("Katalon, Postman, Newman, JMeter");
        await this.skillOtherSkills.fill("Agile, Scrum");
        await this.globals.takeScreenshot('CVGenerator-skill');
    }

    async GenerateDownloadCV(){
        await this.buttonGenerateResume.click(); 
        await this.alertSuccess.waitFor();
        await expect(this.alertSuccess).toBeVisible();
        await this.globals.takeScreenshot('CVGenerator-preview-CV');
        await this.page.waitForTimeout(7000);
        await this.buttonRefresh.click();
        await this.buttonDownload.waitFor();
        await this.buttonDownload.click();
        await this.alertDownload.waitFor();
        await expect(this.alertDownload).toBeVisible();
        await this.globals.takeScreenshot('CVGenerator-download-CV');
    }

};