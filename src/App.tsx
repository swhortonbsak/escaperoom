import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PuzzleEngineProvider } from './context/PuzzleEngineContext';
import { usePuzzleEngine } from './context/usePuzzleEngine';
import { AppShell } from './components/layout/AppShell';
import { IntroPage } from './pages/IntroPage';
import { GamePage } from './pages/GamePage';
import { CompletionPage } from './pages/CompletionPage';
import { useEffect } from 'react';

function RoomSync() {
  const { state } = usePuzzleEngine();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/complete') return;
    if (state.currentRoom === 'intro' && location.pathname.startsWith('/play')) {
      navigate('/');
      return;
    }
    if (state.currentRoom === 'complete') {
      navigate('/complete');
      return;
    }
    if (state.currentRoom !== 'intro' && location.pathname.startsWith('/play')) {
      const expected = `/play/${state.currentRoom}`;
      if (location.pathname !== expected) {
        navigate(expected);
      }
    }
  }, [state.currentRoom, navigate, location.pathname]);

  return null;
}

export default function App() {
  return (
    <PuzzleEngineProvider>
      <BrowserRouter>
        <RoomSync />
        <AppShell>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/play/:roomId" element={<GamePage />} />
            <Route path="/complete" element={<CompletionPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </PuzzleEngineProvider>
  );
}
