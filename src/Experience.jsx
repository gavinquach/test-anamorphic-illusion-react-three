import { PerspectiveCamera, Sky } from '@react-three/drei';
// import { Perf } from 'r3f-perf'
import {  EffectComposer } from '@react-three/postprocessing';
import TimesquareComponent from './TimesquareComponent.jsx';
import Timesquare from './Timesquare';

export default function Experience() {
    return <>
        <PerspectiveCamera
            makeDefault
            far={100}
            near={0.1}
            fov={26.37}
            position={[-7.22, -1.48, 6.04]}
            rotation={[0.43, -0.93, 0.36]}
        />
        
        <EffectComposer>
            <TimesquareComponent />
        </EffectComposer>

        {/* <Perf position="top-left" /> */}

        <Sky sunPosition={[-60, 20, 50]} />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Timesquare />
    </>;
}