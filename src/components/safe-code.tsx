import { useCallback, useEffect, useRef, useState } from "react";
import lock from "../assets/sounds/lock.mp3";
import som1 from "../assets/sounds/som-1.mp3";
import som2 from "../assets/sounds/som-2.mp3";
import unlock from "../assets/sounds/unlock.mp3";
import Counter from "../components/ui/counter";
import generateCode from "../helpers/generateCode";

const INITIAL_PAIRS = { 1: 0, 2: 0, 3: 0 };
const MAX_PAIR_VALUE = 99;
const MIN_PAIR_VALUE = 0;
const FEEDBACK_DURATION = 700;
const MAX_PAIRS = 3;
const MIN_PAIRS = 1;

export default function SafeCode() {
  const [code, setCode] = useState(() => generateCode());

  const safeAreaRef = useRef<HTMLDivElement>(null);
  const successTimeoutRef = useRef<number>(0);
  const errorTimeoutRef = useRef<number>(0);
  const hitSound = useRef(new Audio(som1));
  const normalSound = useRef(new Audio(som2));
  const unlockSound = useRef(new Audio(unlock));
  const lockSound = useRef(new Audio(lock));

  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [selectedPair, setSelectedPair] = useState<number>(1);
  const [pairs, setPairs] = useState<Record<number, number>>(INITIAL_PAIRS);

  const incrementPair = useCallback(() => {
    setPairs((prev) => ({
      ...prev,
      [selectedPair]:
        prev[selectedPair] >= MAX_PAIR_VALUE ? MIN_PAIR_VALUE : prev[selectedPair] + 1,
    }));
  }, [selectedPair]);

  const decrementPair = useCallback(() => {
    setPairs((prev) => ({
      ...prev,
      [selectedPair]:
        prev[selectedPair] <= MIN_PAIR_VALUE ? MAX_PAIR_VALUE : prev[selectedPair] - 1,
    }));
  }, [selectedPair]);

  const handleSendCode = useCallback(() => {
    const isCodeCorrect = code.every((digit, index) => pairs[index + 1] === digit);

    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

    if (isCodeCorrect) {
      setSucess(true);
      unlockSound.current.play().catch(console.warn);
      successTimeoutRef.current = setTimeout(() => {
        setSucess(false);
      }, FEEDBACK_DURATION);
    } else {
      setError(true);
      lockSound.current.play().catch(console.warn);
      errorTimeoutRef.current = setTimeout(() => {
        setError(false);
      }, FEEDBACK_DURATION);
    }
  }, [code, pairs]);

  const handleChangeSelectedPair = useCallback(() => {
    setSelectedPair((prev) => (prev === MAX_PAIRS ? MIN_PAIRS : prev + 1));
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyActions: Record<string, () => void> = {
        ArrowRight: () => setSelectedPair((prev) => Math.min(prev + 1, MAX_PAIRS)),
        ArrowLeft: () => setSelectedPair((prev) => Math.max(prev - 1, MIN_PAIRS)),
        ArrowUp: incrementPair,
        ArrowDown: decrementPair,
        Tab: () => {
          handleChangeSelectedPair();
          safeAreaRef.current?.focus();
        },
        Enter: handleSendCode,
      };

      const action = keyActions[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    },
    [incrementPair, decrementPair, handleChangeSelectedPair, handleSendCode]
  );

  function handleRevealCode() {
    setPairs({ 1: code[0], 2: code[1], 3: code[2] });
  }

  function handleChangeCode() {
    setCode(generateCode());
    setPairs(INITIAL_PAIRS);
    setSelectedPair(1);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPair, pairs, code]);

  useEffect(() => {
    if (safeAreaRef.current) {
      safeAreaRef.current.focus();
    }

    function handleGlobalFocus(event: FocusEvent) {
      const target = event.target as HTMLElement;
      if (
        target &&
        target !== safeAreaRef.current &&
        !safeAreaRef.current?.contains(target)
      ) {
        event.preventDefault();
        if (safeAreaRef.current) {
          safeAreaRef.current.focus();
        }
      }
    }

    document.addEventListener("focusin", handleGlobalFocus);

    return () => {
      document.removeEventListener("focusin", handleGlobalFocus);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const playSound = async (sound: HTMLAudioElement) => {
      try {
        await sound.play();
      } catch (error) {
        console.warn("Não foi possível reproduzir o áudio:", error);
      }
    };

    if (pairs[selectedPair] === code[selectedPair - 1]) {
      playSound(hitSound.current);
    } else {
      playSound(normalSound.current);
    }
  }, [pairs, selectedPair, code]);

  return (
    <div className="p-4 border border-zinc-800 rounded-lg  ">
      <div
        ref={safeAreaRef}
        className="w-full mx-auto max-w-[220px] flex flex-col gap-6 outline-none"
        tabIndex={0}
        onFocus={() => {}}
      >
        <div className="flex items-center justify-center gap-3 border-y border-zinc-800 py-3">
          <Counter
            selectedPair={selectedPair}
            pairs={pairs}
            incrementPair={incrementPair}
            decrementPair={decrementPair}
            pairNumber={1}
            error={error}
            sucess={sucess}
          />
          <Counter
            selectedPair={selectedPair}
            pairs={pairs}
            incrementPair={incrementPair}
            decrementPair={decrementPair}
            pairNumber={2}
            error={error}
            sucess={sucess}
          />
          <Counter
            selectedPair={selectedPair}
            pairs={pairs}
            incrementPair={incrementPair}
            decrementPair={decrementPair}
            pairNumber={3}
            error={error}
            sucess={sucess}
          />
        </div>

        <div className=" flex flex-col gap-2">
          <button className="button" onClick={handleSendCode} tabIndex={-1}>
            Enviar
          </button>

          <button onClick={handleRevealCode} className="button">
            Revelar código
          </button>

          <button onClick={handleChangeCode} className="button">
            Trocar código
          </button>
        </div>
      </div>
    </div>
  );
}
