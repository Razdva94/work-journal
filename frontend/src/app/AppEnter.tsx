import { Route, Routes } from 'react-router-dom';
import { JournalPage } from '@/pages';

export const AppEnter = () => (
  <Routes>
    <Route path="/" element={<JournalPage />} />
  </Routes>
);
