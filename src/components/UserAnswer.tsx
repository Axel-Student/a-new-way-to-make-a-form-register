import { Box, Flex, Text } from "@chakra-ui/react";

type UserAnswerProps = { text: string; username?: string };

export function UserAnswer({ text, username }: UserAnswerProps) {
  return (
    <Flex
      direction="column"
      align="flex-end"
      className="msg-user"
      mb="1"
      gap="1"
    >
      {username && (
        <Text
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "10px",
            letterSpacing: "1px",
            color: "#0d0d0d",
            opacity: 0.6,
            marginRight: "4px",
          }}
        >
          {username.toUpperCase()}
        </Text>
      )}
      <Box
        style={{
          background: "#ffe500",
          border: "3px solid #0d0d0d",
          boxShadow: "4px 4px 0 #0d0d0d",
          padding: "12px 16px",
          maxWidth: "75%",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          color: "#0d0d0d",
          lineHeight: 1.55,
        }}
      >
        {text}
      </Box>
    </Flex>
  );
}
