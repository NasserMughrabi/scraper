//   {
//       companyName: "Adobe",
//       FilteredURL:
//         "https://careers.adobe.com/us/en/search-results?keywords=software%20engineer",
//       className: "job-title",
//       jobTitle: "Software Development Engineer",
//     }
const searchAdobe = async (driver) => {
  //   try {
  //     //   navigate to career page
  //     await driver.get(
  //       "https://www.qualtrics.com/careers/us/en/search-results?m=3&keywords=software%20engineer"
  //     );
  //     let titles = await driver.findElements(By.className(`job-title`));
  //     let locations = await driver.findElements(By.className(`job-location`));
  //     // Iterate over the list of elements and perform actions
  //     for (let i = 0; i < titles.length; i++) {
  //       const titleText = await titles[i].getText();
  //       const locationText = await locations[i].getText();
  //       console.log(titleText, locationText);
  //       if (
  //         titleText.toLowerCase() == "software engineer i" &&
  //         locationText.toLowerCase().includes("utah")
  //       ) {
  //         console.log("Found 1");
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Error processing Qualtrics: ${error}`);
  //   }
};

// {
//     companyName: "Qualtrics",
//     FilteredURL:
//       "https://www.qualtrics.com/careers/us/en/search-results?m=3&keywords=software%20engineer",
//     className: "job-title",
//     jobTitle: "Software Engineer I",
//     location: "job-location",
//   }
const searchQualtrics = async (driver) => {
  try {
    //   navigate to career page
    await driver.get(
      "https://www.qualtrics.com/careers/us/en/search-results?m=3&keywords=software%20engineer"
    );
    let titles = await driver.findElements(By.className(`job-title`));
    let locations = await driver.findElements(By.className(`job-location`));

    // Iterate over the list of elements and perform actions
    for (let i = 0; i < titles.length; i++) {
      const titleText = await titles[i].getText();
      const locationText = await locations[i].getText();
      console.log(titleText, locationText);
      if (
        titleText.toLowerCase() == "software engineer i" &&
        locationText.toLowerCase().includes("utah")
      ) {
        console.log("Found 1");
      }
    }
  } catch (error) {
    console.error(`Error processing Qualtrics: ${error}`);
  }
};

const searchDomo = async (driver) => {
  try {
    //   navigate to career page
    await driver.get("https://www.domo.com/company/careers/all");
    await driver.wait(until.elementsLocated(By.tagName("tr")), 10000);
    let titles = await driver.findElements(By.tagName(`tr`));

    // Iterate over the list of elements and perform actions
    for (let i = 0; i < titles.length; i++) {
      const titleText = await titles[i].getText();
      console.log(titleText);
      if (
        titleText.toLowerCase().includes("software") &&
        titleText.toLowerCase().includes("utah")
      ) {
        console.log("Found 1");
      }
    }
  } catch (error) {
    console.error(`Error processing Domo: ${error}`);
  }
};

const searchFusion = async (driver) => {
  // launch the browser
  try {
    //   navigate to career page
    await driver.get("https://fusion360agency.com/careers/");
    // await driver.wait(until.elementsLocated(By.css("div > div > div > h3:nth-child(12) > a")), 50000); // waits up to 10 seconds
    let titles = await driver.findElements(By.css("div > div > div > h3 > a"));

    // Iterate over the list of elements and perform actions
    for (let title of titles) {
      const titleText = await title.getText();
      console.log(titleText); // Print the text content of each element
      if (titleText.toLowerCase().includes("developer")) {
        console.log("Found 1 -------------------------");
      }
    }
  } catch (error) {
    console.error(`Error processing: ${error}`);
  }
};

const searchBambooHR = async (driver) => {
  // launch the browser
  try {
    //   navigate to career page
    await driver.get(
      "https://www.bamboohr.com/careers/#explore-all-bamboohr-jobs"
    );
    await driver.wait(
      until.elementsLocated(
        By.css("div > ul > div:nth-child(3) > div > div > div > h4 > a")
      ),
      10000
    ); // waits up to 10 seconds
    let titles = await driver.findElements(
      By.css("div > ul > div:nth-child(3) > div> div > div > h4 > a")
    );

    // Iterate over the list of elements and perform actions
    for (let title of titles) {
      const titleText = await title.getText();
      console.log(titleText); // Print the text content of each element
      if (titleText.toLowerCase().includes("developer")) {
        console.log("Found 1 -------------------------");
      }
    }
  } catch (error) {
    console.error(`Error processing: ${error}`);
  }
};

const searchPodium = async (driver) => {
  try {
    //   navigate to career page
    await driver.get("https://boards.greenhouse.io/podium81/");
    let titles = await driver.findElements(By.className(`opening`));
    let locations = await driver.findElements(By.className(`location`));

    // Iterate over the list of elements and perform actions
    for (let i = 0; i < titles.length; i++) {
      const titleText = await titles[i].getText();
      const locationText = await locations[i].getText();
      console.log(titleText);
      if (
        titleText.toLowerCase().includes("software") &&
        locationText.toLowerCase().includes("utah")
      ) {
        console.log("Found 1 ----------------------------------------");
      }
    }
  } catch (error) {
    console.error(`Error processing Qualtrics: ${error}`);
  }
};

export { searchAdobe, searchQualtrics };
