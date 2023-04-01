import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

// import { Perf } from 'r3f-perf'
import { useRef } from 'react';
import { button, useControls } from 'leva';
import { EffectComposer } from '@react-three/postprocessing';

import Timesquare from './Timesquare';
import TimeSquareScreen from './TimeSquareScreen';
import TimeSquareScreenRectangular from './TimeSquareScreenRectangular';
import { AnamorphicEffect } from './AnamorphicEffect.jsx';

import { Vector3, Matrix4 } from "three";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";


export default function Experience() {
    const AnamorphicShaderMaterial = shaderMaterial(
        {
            projectedTexture: { value: null },

            // this avoids rendering black if the texture
            // hasn't loaded yet
            isTextureLoaded: { value: null },

            // don't show the texture if we haven't called project()
            isTextureProjected: { value: true },

            // if we have multiple materials we want to show the
            // background only of the first material
            backgroundOpacity: { value: 1.0 },

            // these will be set on project()
            viewMatrixCamera: { value: new Matrix4() },
            projectionMatrixCamera: { value: new Matrix4() },
            projPosition: { value: new Vector3(-7.22, -1.48, 6.04) },
            projDirection: { value: new Vector3(-8.021619940883777, -1.7292195319155566, 6.583410613890896) },

            // we will set this later when we will have positioned the object
            savedModelMatrix: { value: new Matrix4() },
            widthScaled: { value: 1.0 },
            heightScaled: { value: 1.0 },
            textureOffset: { value: 0.0 },
        },
        `
        uniform mat4 viewMatrixCamera;
        uniform mat4 projectionMatrixCamera;
    
        #ifdef USE_INSTANCING
        attribute vec4 savedModelMatrix0;
        attribute vec4 savedModelMatrix1;
        attribute vec4 savedModelMatrix2;
        attribute vec4 savedModelMatrix3;
        #else
        uniform mat4 savedModelMatrix;
        #endif
    
        varying vec3 vSavedNormal;
        varying vec4 vTexCoords;
        #ifndef ORTHOGRAPHIC
        varying vec4 vWorldPosition;
        #endif
        
        void main() {
            #ifdef USE_INSTANCING
            mat4 savedModelMatrix = mat4(
                savedModelMatrix0,
                savedModelMatrix1,
                savedModelMatrix2,
                savedModelMatrix3
            );
            #endif
        
            vSavedNormal = mat3(savedModelMatrix) * normal;
            vTexCoords = projectionMatrixCamera * viewMatrixCamera * savedModelMatrix * vec4(position, 1.0);
            #ifndef ORTHOGRAPHIC
            vWorldPosition = savedModelMatrix * vec4(position, 1.0);
            #endif
        
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
        `
        uniform sampler2D projectedTexture;
        uniform bool isTextureLoaded;
        uniform bool isTextureProjected;
        uniform vec3 projPosition;
        uniform vec3 projDirection;
        uniform float widthScaled;
        uniform float heightScaled;
    
        varying vec3 vSavedNormal;
        varying vec4 vTexCoords;
        #ifndef ORTHOGRAPHIC
        varying vec4 vWorldPosition;
        #endif
    
        float mapRange(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
    
        void main() {
            // clamp the w to make sure we don't project behind
            float w = max(vTexCoords.w, 0.0);
        
            vec2 uv = (vTexCoords.xy / w) * 0.5 + 0.5;
        
            // apply the corrected width and height
            uv.x = mapRange(uv.x, 0.0, 1.0, 0.5 - widthScaled / 2.0, 0.5 + widthScaled / 2.0);
            uv.y = mapRange(uv.y, 0.0, 1.0, 0.5 - heightScaled / 2.0, 0.5 + heightScaled / 2.0);
        
            // this makes sure we don't sample out of the texture
            bool isInTexture = (max(uv.x, uv.y) <= 1.0 && min(uv.x, uv.y) >= 0.0);
        
            // this makes sure we don't render also the back of the object
            #ifdef ORTHOGRAPHIC
            vec3 projectorDirection = projDirection;
            #else
            vec3 projectorDirection = normalize(projPosition - vWorldPosition.xyz);
            #endif

            float dotProduct = dot(vSavedNormal, projectorDirection);
            bool isFacingProjector = dotProduct > 0.0000001;
        
        
            vec4 diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
        
            if (isFacingProjector && isInTexture && isTextureLoaded && isTextureProjected) {
                vec4 textureColor = texture2D(projectedTexture, uv);
        
                textureColor.a *= 1.0;
        
                // https://learnopengl.com/Advanced-OpenGL/Blending
                diffuseColor = textureColor * textureColor.a + diffuseColor * (1.0 - textureColor.a);
            }
        
            gl_FragColor = diffuseColor;
        }
    `,
    );

    extend({ AnamorphicShaderMaterial });


    return <>
        <PerspectiveCamera
            makeDefault
            far={1000}
            near={0.1}
            fov={26.37}
            up={[0, 1, 0]}
            position={[-7.22, -1.48, 6.04]}
            rotation={[0.43, -0.93, 0.36]}
        />

        {/* <EffectComposer>
            <AnamorphicEffect camera={useThree().camera} />
        </EffectComposer> */}

        {/* <Perf position="top-left" /> */}

        <Sky sunPosition={[-60, 20, 50]} />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        {/* <Timesquare /> */}
        {/* <TimeSquareScreen /> */}
        <TimeSquareScreenRectangular />

        {/* <mesh>
            <planeGeometry args={[2, 2]} />
            <anamorphicShaderMaterial />
        </mesh> */}
    </>;
}