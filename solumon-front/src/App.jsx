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
import Login from './pages/Login';
import SignUpGeneral from './pages/sign-up/SignUpGeneral';
import SignUpKakao from './pages/sign-up/SignUpKakao';
import FindPassword from './pages/FindPassword';
import WithDraw from './pages/WithDraw';
import PostList from './pages/PostList';
import PostCategory from './pages/PostCategory';
import Search from './pages/Search';
import ReDirect from './pages/ReDirect';
import SearchResult from './pages/SearchResult';
import MyHistory from './pages/MyHistory';
import Notification from './pages/Notification';

import Edit from './pages/Edit';

function App() {
  return (
    <RecoilRoot>
      <Reset />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/user" element={<UserInfo />} />
          <Route path="/" element={<Start />} />
          <Route path="/postsDetail/:postId" element={<PostDetail />} />

          <Route path="/post-write" element={<Posts />} />
          <Route path="/postsDetail/:postId" element={<PostDetail />} />
          <Route path="/user/interests" element={<ChoiceInterest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/sign-up/general" element={<SignUpGeneral />} />
          <Route path="/user/sign-up/kakao" element={<SignUpKakao />} />
          <Route path="/user/start/kakao" element={<ReDirect />} />
          <Route path="/user/find-password" element={<FindPassword />} />
          <Route path="/withdraw" element={<WithDraw />} />
          <Route path="/post-list" element={<PostList />} />
          <Route path="/posts" element={<PostCategory />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/search/:searchType/results/:keyword"
            element={<SearchResult />}
          />
          <Route path="/notification" element={<Notification />} />
          <Route path="/my-history" element={<MyHistory />} />
          <Route path="/ban/:memberId" element={<Ban />} />
          <Route path="/edit/:postId" element={<Edit />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
