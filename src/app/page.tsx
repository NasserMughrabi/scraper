"use client";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      router.replace("/home");
    }
  }, [router]);

  return <Box>Redirecting...</Box>;
}
