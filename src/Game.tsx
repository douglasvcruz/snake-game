import { useContext } from "react";
import Snake from "./components/Snake";
import { SnakeContext } from "./contexts/SnakeProvider";
import { StartSnakeGame } from "./hooks/StartSnakeGame";
import { AppleContext } from "./contexts/AppleProvider";

export function Game() {
  StartSnakeGame();

  const { snake } = useContext(SnakeContext);
  const { apple } = useContext(AppleContext);

  const pixels = Array.from({ length: 1000 });

  return (
    <>
      <div>
        <h1 className="text-5xl m-10 font-bold text-[#78a87a]">Snake Game</h1>
        <div className="flex flex-wrap w-[1160px] gap-2 bg-[#8cbd8f] p-3 border-[10px] border-[#78a87a]">
          {pixels.map((_pixel, index) =>
            snake.includes(index) ? (
              <Snake key={index} />
            ) : apple === index ? (
              <div
                key={index}
                className="border border-[#78a87a] box-apple"
              ></div>
            ) : (
              <div
                key={index}
                className="border bg-[#8bbd90]  border-[#78a87a] box"
              ></div>
            )
          )}
        </div>
      </div>
    </>
  );
}
