"use client";
import { Box, Button, Center } from "@chakra-ui/react";
// import { useRouter } from "next/navigation";
import JobStatus from "./compnents/JobStatus";

export default function Home() {
  // const router = useRouter();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100vw"}
    >
      {/* hello */}
      {/* <Button onClick={() => router.push("/home")}>Home</Button> */}
      <JobStatus />
    </Box>
  );
}

// try {
//   //navigate to facebook login page
//   await driver.get("https://test-login-app.vercel.app/");
//   // Select input elements and fill them out
//   await driver.findElement(By.id("email")).sendKeys("test3@gmail.com");
//   await driver.findElement(By.id("password")).sendKeys("Password@12345");
//   // Select login button and invoke click action
//   //If login details are correct we wiil be redirected to the welcome page
//   await driver.findElement(By.name("login")).click();
//   //On succesful login get page title
//   //Check page title, to confirm login was successful
//   const pageTitle = await driver.getTitle();
//   // assert usign node assertion
//   assert.strictEqual(pageTitle, "Welcomepage");
//   //Check if redirect to login page was successfull
//   await driver.wait(until.titleIs("Welcomepage"), 4000);
// } finally {
//   await driver.quit();
// }
