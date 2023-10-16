import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import NavigationBar from './components/NavigationBar';
import Start from './pages/Start';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Ban from './pages/Ban';

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Reset />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:post_id" element={<PostDetail />} />
          <Route path="/user/:nickname/report" element={<Ban />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
