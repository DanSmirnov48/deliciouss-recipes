import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar';

export default function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Pages />
    </BrowserRouter>
  );
}