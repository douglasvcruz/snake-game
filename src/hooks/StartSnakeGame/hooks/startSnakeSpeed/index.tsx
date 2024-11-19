import { MutableRefObject, useEffect } from "react";

type StartSnakeSpeedProps = {
  snakeSpeed: MutableRefObject<number>;
};

export function startSnakeSpeed({ snakeSpeed }: StartSnakeSpeedProps) {
  useEffect(() => {
    const id = setInterval(() => {
      if (snakeSpeed.current <= 50) {
        clearInterval(id);
      }
      snakeSpeed.current -= 10;
    }, 5000);
    return () => clearInterval(id);
  }, []);
}
