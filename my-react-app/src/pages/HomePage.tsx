import Counter from '../components/Counter';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <Counter />
      <button onClick={() => navigate('/about')}>About page navigate</button>
    </div>
  );
}

export default HomePage;
