// @ts-nocheck
/// <reference types="@react-three/fiber" />
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Center, Environment, useProgress } from "@react-three/drei";
import { OBJLoader, MTLLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";

interface ThreeBackgroundProps {
  onProgress?: (progress: number) => void;
}

function Model({
  objPath,
  mtlPath,
  scale,
  position,
  rotation,
  floatProps,
  followsMouse = false,
  followSpeed = 0.1,
  visibilityRange
}: any) {
  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    if (!Array.isArray(materials)) {
      materials.preload();
    }
    loader.setMaterials(materials as any);
  }) as THREE.Group;

  // Convert materials to PhysicalMaterial for proper PBR + Environment reflections
  obj.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        // Handle both single material and array of materials
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const newMats = mats.map((m: any) => {
          if (m.isMaterial) {
            const matName = (m.name || '').toLowerCase();
            const isGlass = matName.includes('screen') || matName.includes('glass') || matName.includes('lens') || matName.includes('display');
            const isMetal = matName.includes('metal') || matName.includes('body') || matName.includes('aluminum') || matName.includes('silver');

            return new THREE.MeshPhysicalMaterial({
              name: m.name,
              color: m.color,
              map: m.map,
              normalMap: m.normalMap,
              roughness: isGlass ? 0.05 : (isMetal ? 0.2 : 0.5),
              metalness: isGlass ? 0.2 : (isMetal ? 0.9 : 0.7),
              envMapIntensity: 2.5, // Increased for stronger reflections
              transmission: isGlass ? 0.95 : 0, // Glass effect
              transparent: isGlass || m.transparent,
              opacity: isGlass ? 1 : m.opacity,
              ior: isGlass ? 1.5 : 1.0,
              thickness: isGlass ? 0.5 : 0,
              side: THREE.DoubleSide
            });
          }
          return m;
        });
        mesh.material = Array.isArray(mesh.material) ? newMats : newMats[0];
      }
    }
  });

  const meshRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!followsMouse) return;
    const handlePointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1.1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1.1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [followsMouse]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Visibility range check
    if (visibilityRange) {
      const cameraY = state.camera.position.y;
      meshRef.current.visible = cameraY <= visibilityRange[0] && cameraY >= visibilityRange[1];
    } else {
      meshRef.current.visible = true;
    }

    if (followsMouse) {
      // Offset from original base position based on pointer
      // Increased range to better "stick" to screen space cursor
      const rangeX = 14;
      const rangeY = 10;
      const targetPosX = position[0] + pointer.current.x * rangeX;
      const targetPosY = position[1] + pointer.current.y * rangeY;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, followSpeed);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetPosY, followSpeed);

      // Subtle rotation to face pointer
      const targetRotX = rotation[0] + pointer.current.y * 1;
      const targetRotY = rotation[1] + pointer.current.x * 1;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, followSpeed);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, followSpeed);
    }
  });

  return (
    <Float {...floatProps}>
      <group position={position} rotation={rotation} ref={meshRef}>
        <Center>
          <primitive object={obj.clone()} scale={scale} />
        </Center>
      </group>
    </Float>
  );
}

function Rig() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    // Calculate scroll progress (0 to 1)
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollProgress = window.scrollY / maxScroll;

    // Total vertical distance the camera travels across the 3D scene
    const scrollDistance = 45;
    const targetY = -scrollProgress * scrollDistance;

    // Smoothly interpolate the camera position to include scroll Y and mouse parallax
    // Using a higher lerp factor for Y (0.15) to make it "stick" better to the scroll
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, (pointer.current.x * 2), 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + (pointer.current.y * 2), 0.15);

    // Smoothly interpolate where the camera is looking
    const currentLookAtY = state.camera.userData.lookAtY || 0;
    const newLookAtY = THREE.MathUtils.lerp(currentLookAtY, targetY, 0.15);
    state.camera.userData.lookAtY = newLookAtY;

    state.camera.lookAt(0, newLookAtY, 0);
  });
  return null;
}

export function ThreeBackground({ onProgress }: ThreeBackgroundProps) {
  const { progress } = useProgress();

  useEffect(() => {
    if (onProgress) {
      onProgress(progress);
    }
  }, [progress, onProgress]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        style={{ pointerEvents: 'none' }}
        eventSource={document.getElementById('root') || document.body}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#a195ff" />
        <Environment preset="city" />
        <Suspense fallback={null}>
          {/* Phone in Intro */}
          <Model
            objPath={`${import.meta.env.BASE_URL}models/iphone-17-pro/iphone-17-pro.obj`}
            mtlPath={`${import.meta.env.BASE_URL}models/iphone-17-pro/iphone-17-pro.mtl`}
            scale={2}
            position={[9, 1, -2]}
            rotation={[0.1, 2.2, -0.1]}
            floatProps={{ speed: 1.5, rotationIntensity: 1.5, floatIntensity: 2 }}
          />

          {/* Camera over the page */}
          <Model
            objPath={`${import.meta.env.BASE_URL}models/camera/camera_zorki_-_4.obj`}
            mtlPath={`${import.meta.env.BASE_URL}models/camera/camera_zorki_-_4.mtl`}
            scale={0.04}
            position={[-13, -12, -3]}
            rotation={[-0.2, 0.6, 0.1]}
            floatProps={{ speed: 2, rotationIntensity: 1, floatIntensity: 1.5 }}
          />

          {/* Another Phone over the page */}
          <Model
            objPath={`${import.meta.env.BASE_URL}models/iphone-17-pro/iphone-17-pro.obj`}
            mtlPath={`${import.meta.env.BASE_URL}models/iphone-17-pro/iphone-17-pro.mtl`}
            scale={2}
            position={[13, -28, -6]}
            rotation={[-0.2, 2, 0.2]}
            floatProps={{ speed: 2, rotationIntensity: 1, floatIntensity: 1.5 }}
          />

        </Suspense>
        <Rig />
      </Canvas>
    </div>
  );
}