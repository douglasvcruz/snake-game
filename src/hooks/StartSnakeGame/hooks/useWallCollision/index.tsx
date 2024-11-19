import { valueSnakeDirectionStrategy } from "../../../../constants";

export function useWallCollision() {
  const checkSnakeCollision = (
    nextSnakePixel: number,
    direction: keyof typeof valueSnakeDirectionStrategy
  ) => {
    return checkSnakeCollisionStrategy[direction](nextSnakePixel);
  };

  const hasHitWallLeft = (nextSnakePixel: number) => {
    if ((nextSnakePixel + 1) % 40 === 0) {
      return true;
    }
    return false;
  };

  const hasHitWallRight = (nextSnakePixel: number) => {
    if (nextSnakePixel % 40 === 0) {
      return true;
    }
    return false;
  };

  const hasHitWallUp = (nextSnakePixel: number) => {
    if (nextSnakePixel < 0) {
      return true;
    }
    return false;
  };

  const hasHitWallDown = (nextSnakePixel: number) => {
    if (nextSnakePixel >= 1000) {
      return true;
    }
    return false;
  };

  const checkSnakeCollisionStrategy = {
    up: hasHitWallUp,
    down: hasHitWallDown,
    left: hasHitWallLeft,
    right: hasHitWallRight,
  };

  return { checkSnakeCollision };
}
