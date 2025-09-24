import { useEffect, useRef, useState } from "react";
import lock from "../assets/sounds/lock.mp3";
import som1 from "../assets/sounds/som-1.mp3";
import som2 from "../assets/sounds/som-2.mp3";
import unlock from "../assets/sounds/unlock.mp3";
import Counter from "../components/ui/counter";
import generateCode from "../helpers/generateCode";

export default function SafeCode() {
  const [code, setCode] = useState(() => generateCode());

  const safeAreaRef = useRef<HTMLDivElement>(null);
  const hitSound = new Audio(som1);
  const normalSound = new Audio(som2);
  const unlockSound = new Audio(unlock);
  const lockSound = new Audio(lock);

  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [selectedPair, setSelectedPair] = useState<number>(1);
  const [pairs, setPairs] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setSelectedPair((prev) => Math.min(prev + 1, 3));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSelectedPair((prev) => Math.max(prev - 1, 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      incrementPair();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      decrementPair();
    }

    if (event.key === "Tab") {
      event.preventDefault();
      handleChangeSelectedPair();
      if (safeAreaRef.current) {
        safeAreaRef.current.focus();
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleSendCode();
    }
  }

  function incrementPair() {
    setPairs((prev) => ({
      ...prev,
      [selectedPair]: prev[selectedPair] >= 99 ? 0 : prev[selectedPair] + 1,
    }));
  }

  function decrementPair() {
    setPairs((prev) => ({
      ...prev,
      [selectedPair]: prev[selectedPair] <= 0 ? 99 : prev[selectedPair] - 1,
    }));
  }

  function handleSendCode() {
    if (Object.values(pairs).toString() === code.toString()) {
      setSucess(true);
      unlockSound.play();
      setTimeout(() => {
        setSucess(false);
      }, 700);
    } else {
      setError(true);
      lockSound.play();
      setTimeout(() => {
        setError(false);
      }, 700);
    }
  }

  function handleChangeSelectedPair() {
    setSelectedPair((prev) => (prev === 3 ? 1 : prev + 1));
  }

  function handleRevealCode() {
    setPairs({ 1: code[0], 2: code[1], 3: code[2] });
  }

  function handleChangeCode() {
    setCode(generateCode());
    setPairs({ 1: 0, 2: 0, 3: 0 });
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
    };
  }, []);

  useEffect(() => {
    if (pairs[selectedPair] == code[selectedPair - 1]) {
      hitSound.play();
    } else {
      normalSound.play();
    }
  }, [pairs, selectedPair]);

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
            trocar código
          </button>
        </div>
      </div>
    </div>
  );
}
