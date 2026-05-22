import { Box, Flex } from "@chakra-ui/react";

type BotMessageProps = { text: string };

export function BotMessage({ text }: BotMessageProps) {
  return (
    <Flex align="flex-start" gap="3" className="msg-bot" mb="1">
      <Box
        flexShrink={0}
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #0d0d0d",
          background: "#ffe500",
          backgroundImage: "url('https://img.freepik.com/premium-photo/female-customer-support-agent-working-call-center-generative-ai_719646-12813.jpg')",
          boxShadow: "2px 2px 0 #0d0d0d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: "10px",
          letterSpacing: "0.5px",
          color: "#0d0d0d",
          flexShrink: 0,
        }}
      >
      </Box>
      <Box
        style={{
          background: "#fff",
          border: "3px solid #0d0d0d",
          boxShadow: "4px 4px 0 #0d0d0d",
          padding: "12px 16px",
          maxWidth: "75%",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
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
