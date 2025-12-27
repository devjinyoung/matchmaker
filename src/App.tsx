import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MemberHome from './pages/MemberHome';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Messages from './pages/Messages';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<MemberHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}

export default App;
