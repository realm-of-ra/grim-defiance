import { useRef } from "react";

import { PhaserGame } from "@/phaser/PhaserGame";
import { useActions } from "./hooks/useActions";
import { useEvents } from "./hooks/useEvents";
import { Header } from "./ui/containers/Header";
import { ThemeProvider } from "./ui/elements/theme-provider";
import { Overlay } from "./ui/modules/Overlay";
import GameScreen from "./phaser/Game";

function App() {
  const phaserRef = useRef(null);
  useActions();
  useEvents();

  return (
    <div id="app" className="flex flex-col items-center">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Header />
        <Overlay />
        <PhaserGame ref={phaserRef} currentActiveScene={undefined} /> */}
        <GameScreen />
      </ThemeProvider>
    </div>
  );
}

export default App;
