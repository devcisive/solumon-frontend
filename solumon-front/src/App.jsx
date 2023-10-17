import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import NavigationBar from './components/NavigationBar';
import Start from './pages/Start';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import Ban from './pages/Ban';
import UserInfo from './pages/UserInfo';
import ChoiceInterest from './pages/ChoiceInterest';
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
          <Route path="/" element={<Start />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:post_id" element={<PostDetail />} />
          <Route path="/user/:nickname/report" element={<Ban />} />
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
