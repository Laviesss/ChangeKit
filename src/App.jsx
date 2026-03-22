import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';

function ProActivator() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('pro') === 'activated') {
      localStorage.setItem('ck_pro', 'true');
      // Success toast will be handled by the Result page if redirected there,
      // or we could add a global toast here.
    }
  }, [searchParams]);

  return null;
}

function App() {
  return (
    <Router>
      <ProActivator />
      <div className="min-h-screen bg-background text-white font-sans text-base antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
