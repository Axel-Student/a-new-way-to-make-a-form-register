import { BotTyping } from './components/BotTyping.tsx'
import './App.css'
import { InputGroup, Input, Button, Group } from '@chakra-ui/react'
import { RiArrowRightLine } from 'react-icons/ri'
import { SignUpWith } from './components/SignUpWith.tsx'
import { UserAnswer } from './components/UserAnswer.tsx'

function App() {
  return (
    <>
      <BotTyping text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptas praesentium incidunt, illo repudiandae, quas beatae hic ea molestiae quidem ad totam fuga velit aliquam alias quia nemo dolores dolorem." />
      <UserAnswer text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptas praesentium incidunt, illo repudiandae, quas beatae hic ea molestiae quidem ad totam fuga velit aliquam alias quia nemo dolores dolorem." />
      <SignUpWith />

      <Group
        mt="auto"
        gap="2"
        px="4"
        pb="4"
        textAlign="center"
        justifyContent="center"
      >
        <InputGroup flex="1" maxW="md">
          <Input placeholder="Username" />
        </InputGroup>
        <Button rounded="3xs" size={{ base: "md", md: "lg" }}>
          <RiArrowRightLine />
        </Button>
      </Group>
    </>
  )
}

export default App
