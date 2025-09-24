import TriangleUp from "../../assets/icons/triangle-up";
import TriangleDown from "../../assets/icons/triangule-down";

interface CounterProps {
  selectedPair: number;
  pairs: Record<number, number>;
  incrementPair: () => void;
  decrementPair: () => void;
  pairNumber: number;
  error: boolean;
  sucess: boolean;
}

export default function Counter({
  selectedPair,
  pairs,
  incrementPair,
  decrementPair,
  pairNumber,
  error,
  sucess,
}: CounterProps) {
  const handleArrowColor = () => {
    if (sucess) {
      return "fill-green-500";
    }
    if (error) {
      return "fill-red-500";
    }
    return "fill-zinc-100";
  };

  const handleTextColor = () => {
    if (sucess) {
      return "text-green-500";
    }
    if (error) {
      return "text-red-500";
    }
    if (selectedPair == pairNumber) {
      return "text-zinc-100";
    } else {
      return "text-zinc-100 opacity-40";
    }
  };

  return (
    <div className="flex items-center justify-center gap-3  border-zinc-800 ">
      <div
        className={`flex items-center flex-col justify-center transition-all duration-150 `}
      >
        <button className="cursor-pointer" onClick={incrementPair} tabIndex={-1}>
          <TriangleUp
            className={`${selectedPair != pairNumber && "hidden"}`}
            color={handleArrowColor()}
          />
        </button>
        <p
          className={` ${handleTextColor()} text-[40px] font-medium  transition-all duration-150 select-none`}
        >
          {String(pairs[pairNumber]).padStart(2, "0")}
        </p>
        <button className="cursor-pointer" onClick={decrementPair} tabIndex={-1}>
          <TriangleDown
            className={`${selectedPair != pairNumber && "hidden"}`}
            color={handleArrowColor()}
          />
        </button>
      </div>
    </div>
  );
}
