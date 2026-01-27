import { expect } from "@playwright/test";
import {Globals} from "./Globals.js";
import { faker } from "@faker-js/faker";
import path from 'path';
import fs from 'fs';

export class CvGenerator {
    constructor (page){
        this.page = page;
        faker.locale = 'id_ID';
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
        this.buttonGenerateResume = page.getByRole('button', { name: 'Generate Resume' }).nth(1);

        //CV Preview
        this.buttonRefresh = page.getByRole('button', {name:"Refresh"});
        this.buttonDownload = page.getByRole('button', {name:"Download"});
        this.alertSuccess = page.locator('div.opacity-90:has-text("CV list refreshed successfully.")');
        this.alertDownload = page.locator('div.text-sm:has-text("Download Started")');

        //Import CV 
        this.buttonImport = page.getByRole('button', {name:"Import"});
        this.uploadImport = page.locator('label input[type="file"][accept=".json"]');
        this.alertImportSuccess = page.locator('div.opacity-90:has-text("Form fields have been populated.")');
        this.buttonReview = page.getByRole('button', { name: 'Review', exact: true });
        
    }

    async PersonalInfo(){
        const fakerName = faker.person.fullName();
        const fakerEmail = faker.internet.email();
        const fakerPhone = faker.phone.number({ style: 'international' });
        const normalizePhone = fakerPhone.replace(/[\s-]/g, '');
        const fakerLocation = faker.location.city();
        const fakerNameForUrl = fakerName.toLowerCase().replace(/\s+/g, '-');
        const fakerLinkedln = `https://www.linkedin.com/in/${fakerNameForUrl}`;
        const fakerGithub = `https://github.com/${fakerNameForUrl}`;
        const fakerPortfolio = `https://github.com/${fakerNameForUrl}`;
        const fakerSummary = faker.lorem.paragraph();
        const fakerLanguages = faker.location.country();

        await this.globals.goto();
        await this.buttonMenuBuildYourCV.click();
        await this.name.fill(fakerName);
        await this.email.fill(fakerEmail);
        await this.phone.fill(normalizePhone);
        await this.location.fill(fakerLocation);
        await this.linkedin.fill(fakerLinkedln);
        await this.github.fill(fakerGithub);
        await this.portfolio.fill(fakerPortfolio);
        await this.summary.fill(fakerSummary);
        await this.languages.fill(fakerLanguages);
        await this.globals.takeScreenshot('CVGenerator-personal-info');
        await this.buttonNext.click();
    }

    async WorkExperience(){
        //define experience data
        const title = ['Software Engineer', 'QA Engineer', 'Product Manager', 'DevOps', 'Data Analyst']
        const company = ['Google', 'Microsoft', 'Meta', 'Netflix', 'Tesla'];

        const maxRetry = 5;
        //looping card input by experiece.length
        for(let i=0; i < maxRetry; i++){
            const fakerTitle = faker.helpers.arrayElement(title);
            const fakerCompany = faker.helpers.arrayElement(company);
            const fakerWorkLocation = faker.location.city();
            const fakerDuration = faker.date.month();
            const fakerDescription = faker.lorem.sentence();

            if(i >= await this.cardInput.count()){
                console.log ("cardExperience length", await this.cardInput.count());
                await this.buttonAdd.click();
                // await expect(this.cardInput).toHaveCount(i+1);
                await this.cardInput.nth(i).waitFor({state: 'visible'});
            }

            const card = this.cardInput.nth(i);
            await card.locator('input[name$=".title"]').fill(fakerTitle);
            await card.locator('input[name$=".company"]').fill(fakerCompany);
            await card.locator('input[name$=".location"]').fill(fakerWorkLocation);
            await card.locator('input[name$=".duration"]').fill(fakerDuration);
            await card.locator('textarea[name$=".description"]').fill(fakerDescription);;
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

    async GenerateDownloadCV(testInfo, filename){
        await this.buttonGenerateResume.click(); 
        await this.alertSuccess.waitFor();
        await expect(this.alertSuccess).toBeVisible();
        await this.globals.takeScreenshot('CVGenerator-preview-CV');

        let cv;
        let attempt = 0;
        let maxRetry = 5;

        while(!cv && attempt < maxRetry){
            await this.buttonRefresh.click()
            await this.page.waitForTimeout(3000);
            let downloadVisible = await this.buttonDownload.isVisible();

            attempt++;

            if(downloadVisible == true){
                const [ download ] = await Promise.all([
                    this.page.waitForEvent('download'),
                    this.buttonDownload.click()
                ]);

                const downloadDir = path.resolve('downloads');
                if (!fs.existsSync(downloadDir)) {
                    fs.mkdirSync(downloadDir, { recursive: true });
                
                }
                const fileName = download.suggestedFilename();
                console.log('fileName',fileName);
                
                const filePath = path.join(downloadDir, fileName);
                console.log("Download saved to =", filePath);

                await download.saveAs(filePath);

                await this.alertDownload.waitFor();
                await expect(this.alertDownload).toBeVisible();
                await this.globals.takeScreenshot('CVGenerator-download-CV');
               
                return {
                    filePath,
                    fileName: filePath
                };
            }
            
        }        
    }

    async importCV(){
        await this.globals.goto();
        await this.buttonMenuBuildYourCV.click();
        const filePath = path.resolve(__dirname, '../../data-tests/cv-template.json');
        // await this.buttonImport.click();
        await this.uploadImport.waitFor({state : 'attached'});
        await this.uploadImport.setInputFiles(filePath);
        await expect(this.alertImportSuccess).toBeVisible();
        await this.globals.takeScreenshot('Import-CV');
        await this.buttonReview.click();
    }
};