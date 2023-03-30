import TimeSquareEffect from './TimeSquareEffect.jsx';
import { forwardRef } from 'react';

export default forwardRef(function (props, ref) {
    const effect = new TimeSquareEffect(props);
    return <primitive ref={ref} object={effect} />;
});