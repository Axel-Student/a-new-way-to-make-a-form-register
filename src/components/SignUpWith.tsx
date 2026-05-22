import { Box, Flex } from "@chakra-ui/react";
import { FaFacebook, FaGoogle, FaSpotify, FaEnvelope } from "react-icons/fa";
import type { ReactNode } from "react";

type SignUpWithProps = { onSelect: (provider: string) => void };

function DisabledProvider({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="neo-btn neo-btn-disabled" disabled title="Coming soon">
      {icon}
      {label}
      <span
        style={{
          fontSize: "9px",
          fontWeight: 800,
          letterSpacing: "0.5px",
          background: "#0d0d0d",
          color: "#ffe500",
          padding: "1px 5px",
          marginLeft: "2px",
        }}
      >
        SOON
      </span>
    </button>
  );
}

export function SignUpWith({ onSelect }: SignUpWithProps) {
  return (
    <Box
      style={{ borderTop: "3px solid #0d0d0d", background: "#fffbf0" }}
      p="4"
    >
      <button
        className="neo-btn neo-btn-yellow"
        style={{
          width: "100%",
          justifyContent: "center",
          fontSize: "15px",
          padding: "16px",
        }}
        onClick={() => onSelect("Email")}
      >
        <FaEnvelope />
        Continue with Email
      </button>

      {/* Divider */}
      <Flex align="center" gap="3" my="3">
        <Box style={{ flex: 1, height: "2px", background: "#0d0d0d" }} />
        <Box
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "1px",
            color: "#0d0d0d",
          }}
        >
          OR
        </Box>
        <Box style={{ flex: 1, height: "2px", background: "#0d0d0d" }} />
      </Flex>

      {/* Disabled providers */}
      <Flex gap="3" wrap="wrap" align={"center"}>
        <DisabledProvider icon={<FaGoogle />} label="Google" />
        <DisabledProvider icon={<FaFacebook />} label="Facebook" />
        <DisabledProvider icon={<FaSpotify />} label="Spotify" />
      </Flex>
    </Box>
  );
}
