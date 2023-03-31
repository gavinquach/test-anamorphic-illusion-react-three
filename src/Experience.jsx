import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

// import { Perf } from 'r3f-perf'
import { useRef } from 'react';
import { button, useControls } from 'leva';
import { EffectComposer } from '@react-three/postprocessing';

import Timesquare from './Timesquare';
import TimeSquareScreen from './TimeSquareScreen';
import { AnamorphicEffect } from './AnamorphicEffect.jsx';

export default function Experience() {
    const controlRef = useRef();

    // const { camera } = useThree();

    // useControls({
    //     resetCamera: button(() => {
    //         camera.position.set(-7.22, -1.48, 6.04);
    //         controlRef.current.target.set(0.43, -0.93, 0.36);
    //         controlRef.current.update();
    //     })
    // });

    return <>
        <PerspectiveCamera
            makeDefault
            far={100}
            near={0.1}
            fov={26.37}
            up={[0, 1, 0]}
            position={[-7.22, -1.48, 6.04]}
            rotation={[0.43, -0.93, 0.36]}
        />

        <OrbitControls
            ref={controlRef}
            enabled={true}
        />

        <EffectComposer>
            {/* <AnamorphicEffect /> */}
        </EffectComposer>

        {/* <Perf position="top-left" /> */}

        <Sky sunPosition={[-60, 20, 50]} />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        {/* <Timesquare /> */}
        <TimeSquareScreen />
    </>;
}