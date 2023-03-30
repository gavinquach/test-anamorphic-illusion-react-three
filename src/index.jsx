import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <Canvas
        // camera={{
        //     fov: 26.37,
        //     near: 0.1,
        //     far: 100,
        //     position: [-7.22, -1.48, 6.04],
        //     // rotation: [0.43, -0.93, 0.36]
        // }}
    >
        <Experience />
    </Canvas>
);