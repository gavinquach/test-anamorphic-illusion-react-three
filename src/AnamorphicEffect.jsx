import React, { forwardRef, useMemo } from 'react';
import { Uniform, Vector2 } from 'three';
import { Effect } from 'postprocessing';

const fragmentShader = /* glsl */`
    uniform vec2 resolution;
    uniform float curveWidth;
    uniform float leftWidth;
    uniform float rightWidth;
    uniform float screenAngle;


    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * 10.0 + 90.0) * 0.1;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = inputColor;
    }
`;

// Effect implementation
class AnamorphicEffectImpl extends Effect {
    constructor() {
        super(
            'AnamorphicEffect',
            fragmentShader,
            {
                uniforms: new Map([
                    ['resolution', new Uniform(new Vector2(5900, 3480))],
                    ['curveWidth', new Uniform(1020)],
                    ['leftWidth', new Uniform(1820)],
                    ['rightWidth', new Uniform(3060)],
                    ['screenAngle', new Uniform(Math.PI / 6)] // angle of screen from viewer's perspective

                    // ['curveWidth', new Uniform(1020)],
                    // ['uLeftWidth', new Uniform(1820)],
                    // ['uRightWidth', new Uniform(3060)],
                    // ['uScreenWidth', new Uniform(5900)],
                    // ['uScreenHeight', new Uniform(3480)],
                ])
            }
        );
    }
}

// Effect component
export const AnamorphicEffect = forwardRef((props, ref) => {
    const effect = useMemo(() => new AnamorphicEffectImpl());
    return <primitive ref={ref} object={effect} />;
});