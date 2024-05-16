const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
// import { searchAdobe, searchQualtrics } from "./companies";

// Go through everysingle title, go to description, grab the requirements text, find experience years and skills.

// Now --------------
// Find entry level Software Engineer jobs at Utah companies

const UtahCompanies = [
  //   {
  //     companyName: "Sorenson",
  //     FilteredURL:
  //       "https://recruiting2.ultipro.com/SOR1001SORE/JobBoard/1fe5e40e-4e0c-4b11-86e3-9a8e1f396263/?q=&o=postedDateDesc&f5=xIKn0bPiEku4pQdds-6CmQ+aqi5uoXa-kWy23u2oiGC-A+yJ9c9kLIjUqZ_nEk7RAAkA+wjOrzqEsFk6uoZC_VDMj2A",
  //     className: "opportunity-link",
  //     jobTitle: "Software Engineer",
  //   },
  //   {
  //     companyName: "Cox",
  //     FilteredURL:
  //       "https://jobs.coxenterprises.com/en/jobs/?search=&req=software+engineer&location=Utah%2C+USA&type=&posted=3&pagesize=20&locname=Utah&lat=39.3209801&lng=-111.0937311#results",
  //     className: "stretched-link",
  //     jobTitle: "Software Engineer I",
  //   },
  {
    companyName: "Pluralsight",
    FilteredURL:
      "https://pluralsight.wd1.myworkdayjobs.com/en-US/Careers/?q=software%20engineer&locationCountry=bc33aa3152ec42d4995f4791a106ed09",
    className: "css-19uc56f",
    jobTitle: "Software Engineer",
  },
  {
    companyName: "Vivint",
    FilteredURL:
      "https://vivint.wd5.myworkdayjobs.com/vivintjobs?q=software%20engineer&locations=f70e457a468e1084450fed99703b1deb",
    className: "css-19uc56f",
    jobTitle: "Software Engineer",
  },
];



const commonSearch = async (driver, company) => {
  // launch the browser
  try {
    //   navigate to career page
    await driver.get(company.FilteredURL);
    // Wait until titles are visible
    await driver.wait(
      until.elementsLocated(By.className(company.className)),
      10000
    ); // waits up to 10 seconds
    let titles = await driver.findElements(
      By.className(`${company.className}`)
    );

    // Iterate over the list of elements and perform actions
    for (let title of titles) {
      const titleText = await title.getText();
      console.log(titleText); // Print the text content of each element
      if (titleText.toLowerCase() == company.jobTitle.toLowerCase()) {
        console.log("Found 1");
      }
      // 1. if the text contains software engineer, then click on it to see more details
      // 2. Look for experience word, and see how many years of experience required
      // 3. If entry level, then send notification
      // 4. If not entry level, then skip
    }
  } catch (error) {
    console.error(`Error processing ${company.companyName}: ${error}`);
  }
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const findUtahJobs = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // searchQualtrics(driver);
    // searchAdobe(driver);
    // searchDomo(driver);
    for (const company of UtahCompanies) {
      console.log(company.companyName);
      await commonSearch(driver, company);
    }
  } finally {
    await sleep(5000);
    await driver.quit();
  }
};

findUtahJobs();
