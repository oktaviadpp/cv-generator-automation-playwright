# 📄 CV Generator Automation – Playwright

The automation is built using **Playwright Test** with **Page Object Model (POM)** to keep the code clean, scalable, and easy to maintain.

🔗 **Test Website :** https://cv.review.aforsy.my.id/cv-ats-generator
---

## ✅ What Is Covered

- 📝 Fill CV form with dynamic data  
- 📂 Import CV data from JSON file  
- 🔄 Generate & refresh CV preview  
- 📥 Download generated CV
- 📸 Capture screenshots on important steps  
- 🔌 Inject user code via API before UI test  

---

## 🛠 Tech Stack

- 🟨 JavaScript  
- 🎭 Playwright  
- 🟢 Node.js  
- 🎲 Faker (dynamic test data)  
- 🌱 Git  

---

## ⚙️ Setup & Installation

### 1. Install dependencies
Make sure Node.js is already installed on your machine.

```bash
npm install
```
### 2. Install Playwright browsers
```bash
npx playwright install
```
### 3. Run all tests
```bash
npx playwright test
```
### 4. Run a specific test file
```bash
npx playwright test tests/web-api-skip-generate-code-tutorial.spec.js --headed
```


