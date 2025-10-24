"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export function AvatarCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Sphere visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#FFD700"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
