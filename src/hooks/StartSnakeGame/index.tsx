import { useRef, useEffect, useState } from "react";

import { useSnakeMovement } from "./hooks/useSnakeMovement";
import { startSnakeSpeed } from "./hooks/startSnakeSpeed";
import { valueSnakeDirectionStrategy } from "../../constants";

export function StartSnakeGame() {
  const [isGameActive, setIsGameActive] = useState(true);
  const lastTime = useRef(0);

  const lastKeyPressed =
    useRef<keyof typeof valueSnakeDirectionStrategy>("right");
  const deltaTracker = useRef<number>(0);
  const snakeSpeed = useRef<number>(240);

  const { addSnakeEventListener, startSnakeMovement } = useSnakeMovement({
    lastKeyPressed,
    deltaTracker,
    snakeSpeed,
  });

  startSnakeSpeed({ snakeSpeed });

  const updateGame = (timestamp: number) => {
    const deltaTime = timestamp - lastTime.current;

    if (deltaTime >= snakeSpeed.current && lastKeyPressed.current) {
      deltaTracker.current = deltaTime;
      startSnakeMovement(lastKeyPressed.current);
      lastTime.current = timestamp;
    }

    if (isGameActive) {
      requestAnimationFrame(updateGame);
    }
  };

  useEffect(() => {
    addSnakeEventListener();
    requestAnimationFrame(updateGame);
  }, []);

  return { isGameActive, setIsGameActive };
}
