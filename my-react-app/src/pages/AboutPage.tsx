import { useSelector } from 'react-redux';
import type { RootState } from '../store';

function AboutPage() {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h1>About Page</h1>
      <p>Current counter value: {count}</p>
    </div>
  );
}

export default AboutPage;
