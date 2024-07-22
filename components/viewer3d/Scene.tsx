"use client";
import * as THREE from "three";

import { Suspense } from "react";
import { Model3D } from "./Model3d";
import { BoxLoader } from "./BoxLoader";

import { OrbitControls } from "@react-three/drei";

export function Scene({ camera }: { camera: THREE.PerspectiveCamera }) {
  console.log("Scene");
  return (
    <>
      <OrbitControls
        minDistance={0}
        maxDistance={20}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.25}
      />
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 10, 7]} intensity={1.5} />
      <Suspense fallback={<BoxLoader />}>
        <Model3D camera={camera} />
      </Suspense>
    </>
  );
}
