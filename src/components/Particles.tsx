import { OrbitControls, Point, Points, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AdditiveBlending, MathUtils, Points as PointsType } from "three";

const Particles = () => {
  const texture = useTexture("/textures/snowFlake.png");
  const ref = useRef<PointsType>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.elapsedTime;
    if (ref.current) {
      for (
        let i = 0;
        i < ref.current.geometry.attributes.position.array.length;
        i++
      ) {
        const x = ref.current.geometry.attributes.position.array[i * 3];
        const z = ref.current.geometry.attributes.position.array[i * 3 + 2];
        ref.current.geometry.attributes.position.setXYZ(
          i,
          x,
          Math.sin(elapsedTime + x),
          z
        );
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <OrbitControls />
      <Points ref={ref} limit={3000} position={[0, 0, 0]}>
        {Array.from({ length: 3000 }, (_, i) => (
          <Point
            key={i}
            position={[
              MathUtils.randFloatSpread(10),
              MathUtils.randFloatSpread(10),
              MathUtils.randFloatSpread(10),
            ]}
            color={[Math.random(), Math.random(), Math.random()]}
          />
        ))}
        <pointsMaterial
          vertexColors
          size={0.3}
          sizeAttenuation
          transparent
          alphaMap={texture}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </Points>
    </>
  );
};

export default Particles;
