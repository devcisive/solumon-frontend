import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import SignUpGeneral from './pages/sign-up/SignUpGeneral';
import SignUpKakao from './pages/sign-up/SignUpKakao';
import PostList from './pages/PostList';

function App() {
  return (
    <>
      <Reset />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/sign-up/general" element={<SignUpGeneral />} />
          <Route path="/sign-up/kakao" element={<SignUpKakao />} />
          <Route path="/post-list" element={<PostList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
