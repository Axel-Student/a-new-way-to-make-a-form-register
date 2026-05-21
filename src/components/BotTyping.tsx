import { Avatar, AvatarGroup, Card, Flex, SkeletonText, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"


type BotTypingProps = {
  text: string
}

export function BotTyping({ text }: BotTypingProps) {

  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTyping(false)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <Card.Root size="md" border="0">
        <Card.Body color="fg.muted">
          <Flex gap="2" align="center">
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
            {isTyping ? (
              <Flex gap="1" align="center" justify="space-between">
                <SkeletonText noOfLines={1} width="10px" />
                <SkeletonText noOfLines={1} width="10px" />
                <SkeletonText noOfLines={1} width="10px" />
              </Flex>
            ) : (
              <Text textStyle="sm">{text}</Text>
            )}
          </Flex>
        </Card.Body>
      </Card.Root>


    </>
  )
}
