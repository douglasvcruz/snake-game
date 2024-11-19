import { createRoot } from "react-dom/client";
import "./index.css";
import { Game } from "./Game.tsx";
import { SnakeProvider } from "./contexts/SnakeProvider/index.tsx";
import { AppleProvider } from "./contexts/AppleProvider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <SnakeProvider>
    <AppleProvider>
      <Game />
    </AppleProvider>
  </SnakeProvider>
);
