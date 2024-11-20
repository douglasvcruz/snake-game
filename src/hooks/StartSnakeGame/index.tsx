import { useRef, useEffect } from "react";

import { useSnakeMovement } from "./hooks/useSnakeMovement";
import { startSnakeSpeed } from "./hooks/startSnakeSpeed";
import { valueSnakeDirectionStrategy } from "../../constants";

type StartSnakeGameProps = {
  modeRef: React.MutableRefObject<string>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export function StartSnakeGame({ modeRef, setScore }: StartSnakeGameProps) {
  const isGameActiveRef = useRef(true);
  const lastTime = useRef(0);

  const lastKeyPressed =
    useRef<keyof typeof valueSnakeDirectionStrategy>("right");
  const deltaTracker = useRef<number>(0);
  const snakeSpeed = useRef<number>(240);

  const { addSnakeEventListener, startSnakeMovement } = useSnakeMovement({
    lastKeyPressed,
    deltaTracker,
    snakeSpeed,
    modeRef,
    isGameActiveRef,
    setScore,
  });

  startSnakeSpeed({ snakeSpeed });

  const updateGame = (timestamp: number) => {
    const deltaTime = timestamp - lastTime.current;

    if (deltaTime >= snakeSpeed.current && lastKeyPressed.current) {
      deltaTracker.current = deltaTime;
      startSnakeMovement(lastKeyPressed.current);
      lastTime.current = timestamp;
    }

    if (isGameActiveRef.current) {
      requestAnimationFrame(updateGame);
    }
  };

  useEffect(() => {
    addSnakeEventListener();
    requestAnimationFrame(updateGame);
  }, []);

  return { isGameActiveRef, updateGame, addSnakeEventListener };
}
