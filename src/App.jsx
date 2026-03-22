import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import { ProProvider } from './hooks/usePro';

function App() {
  return (
    <ProProvider>
      <Router>
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sans text-base antialiased">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </Router>
    </ProProvider>
  );
}

export default App;
