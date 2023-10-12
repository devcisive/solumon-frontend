import { Reset } from 'styled-reset';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import UserInfo from './pages/UserInfo';
import ChoiceInterest from './pages/ChoiceInterest';
import Login from './pages/Login';
import SignUpGeneral from './pages/sign-up/SignUpGeneral';
import SignUpKakao from './pages/sign-up/SignUpKakao';
import FindPassword from './pages/FindPassword';
import WithDraw from './pages/WithDraw';
import PostList from './pages/PostList';
import PostCategory from './pages/PostCategory';

function App() {
  return (
    <RecoilRoot>
      <Reset />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/user" element={<UserInfo />} />
          <Route path="/user/interests" element={<ChoiceInterest />} />
          <Route path="/user/sign-in/general" element={<Login />} />
          <Route path="/user/sign-up/general" element={<SignUpGeneral />} />
          <Route path="/user/sign-up/kakao" element={<SignUpKakao />} />
          <Route path="/user/find-password" element={<FindPassword />} />
          <Route path="/user/withdraw" element={<WithDraw />} />
          <Route path="/posts/post-list" element={<PostList />} />
          <Route path="/posts" element={<PostCategory />} />
          <Route path="/posts/search" />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
