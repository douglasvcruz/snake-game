import { MutableRefObject, useContext } from "react";
import { useWallCollision } from "../useWallCollision";
import { valueSnakeDirectionStrategy } from "../../../../constants";
import { AppleContext } from "../../../../contexts/AppleProvider";
import { SnakeContext } from "../../../../contexts/SnakeProvider";

type UseSnakeMovementProps = {
  lastKeyPressed: MutableRefObject<keyof typeof valueSnakeDirectionStrategy>;
  deltaTracker: MutableRefObject<number>;
  snakeSpeed: MutableRefObject<number>;
  modeRef: MutableRefObject<string>;
  isGameActiveRef: MutableRefObject<boolean>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
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
  modeRef,
  isGameActiveRef,
  setScore,
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
    console.log(isGameActiveRef.current);
    if (lastKeyPressed.current === "down") {
      return;
    }
    lastKeyPressed.current = "up";
  };

  const startSnakeMovementInfinite = (
    prevSnake: number[],
    nextSnakePixel: number,
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {
    const nextSnakePixelAfterCollision =
      nextSnakePixel + nextValueAfterCollision[direction];
    return [...prevSnake.slice(1), nextSnakePixelAfterCollision];
  };

  const startSnakeMovementNormal = (
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {};

  const startSnakeMovement = (
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const hasEatenApple = verifySnakeEatenApple(prevSnake);

      if (hasEatenApple) {
        newSnake.unshift(newSnake[0]);
        setScore((prevScore) => prevScore + 1);
        setNewApple();
      }
      const nextSnakePixel = getNextSnakePixel(prevSnake, direction);
      if (
        checkSnakeCollision(nextSnakePixel, direction) &&
        modeRef.current === "INFINITE"
      ) {
        return startSnakeMovementInfinite(prevSnake, nextSnakePixel, direction);
      }

      if (
        checkSnakeCollision(nextSnakePixel, direction) &&
        modeRef.current === "NORMAL"
      ) {
        isGameActiveRef.current = false;
        lastKeyPressed.current = "right";
        return [...newSnake];
      }

      return [...newSnake.slice(1), nextSnakePixel];
    });
  };

  const getNextSnakePixel = (
    newSnake: number[],
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {
    const snakeLastElement = getSnakeLastElement(newSnake);
    const directionOffset = valueSnakeDirectionStrategy[direction];
    const nextSnakePixel = snakeLastElement + directionOffset;
    return nextSnakePixel;
  };

  const verifySnakeEatenApple = (newSnake: number[]) => {
    const snakeLastElement = getSnakeLastElement(newSnake);
    const hasEatenApple = snakeLastElement === appleRef.current;
    return hasEatenApple;
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
    if (!isGameActiveRef.current) return;
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
