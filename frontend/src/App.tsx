import { Route, Routes } from "react-router-dom";
import  AuthCallBackPage  from "./pages/auth-callback/AuthCallBackPage";
import  AdminPage  from "./pages/admin/AdminPage";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import { Toaster } from 'react-hot-toast';
import NotFound from "./pages/404/NotFound";

export default function App() {
  return (
    <>
    <Routes>
    <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'}/>} />
    <Route path="/auth-callback" element={<AuthCallBackPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path='/' element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/albums/:albumid" element={<AlbumPage/>} />
      <Route path="*" element={<div><NotFound/></div>} />
    </Route>
    </Routes>
    <Toaster />
    </> 
  );
}