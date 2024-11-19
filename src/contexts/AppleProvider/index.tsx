import { MutableRefObject, useMemo, useRef, useState } from "react";
import { createContext } from "react";
import { generateRandomApple } from "../../utils/appleUtils";

type AppleContextProps = {
  apple: number;
  setApple: (newApple: number) => void;
  appleRef: MutableRefObject<number>;
  setNewApple: () => void;
};

export const AppleContext = createContext({} as AppleContextProps);

type AppleProviderProps = {
  children: React.ReactNode;
};

export function AppleProvider({ children }: AppleProviderProps) {
  const [apple, setApple] = useState<number>(generateRandomApple());
  const appleRef = useRef<number>(apple);

  const setNewApple = () => {
    const newApple = generateRandomApple();
    setApple(newApple);
    appleRef.current = newApple;
  };

  const values = useMemo(
    () => ({
      apple,
      setApple,
      appleRef,
      setNewApple,
    }),
    [apple, setApple, appleRef, setNewApple]
  );

  return (
    <AppleContext.Provider value={values}>{children}</AppleContext.Provider>
  );
}
