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

export { searchAdobe, searchQualtrics };
