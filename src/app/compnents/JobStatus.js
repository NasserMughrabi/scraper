import React from "react";
import {
  Box,
  Button,
  Circle,
  Text,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const JobStatus = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const totalSteps = 5;
  const steps = ["Applied", "Interview", "Offer"];

  const onStepForward = () => {
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  const onStepBack = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent={"center"}
      height={"20px"}
    >
      {/* <Stack direction="row" spacing={4}>
        <Button onClick={onStepBack} isDisabled={currentStep === 0}>
          Step Back
        </Button>
        <Button
          onClick={onStepForward}
          isDisabled={currentStep === totalSteps - 1}
        >
          Step Forward
        </Button>
      </Stack> */}
      <Flex direction="row" mt={4} align="center" justify="center" spacing={2}>
        {steps.map((step, index) => (
          <ProgressStep
            key={index}
            title={step}
            stepNumber={index}
            isCurrent={index === currentStep}
            isCompleted={index < currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </Flex>
    </Stack>
  );
};

const ProgressStep = ({
  title,
  isCurrent,
  isCompleted,
  stepNumber,
  isLast,
}) => {
  const colorScheme = useColorModeValue(
    { bg: "gray.100", completed: "green.500", current: "blue.500" },
    { bg: "gray.700", completed: "green.200", current: "blue.200" }
  );

  return (
    <Box>
      <Flex align="center">
        <Circle
          size="25px"
          bg={
            isCompleted
              ? colorScheme.completed
              : isCurrent
              ? colorScheme.current
              : colorScheme.bg
          }
          color="white"
          borderWidth="2px"
          borderColor={isCurrent ? colorScheme.current : "transparent"}
        >
          <Text fontSize="sm">{stepNumber + 1}</Text>
        </Circle>
        {!isLast && (
          <Box
            width="100px"
            height="2px"
            bg={isCompleted ? colorScheme.completed : colorScheme.bg}
          />
        )}
      </Flex>
      <Text
        pr={"5px"}
        color={isCompleted || isCurrent ? "gray.100" : "gray.400"}
      >
        {title}
      </Text>
    </Box>
  );
};

export default JobStatus;
