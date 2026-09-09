"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ORBIT_POSITIONS: Array<[number, number, number]> = [
  [1.9, 0.6, 0.3],
  [-1.7, -0.5, 0.6],
  [0.4, 1.6, -0.4],
];

type HeroSceneProps = {
  reduceMotion: boolean;
};

/** Anel monograma "IF" em 3D: torus rosé-gold com uma gema blush flutuando no centro. */
export function HeroScene({ reduceMotion }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reduceMotion) {
      group.rotation.y += delta * 0.15;
    }

    const targetTiltX = state.pointer.y * 0.18;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTiltX, 0.06);

    if (reduceMotion) {
      const targetTiltY = state.pointer.x * 0.25;
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetTiltY, 0.06);
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} color="#FDEEF1" />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-3, -2, 2]} intensity={0.9} color="#C9A66B" />
      <pointLight position={[2, -3, -2]} intensity={0.5} color="#E27A93" />

      <group ref={groupRef}>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.5, 0.12, 32, 128]} />
          <meshPhysicalMaterial
            color="#C9A66B"
            metalness={0.9}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </mesh>

        <Float
          speed={reduceMotion ? 0 : 1.4}
          rotationIntensity={reduceMotion ? 0 : 0.6}
          floatIntensity={reduceMotion ? 0 : 0.8}
        >
          <mesh>
            <icosahedronGeometry args={[0.85, 1]} />
            <meshPhysicalMaterial
              color="#F6C4D0"
              metalness={0.1}
              roughness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>
        </Float>

        {ORBIT_POSITIONS.map((position, index) => (
          <Float
            key={position.join("-")}
            speed={reduceMotion ? 0 : 1 + index * 0.3}
            floatIntensity={reduceMotion ? 0 : 1.2}
          >
            <mesh position={position}>
              <sphereGeometry args={[0.12, 24, 24]} />
              <meshPhysicalMaterial
                color="#E27A93"
                metalness={0.3}
                roughness={0.2}
                clearcoat={1}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}
