import { useMemo, useState } from "react";
import { createContext } from "react";

type SnakeContextProps = {
  snake: number[];
  setSnake: React.Dispatch<React.SetStateAction<number[]>>;
};

export const SnakeContext = createContext({} as SnakeContextProps);

type SnakeProviderProps = {
  children: React.ReactNode;
};

export function SnakeProvider({ children }: SnakeProviderProps) {
  const [snake, setSnake] = useState<number[]>([-2, -1, 0]);

  const values = useMemo(
    () => ({
      snake,
      setSnake,
    }),
    [snake, setSnake]
  );

  return (
    <SnakeContext.Provider value={values}>{children}</SnakeContext.Provider>
  );
}
