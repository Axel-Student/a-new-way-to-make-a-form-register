import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { BotMessage } from "./components/BotMessage.tsx";
import { BotTyping } from "./components/BotTyping.tsx";
import { SignUpWith } from "./components/SignUpWith.tsx";
import { UserAnswer } from "./components/UserAnswer.tsx";
import scenario from "./assets/scenario.json";
import "./App.css";

type QuestionKey = "name"
  | "signUp"
  | "email"
  | "password"
  | "confirmPassword"
  | "about"
  | "phone";

type Question = {
  key: QuestionKey;
  text: string;
  mode: "buttons" | "text";
  inputType?: "text" | "email" | "password" | "tel";
  placeholder?: string;
};

const QUESTIONS: Question[] = [
  {
    key: "name",
    text: scenario.botTyping.question1,
    mode: "text",
    placeholder: "your name",
  },
  { key: "signUp", text: scenario.botTyping.question2, mode: "buttons" },
  {
    key: "email",
    text: scenario.botTyping.question3,
    mode: "text",
    inputType: "email",
    placeholder: "you@example.com",
  },
  {
    key: "password",
    text: scenario.botTyping.question4,
    mode: "text",
    inputType: "password",
    placeholder: "at least 8 characters",
  },
  {
    key: "confirmPassword",
    text: scenario.botTyping.question5,
    mode: "text",
    inputType: "password",
    placeholder: "same password again",
  },
  {
    key: "about",
    text: scenario.botTyping.question6,
    mode: "text",
    placeholder: "a few words about you...",
  },
  {
    key: "phone",
    text: scenario.botTyping.question7,
    mode: "text",
    inputType: "tel",
    placeholder: "+33 6 ...",
  },
];

const ACKS = [
  scenario.botAnswering.answer1,
  scenario.botAnswering.answer2,
  scenario.botAnswering.answer3,
];

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  username?: string;
};

let idCounter = 0;
const nextId = () => ++idCounter;
const randAck = () => ACKS[Math.floor(Math.random() * ACKS.length)];

const TYPING_DELAY_MS = 500;

/* ── Password strength ── */
function pwdStrength(pwd: string): {
  level: 0 | 1 | 2 | 3;
  label: string;
  color: string;
} {
  if (!pwd) return { level: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { level: 1, label: "WEAK", color: "#ff3131" };
  if (score <= 3) return { level: 2, label: "OKAY", color: "#ff9900" };
  return { level: 3, label: "STRONG", color: "#00c853" };
}

/* ── Mask passwords in chat ── */
function displayText(text: string, q: Question): string {
  return q.inputType === "password" ? "•".repeat(text.length) : text;
}

function App() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pendingBots, setPendingBots] = useState<string[]>([
    scenario.botTyping.intro,
    QUESTIONS[0].text,
  ]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isTyping = pendingBots.length > 0;
  const acceptingInput = !isTyping && !done;
  const askingQ = QUESTIONS[currentQ];
  const strength = askingQ?.key === "password" ? pwdStrength(input) : null;

  /* Drain the pending bot queue one message at a time */
  useEffect(() => {
    if (pendingBots.length === 0) return;
    const id = setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId(), from: "bot", text: pendingBots[0] },
      ]);
      setPendingBots((p) => p.slice(1));
    }, TYPING_DELAY_MS);
    return () => clearTimeout(id);
  }, [pendingBots]);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Trigger shake then reset */
  function triggerError() {
    setHasError(true);
    setTimeout(() => setHasError(false), 400);
  }

  /* Per-field validation */
  function validate(text: string): string | null {
    switch (askingQ.key) {
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(text))
          return scenario.botErrors.emailInvalid;
        break;
      case "password":
        if (text.length < 8) return scenario.botErrors.passwordTooShort;
        break;
      case "confirmPassword":
        if (text !== answers.password)
          return scenario.botErrors.passwordMismatch;
        break;
      case "phone":
        if (!/^[+]?[\d\s\-().]{7,}$/.test(text))
          return scenario.botErrors.phoneInvalid;
        break;
      case "about":
        if (text.length < 5) return scenario.botErrors.aboutTooShort;
        break;
    }
    return null;
  }

  function submitAnswer(rawText: string) {
    if (!acceptingInput) return;
    const text = rawText.trim();

    /* Empty field — shake only, no message */
    if (!text) {
      triggerError();
      return;
    }

    const username = askingQ.key === "name" ? undefined : answers.name;

    const errorMsg = validate(text);
    if (errorMsg) {
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          from: "user",
          text: displayText(text, askingQ),
          username,
        },
      ]);
      setPendingBots((p) => [...p, errorMsg]);
      setInput("");
      triggerError();
      return;
    }

    /* Valid — advance the form */
    setMessages((m) => [
      ...m,
      {
        id: nextId(),
        from: "user",
        text: displayText(text, askingQ),
        username,
      },
    ]);
    setAnswers((a) => ({ ...a, [askingQ.key]: text }));
    setInput("");

    if (currentQ < QUESTIONS.length - 1) {
      const next = currentQ + 1;
      setCurrentQ(next);
      setPendingBots((p) => [...p, randAck(), QUESTIONS[next].text]);
    } else {
      setDone(true);
      setPendingBots((p) => [...p, randAck(), "Awesome — you're all set!"]);
    }
  }

  const progress = done ? 100 : (currentQ / QUESTIONS.length) * 100;

  return (
    <Flex direction="column" minH="100svh">
      {/* ── Header ── */}
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex={10}
        style={{ background: "#ffe500", borderBottom: "3px solid #0d0d0d" }}
        px="5"
        py="4"
      >
        <Flex justify="space-between" align="center" mb="3">
          <Text
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              letterSpacing: "-0.5px",
              color: "#0d0d0d",
            }}
          >
            REGISTER.
          </Text>
          <Box
            style={{
              border: "3px solid #0d0d0d",
              padding: "4px 12px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: "#0d0d0d",
              background: "#fff",
              boxShadow: "2px 2px 0 #0d0d0d",
            }}
          >
            {done ? "DONE ✓" : `${currentQ + 1} / ${QUESTIONS.length}`}
          </Box>
        </Flex>
        <div className="neo-progress-track">
          <div
            className="neo-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Box>

      {/* ── Messages ── */}
      <Flex direction="column" gap="2" flex="1" p="4" overflowY="auto">
        {messages.map((m) =>
          m.from === "bot" ? (
            <BotMessage key={m.id} text={m.text} />
          ) : (
            <UserAnswer key={m.id} text={m.text} />
          ),
        )}
        {isTyping && <BotTyping />}

        {/* Success card */}
        {done && !isTyping && (
          <Box
            className="msg-success"
            mt="3"
            style={{
              border: "3px solid #0d0d0d",
              background: "#ffe500",
              boxShadow: "6px 6px 0 #0d0d0d",
              padding: "28px 24px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
                fontSize: "36px",
                letterSpacing: "-1.5px",
                color: "#0d0d0d",
                lineHeight: 1,
              }}
            >
              YOU'RE IN.
            </Text>
            <Text
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "#0d0d0d",
                marginTop: "10px",
                opacity: 0.7,
              }}
            >
              Account created — welcome aboard.
            </Text>
          </Box>
        )}

        <Box ref={bottomRef} />
      </Flex>

      {/* ── Provider buttons ── */}
      {acceptingInput && askingQ.mode === "buttons" && (
        <SignUpWith onSelect={(provider) => submitAnswer(provider)} />
      )}

      {/* ── Text input ── */}
      {acceptingInput && askingQ.mode === "text" && (
        <Box
          style={{ borderTop: "3px solid #0d0d0d", background: "#fffbf0" }}
          p="4"
        >
          <Flex gap="3">
            <input
              className={`neo-input${hasError ? " neo-input-error" : ""}`}
              placeholder={askingQ.placeholder ?? "write something..."}
              type={askingQ.inputType ?? "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitAnswer(input);
              }}
              autoFocus
            />
            <button
              className="neo-btn neo-btn-send"
              onClick={() => submitAnswer(input)}
              aria-label="Send"
            >
              <RiArrowRightLine size={20} />
            </button>
          </Flex>

          {/* Password strength indicator */}
          {strength && strength.level > 0 && (
            <Box mt="2">
              <div className="pwd-strength-track">
                <div
                  className="pwd-strength-fill"
                  style={{
                    width: `${(strength.level / 3) * 100}%`,
                    background: strength.color,
                  }}
                />
              </div>
              <Text
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: strength.color,
                  marginTop: "4px",
                  letterSpacing: "0.5px",
                }}
              >
                {strength.label}
              </Text>
            </Box>
          )}

          <p className="enter-hint">
            Press <kbd>Enter ↵</kbd> to send
          </p>
        </Box>
      )}
    </Flex>
  );
}

export default App;
