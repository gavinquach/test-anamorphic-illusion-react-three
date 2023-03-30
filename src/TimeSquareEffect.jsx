import { Effect } from 'postprocessing';

const fragmentShader = /* glsl */`
    void mainUv(inout vec2 uv) {
        // uv.y -= 5;
    }
`;

export default class TimeSquareEffect extends Effect {
    constructor() {
        super(
            'TimeSquareEffect',
            fragmentShader
        );
    }
}