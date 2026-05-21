import { Card, Flex, Text } from "@chakra-ui/react"


type UserAnswerProps = {
  text: string
}

export function UserAnswer({ text }: UserAnswerProps) {
  return (
    <>
      <Card.Root size="md" border="0" width="100%">
        <Card.Body color="fg.muted">
          <Flex justify="flex-end" width="100%">
            <Text
              textStyle="sm"
              textAlign="right"
              bg="bg.muted"
              px="4"
              py="2"
              borderRadius="xl"
              maxW="70%"
            >
              {text}
            </Text>
          </Flex>
        </Card.Body>
      </Card.Root>
    </>
  )
}
