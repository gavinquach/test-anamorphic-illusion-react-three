/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useGLTF, PerspectiveCamera, OrbitControls, useTexture } from "@react-three/drei";
import ProjectedMaterial from 'three-projected-material';
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function TimeSquareScreenRectangular(props) {
    const { nodes, materials } = useGLTF("./models/timesquare-screen-rectangles.glb");

    const screenFrontRef = useRef();
    const screenSideRef = useRef();
    const screenRef = useRef();
    const screenBothRef = useRef();
    const screenBothFlatFrontRef = useRef();
    const screenBothFlatSideRef = useRef();

    const cameraRef = useRef();
    const texture = useTexture('./test.png');
    let projectedMaterial;

    useEffect(() => {
        projectedMaterial = new ProjectedMaterial({
            camera: cameraRef.current, // the camera that acts as a projector
            texture: texture, // the texture being projected
        });
        // screenBothRef.current.material = projectedMaterial;
        // projectedMaterial.project(screenBothRef.current);

        screenFrontRef.current.material = projectedMaterial;
        projectedMaterial.project(screenFrontRef.current);
        screenSideRef.current.material = projectedMaterial;
        projectedMaterial.project(screenSideRef.current);


        screenBothFlatFrontRef.current.material = screenFrontRef.current.material;
        screenBothFlatSideRef.current.material = screenSideRef.current.material;
        // screenRef.current.material = screenBothRef.current.material;

        // screenSideRef.current.rotation.y = Math.PI * 0.5;

        // screenRef.current.visible = false;
        // screenBothRef.current.visible = false;
    });

    useFrame(() => {
        // projectedMaterial.project(screenFrontRef.current);
        // projectedMaterial.project(screenSideRef.current);
        // projectedMaterial.project(screenRef.current);
    });

    return (
        <group {...props} dispose={null}>
            <PerspectiveCamera
                ref={cameraRef}
                name="Camera"
                makeDefault={false}
                far={50}
                near={0.1}
                fov={26.37}
                position={[-7.22, -1.48, 6.04]}
                rotation={[0.43, -0.93, 0.36]}
            />

            <OrbitControls />

            <mesh
                ref={screenSideRef}
                name="screen_outer_rectangle_side"
                castShadow
                receiveShadow
                geometry={nodes.screen_outer_rectangle_side.geometry}
                material={materials["Material.002"]}
                position={[1.95, 0.74, 0.26]}
                scale={[2.95, 1.74, 1.27]}
            // visible={false}
            />
            <mesh
                ref={screenFrontRef}
                name="screen_outer_rectangle_front"
                castShadow
                receiveShadow
                geometry={nodes.screen_outer_rectangle_front.geometry}
                material={materials["Material.002"]}
                position={[1.95, 0.74, 0.26]}
                scale={[2.95, 1.74, 1.27]}
            // visible={false}
            />

            <mesh
                ref={screenBothRef}
                name="screen_outer_rectangle_both"
                castShadow
                receiveShadow
                geometry={nodes.screen_outer_rectangle_both.geometry}
                material={materials["Material.002"]}
                position={[1.95, 0.74, 0.26]}
                scale={[2.95, 1.74, 1.27]}
                visible={false}
            />
            <mesh
                ref={screenBothRef}
                name="screen_outer_rectangle_both_flat"
                castShadow
                receiveShadow
                geometry={nodes.screen_outer_rectangle_both_flat.geometry}
                material={materials["Material.002"]}
                position={[0.68, 0.74, 0.26]}
                scale={[4.22, 1.74, 1.27]}
                visible={false}
            />

            <group
                name="screen_outer_rectangle_both_flat_separated"
                position={[1.95, 0.74, 0.26]}
                scale={[2.95, 1.74, 1.27]}
                // visible={false}
            >
                <mesh
                    ref={screenBothFlatFrontRef}
                    name="Plane"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    material={materials["Material.002"]}
                />
                <mesh
                    ref={screenBothFlatSideRef}
                    name="Plane_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane_1.geometry}
                    material={materials["Material.011"]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("./models/timesquare-screen-rectangles.glb");