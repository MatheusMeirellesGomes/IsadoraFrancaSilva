"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const LETTER_MATERIAL = {
  color: "#5B1A2B",
  metalness: 0.4,
  roughness: 0.3,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
} as const;

const SPARKLE_POSITIONS: Array<[number, number, number]> = [
  [1.55, 0.7, 0.4],
  [-1.5, -0.6, 0.5],
  [0.3, 1.35, -0.5],
];

type HeroSceneProps = {
  reduceMotion: boolean;
};

/**
 * Monograma "IF" em 3D dentro de um medalhão rosé-gold — a mesma
 * composição da logo (ver src/components/Logo.tsx), só que em volume,
 * girando devagar como um pingente/moeda.
 */
export function HeroScene({ reduceMotion }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!reduceMotion) {
      group.rotation.y += delta * 0.18;
    }

    const targetTiltX = state.pointer.y * 0.15;
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
        {/* Medalhão — moldura voltada para a câmera, como na logo */}
        <mesh rotation={[0.15, 0, 0]}>
          <torusGeometry args={[1.15, 0.06, 32, 128]} />
          <meshPhysicalMaterial
            color="#C9A66B"
            metalness={0.9}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Letra "I" */}
        <group position={[-0.42, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.16, 1.3, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.46, 0.14, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
          <mesh position={[0, -0.68, 0]}>
            <boxGeometry args={[0.46, 0.14, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
        </group>

        {/* Letra "F" */}
        <group position={[0.32, 0, 0]}>
          <mesh position={[-0.18, 0, 0]}>
            <boxGeometry args={[0.16, 1.3, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
          <mesh position={[-0.18, 0.68, 0]}>
            <boxGeometry args={[0.16, 0.14, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
          <mesh position={[0.14, 0.6, 0]}>
            <boxGeometry args={[0.58, 0.16, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
          <mesh position={[0.06, 0.05, 0]}>
            <boxGeometry args={[0.42, 0.16, 0.16]} />
            <meshPhysicalMaterial {...LETTER_MATERIAL} />
          </mesh>
        </group>

        {/* Pequenos brilhos blush ao redor do medalhão */}
        {SPARKLE_POSITIONS.map((position, index) => (
          <Float
            key={position.join("-")}
            speed={reduceMotion ? 0 : 1 + index * 0.3}
            floatIntensity={reduceMotion ? 0 : 1.2}
          >
            <mesh position={position}>
              <sphereGeometry args={[0.09, 24, 24]} />
              <meshPhysicalMaterial color="#E27A93" metalness={0.3} roughness={0.2} clearcoat={1} />
            </mesh>
          </Float>
        ))}
      </group>
    </>
  );
}
