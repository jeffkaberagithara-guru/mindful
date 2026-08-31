import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import RootLayout from './components/layout/RootLayout.jsx';
import { ToastProvider } from './components/ui/Toast.jsx';
import { resolveMeta } from './data/site.js';

import Home from './pages/Home.jsx';
import LearnMore from './pages/LearnMore.jsx';
import Resources from './pages/Resources.jsx';
import FindTherapist from './pages/FindTherapist.jsx';
import Crisis from './pages/Crisis.jsx';
import MoodTracker from './components/MoodTracker.jsx';
import AssessmentTool from './components/AssessmentTool.jsx';
import UserSettings from './pages/UserSettings.jsx';
import Talk from './pages/Talk.jsx';
import Tools from './pages/Tools.jsx';
import Explore from './pages/Explore.jsx';
import You from './pages/You.jsx';
import NotFound from './pages/NotFound.jsx';
import Breathing from './pages/Breathing.jsx';
import Grounding from './pages/Grounding.jsx';
import Journal from './pages/Journal.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import Programmes from './pages/Programmes.jsx';
import ProgrammeDetail from './pages/ProgrammeDetail.jsx';
import SupportPlan from './pages/SupportPlan.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';

const ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/talk', element: <Talk /> },
  { path: '/tools', element: <Tools /> },
  { path: '/tools/mood-tracker', element: <MoodTracker /> },
  { path: '/tools/assessment', element: <AssessmentTool /> },
  { path: '/tools/breathing', element: <Breathing /> },
  { path: '/tools/grounding', element: <Grounding /> },
  { path: '/explore', element: <Explore /> },
  { path: '/explore/articles/:slug', element: <ArticlePage /> },
  { path: '/journal', element: <Journal /> },
  { path: '/programmes', element: <Programmes /> },
  { path: '/programmes/:slug', element: <ProgrammeDetail /> },
  { path: '/support-plan', element: <SupportPlan /> },
  { path: '/learn-more', element: <LearnMore /> },
  { path: '/resources', element: <Resources /> },
  { path: '/find-therapist', element: <FindTherapist /> },
  { path: '/crisis', element: <Crisis /> },
  { path: '/you', element: <You /> },
  { path: '/settings', element: <UserSettings /> },
  { path: '*', element: <NotFound /> },
];

function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = resolveMeta(pathname);
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
  }, [pathname]);
  return null;
}

function App() {
  useLocalStorage('theme', 'light');
  useLocalStorage('fontSize', 'medium');
  useLocalStorage('dyslexiaFont', false);
  useLocalStorage('highContrast', false);
  const [reduceMotion] = useLocalStorage('reduceMotion', false);

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>
      <PageMeta />
      <ToastProvider>
        <RootLayout routes={ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))} />
      </ToastProvider>
    </MotionConfig>
  );
}

export default App;