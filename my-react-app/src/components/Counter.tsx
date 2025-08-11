// src/components/Counter.tsx
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { increment, decrement } from '../store/counterSlice';

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="p-4">
            <h2 className="text-xl">Count: {count}</h2>
            <button onClick={() => dispatch(increment())} className="btn">+</button>
            <button onClick={() => dispatch(decrement())} className="btn">-</button>
        </div>
    );
};

export default Counter;
