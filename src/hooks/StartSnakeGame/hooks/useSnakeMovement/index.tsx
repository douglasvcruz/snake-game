import { MutableRefObject, useContext } from "react";
import { useWallCollision } from "../useWallCollision";
import { valueSnakeDirectionStrategy } from "../../../../constants";
import { AppleContext } from "../../../../contexts/AppleProvider";
import { SnakeContext } from "../../../../contexts/SnakeProvider";

type UseSnakeMovementProps = {
  lastKeyPressed: MutableRefObject<keyof typeof valueSnakeDirectionStrategy>;
  deltaTracker: MutableRefObject<number>;
  snakeSpeed: MutableRefObject<number>;
};

const nextValueAfterCollision = {
  up: 1000,
  down: -1000,
  left: 40,
  right: -40,
};

export function useSnakeMovement({
  lastKeyPressed,
  deltaTracker,
  snakeSpeed,
}: UseSnakeMovementProps) {
  const { appleRef, setNewApple } = useContext(AppleContext);
  const { setSnake } = useContext(SnakeContext);
  const { checkSnakeCollision } = useWallCollision();

  const moveSnakeRight = () => {
    if (lastKeyPressed.current === "left") {
      return;
    }
    lastKeyPressed.current = "right";
  };

  const moveSnakeLeft = () => {
    if (lastKeyPressed.current === "right") {
      return;
    }
    lastKeyPressed.current = "left";
  };

  const moveSnakeDown = () => {
    if (lastKeyPressed.current === "up") {
      return;
    }
    lastKeyPressed.current = "down";
  };

  const moveSnakeUp = () => {
    if (lastKeyPressed.current === "down") {
      return;
    }
    lastKeyPressed.current = "up";
  };

  const startSnakeMovement = (
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const hasEatenApple = verifySnakeEatenApple(prevSnake);
      if (hasEatenApple) {
        newSnake.unshift(newSnake[0]);
        setNewApple();
      }
      const nextSnakePixel = getNextSnakePixel(prevSnake, direction);
      return [...newSnake.slice(1), nextSnakePixel];
    });
  };

  const verifySnakeEatenApple = (newSnake: number[]) => {
    const snakeLastElement = getSnakeLastElement(newSnake);
    const hasEatenApple = snakeLastElement === appleRef.current;
    return hasEatenApple;
  };

  const getNextSnakePixel = (
    newSnake: number[],
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {
    const snakeLastElement = getSnakeLastElement(newSnake);
    const directionOffset = valueSnakeDirectionStrategy[direction];
    const nextSnakePixel = snakeLastElement + directionOffset;

    if (checkSnakeCollision(nextSnakePixel, direction)) {
      const nextSnakePixelAfterCollision =
        nextSnakePixel + nextValueAfterCollision[direction];
      return nextSnakePixelAfterCollision;
    }

    return nextSnakePixel;
  };

  const getSnakeLastElement = (newSnake: number[]) => {
    return newSnake[newSnake.length - 1];
  };

  const addSnakeEventListener = () => {
    document.addEventListener("keydown", ({ key }: KeyboardEvent) => {
      snakeMovesByDirection(key);
    });
  };

  const snakeMovesByDirection = (key: string) => {
    const hasAnimationInProgress = deltaTracker.current < snakeSpeed.current;
    if (hasAnimationInProgress) {
      return;
    }
    deltaTracker.current = 0;

    switch (key) {
      case "ArrowUp":
        moveSnakeUp();
        break;
      case "ArrowDown":
        moveSnakeDown();
        break;
      case "ArrowLeft":
        moveSnakeLeft();
        break;
      case "ArrowRight":
        moveSnakeRight();
        break;
    }
  };

  return { addSnakeEventListener, startSnakeMovement, moveSnakeRight };
}
