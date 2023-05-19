import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import Particles from "./components/Particles";
import { Suspense } from "react";

function App() {
  return (
    <AppContainer>
      <Canvas dpr={[1, 1.5]}>
        <color attach="background" args={["#171720"]} />
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100%;
`;
