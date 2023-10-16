import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsChatSquareDots } from 'react-icons/bs';
import { PiChartBarHorizontalFill } from 'react-icons/pi';
import VoteResult from '../components/VoteResult';
import HeaderContent from '../components/HeaderContent';
import Votes from '../components/votes';
import EditMode from '../components/EditMode';

const PostDetail = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null); // 데이터를 저장할 상태 변수
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editSelectedFile, setEditSelectedFile] = useState([]);
  const [editRepresentative, setEditRepresentative] = useState(null);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [editFilePreviews, setEditFilePreviews] = useState([]);
  const userNickname = 'devcisiver';

  const handleEditClick = () => {
    if (postData && userNickname === postData.nickname) {
      //본인의 게시물일때
      setIsEditing(true);
      setEditedTitle(postData.title); // 수정 모드 진입 시 초기화
      setEditedContent(postData.contents);
      setEditSelectedFile([...postData.images]);
      setEditRepresentative(postData.images.representative);
      setHashtags(postData.tags.map((tag) => tag.tag));
    }
  };

  //수정모드에 필요한 함수//
  //대표이미지등록
  const handleImageClick = (index) => {
    setEditRepresentative((prevRepresentative) => {
      // 이미 대표 이미지일 경우 해제
      if (prevRepresentative === index) {
        return null;
      }
      return index;
    });
  };
  //사진파일 onchange
  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileNames = Array.from(files).map((file) => file.name); // 파일명 추출
    const fileObjects = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setEditSelectedFile((prevSelectedFile) => [
      ...(prevSelectedFile || []),
      ...fileNames,
    ]);
    setEditFilePreviews((prevFilePreviews) => [
      ...(prevFilePreviews || []),
      ...fileObjects,
    ]);
  };
  //사진지우기함수
  const handleRemoveImage = (index) => {
    setEditSelectedFile((prevSelectedFile) => {
      const updatedFiles = [...prevSelectedFile];
      updatedFiles.splice(index, 1);
      if (index === editRepresentative) {
        setEditRepresentative(null);
      } else if (index < editRepresentative) {
        // 제거된 이미지가 대표 이미지 앞에 있었을 경우,대표 이미지 인덱스를 감소
        setEditRepresentative(editRepresentative - 1);
      }
      return updatedFiles;
    });
  };
  //해쉬태그 onchange
  const handleHashtagChange = (e) => {
    setCurrentHashtag(e.target.value);
  };
  //태그 추가(등록) 함수
  const addHashtag = () => {
    if (
      currentHashtag.trim() !== '' && //문자열 앞뒤 공백없앰
      !hashtags.includes(currentHashtag.trim()) //기존해쉬태그와 중복확인
    ) {
      setHashtags([...hashtags, currentHashtag.trim()]);
      setCurrentHashtag('');
    }
  };
  //태그 제거 함수
  const removeHashtag = (index) => {
    const newHashtags = [...hashtags];
    newHashtags.splice(index, 1);
    setHashtags(newHashtags);
  };
  const handleDeleteClick = () => {
    if (postData && userNickname === postData.nickname) {
      // 본인 게시물 확인
      if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
        deletePost();
      }
    }
  };
  const deletePost = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('게시물이 삭제되었습니다.');
        } else {
          console.error('게시물 삭제 실패');
        }
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
      });
  };

  //투표항목 선택 함수
  const handleChoiceClick = (choiceNum) => {
    if (!selectedChoice && userNickname !== postData.nickname) {
      const selectedChoiceInfo = {
        selected_number: choiceNum,
      };

      setSelectedChoice(selectedChoiceInfo);
      console.log('등록 데이터:', selectedChoiceInfo);
      //투표한 정보 post
      fetch('https://jsonplaceholder.typicode.com/posts/${postId}/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedChoiceInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('서버 응답 데이터:', data);
        })
        .catch((error) => {
          console.error('서버 요청 오류:', error);
        });
    }
  };
  //상세페이지 정보 get으로 받아오기
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPostData(data.post);
        // setEditedTitle(data.post.title); // 초기화
        // setEditedContent(data.post.contents); // 데이터를 상태 변수에 저장
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [postId]);

  if (!postData) {
    return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 로딩 화면을 표시
  }
  const handleSaveClick = () => {
    //수정한 내용 저장 버튼
    const updatedData = {
      title: editedTitle,
      contents: editedContent,
      tags: hashtags.map((tag) => ({ tag })),
      images: editSelectedFile.map((file, index) => ({
        image: editFilePreviews,
        index: index + 1,
        representative: index === editRepresentative, // 대표 이미지 여부
      })),
    };
    //수정한 내용 put
    fetch('https://jsonplaceholder.typicode.com/posts/{postId}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log('서버 응답 데이터:', data);

        setIsEditing(false);
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
        // 에러 처리
      });
  };

  // 수정 모드에서는 수정 폼을 렌더링
  if (isEditing) {
    return (
      <EditMode
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        editSelectedFile={editSelectedFile}
        setEditSelectedFile={setEditSelectedFile}
        editRepresentative={editRepresentative}
        setEditRepresentative={setEditRepresentative}
        currentHashtag={currentHashtag}
        setCurrentHashtag={setCurrentHashtag}
        hashtags={hashtags}
        setHashtags={setHashtags}
        editFilePreviews={editFilePreviews}
        setEditFilePreviews={setEditFilePreviews}
        handleSaveClick={handleSaveClick}
        handleImageClick={handleImageClick}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        handleHashtagChange={handleHashtagChange}
        addHashtag={addHashtag}
        removeHashtag={removeHashtag}
        handleDeleteClick={handleDeleteClick}
        postData={postData}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderContent
          userNickname={userNickname}
          postData={postData}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
        <ContentDiv>
          <ImageContainer>
            {postData.images.map((image, index) => (
              <img src={image} alt={`이미지 ${index + 1}`} key={index} />
            ))}
          </ImageContainer>
          {postData.contents}
        </ContentDiv>
        {postData.vote.result_access_status ? (
          selectedChoice ? ( // selectedChoice가 존재하면 voteresult를 렌더링
            <VoteResult
              choices={postData.vote.choices}
              postData={postData}
              $selectedChoice={selectedChoice}
            />
          ) : (
            <Votes
              vote={postData.vote}
              handleChoiceClick={handleChoiceClick}
              postData={postData}
              createdAt={postData.created_at}
            />
          )
        ) : (
          <>
            <VoteResult
              choices={postData.vote.choices}
              postData={postData}
              selectedChoice={selectedChoice}
            />
          </>
        )}
      </Container>
      <TagContainer>
        {postData.tags.map((tag, index) => (
          <TagBox key={index}>#{tag.tag}</TagBox>
        ))}
      </TagContainer>
      <CountContainer>
        <VoteCount>
          <BsChatSquareDots />
          13명참여
        </VoteCount>
        <ChatCount>
          <PiChartBarHorizontalFill />
          15명참여
        </ChatCount>
      </CountContainer>
    </ThemeProvider>
  );
};

export default PostDetail;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;

const ContentDiv = styled.div`
  margin: 30px;
  width: 60%;
  font-size: 15px;
`;

const TagContainer = styled.div`
  display: flex;
  margin: auto;
  width: 60%;
`;
const TagBox = styled.div`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 13px;
  margin: 2px;
  margin-top: 30px;
  margin-left: 5px;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: ${({ theme }) => theme.light_purple};
  color: ${({ theme }) => theme.dark_purple};
  font-weight: 500;
  border-radius: 5px;
`;
const CountContainer = styled.div`
  display: flex;
  margin: auto;
  width: 60%;
  margin-top: 15px;
`;
const VoteCount = styled.div`
  display: flex;
  font-size: 13px;
  margin-right: 10px;
  color: ${({ theme }) => theme.medium_purple};
`;

const ChatCount = styled.div`
  display: flex;
  color: ${({ theme }) => theme.medium_purple};
  font-size: 13px;
`;
//수정모드일때 화면 스타일 컴포넌트

const ImageContainer = styled.div`
  position: relative;
  margin-right: 5px;
`;
