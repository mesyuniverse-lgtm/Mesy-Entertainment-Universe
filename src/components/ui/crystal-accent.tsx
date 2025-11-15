'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';

function AnimatedCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 0]}>
        <MeshDistortMaterial
            color={'#8A2BE2'}
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.6}
        />
    </Icosahedron>
  );
}

export function CrystalAccent() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AnimatedCrystal />
    </Canvas>
  );
}
