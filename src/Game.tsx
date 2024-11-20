import { useContext, useRef, useState } from "react";
import Snake from "./components/Snake";
import { SnakeContext } from "./contexts/SnakeProvider";
import { StartSnakeGame } from "./hooks/StartSnakeGame";
import { AppleContext } from "./contexts/AppleProvider";
import Apple from "./components/Apple";
import DefaultPixel from "./components/DefaultPixel";

export function Game() {
  const modeRef = useRef("NORMAL");

  const { snake, setSnake } = useContext(SnakeContext);
  const { apple, setNewApple } = useContext(AppleContext);
  const [score, setScore] = useState(0);

  const pixels = Array.from({ length: 1000 });
  const { isGameActiveRef, updateGame } = StartSnakeGame({ modeRef, setScore });

  const resetGame = () => {
    setSnake([-2, -1, 0]);
    setNewApple();
    isGameActiveRef.current = true;
    modeRef.current = "NORMAL";
    requestAnimationFrame(updateGame);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-5xl font-bold text-[#78a87a]">Snake Game</h1>
          <button
            className="bg-[#78a87a] rounded w-32"
            onClick={() =>
              (modeRef.current =
                modeRef.current === "INFINITE" ? "NORMAL" : "INFINITE")
            }
          >
            Change Mode
          </button>
        </div>
        <div className="flex flex-wrap w-[1160px] gap-2 bg-[#8cbd8f] p-3 border-[10px] border-[#78a87a]">
          {pixels.map((_pixel, index) => {
            if (snake.includes(index)) {
              return <Snake key={index} />;
            }

            if (apple === index) {
              return <Apple key={index} />;
            }

            return <DefaultPixel key={index} className="box" />;
          })}
        </div>
        <div className="flex justify-between">
          <p className="bg-[#8cbd8f] p-3 border-[10px] border-t-0 text-2xl border-[#78a87a] w-52 pl-5">
            Score: <span className="text-orange-900">{score}</span>
          </p>
          <p className="bg-[#8cbd8f] p-3 border-[10px] border-t-0 text-xl border-[#78a87a] w-52 text-center">
            Mode: <span className="">{modeRef.current}</span>
          </p>
        </div>
      </div>
      {isGameActiveRef.current === false && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#78a87a] p-5 rounded flex justify-center items-center flex-col">
            <p className="text-[#730f12] font-bold text-2xl">Game Over!</p>
            <button
              className="rounded text-xl text-white font-bold border-2 mt-4 cursor-pointer border-black p-2 hover:bg-slate-300 hover:text-black"
              onClick={resetGame}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
