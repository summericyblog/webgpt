import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import ChatPage from './pages/chat';
import TranslatorPage from './pages/translate';
import PolishPage from './pages/polish';

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ChatPage />} /> */}
        <Route path="/" element={<Navigate to="/trans" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trans" element={<TranslatorPage />} />
        <Route path="/polish" element={<PolishPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
