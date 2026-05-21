import { Button, Flex } from "@chakra-ui/react";
import { FaFacebook, FaGoogle, FaSpotify } from "react-icons/fa";

export function SignUpWith() {
  return (
    <>
      <Flex width="100%" gap="2" justifyContent="center">
        <Button rounded="3xl" size={{ base: "md", md: "lg" }}>
          <FaGoogle />
          Google
        </Button>
        <Button rounded="3xl" size={{ base: "md", md: "lg" }}>
          <FaFacebook />
          Facebook
        </Button>
        <Button rounded="3xl" size={{ base: "md", md: "lg" }}>
          <FaSpotify />
          Spotify
        </Button>
      </Flex>

    </>
  )

}
