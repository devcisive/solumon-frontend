import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoIosRemoveCircle } from 'react-icons/io';
import { BsPlusSquare } from 'react-icons/bs';
import VoteResult from '../components/VoteResult';

const Edit=()=>{
  // const navigate = useNavigate();
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editSelectedFile, setEditSelectedFile] = useState([]); 
  const [editHashtags, setEditHashtags] = useState([]); 
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [editRepresentative, setEditRepresentative] = useState(null);
  const [editFilePreviews, setEditFilePreviews] = useState([]);
  
  
  // 서버로부터 게시물 데이터를 가져옴
  useEffect(() => {
  fetch(`http://solumon.site:8080/posts/${postId}`)
  .then((response) => response.json())
  .then((data) => {
    setPostData(data.post);
    setEditedTitle(data.post.title); 
    setEditedContent(data.post.contents);
    setEditHashtags(data.post.tags)
    setEditSelectedFile(data.post.images)
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
  },[postId]);

  //수정한 내용 저장 버튼
  const handleSaveClick = () => {
    const updatedData = {
      title: editedTitle,
      contents: editedContent,
      tags: editHashtags.map((tag) => ({ tag })),
      images: editSelectedFile.map((file, index) => ({
        image: editFilePreviews,
        index: index + 1,
        representative: index === editRepresentative, // 대표 이미지 여부
      })),
    };
   alert('저장이 완료되었습니다.')
  //  navigate('/')
    console.log(`수정데이터`, updatedData)
    //수정한 내용 put
    fetch(`http://solumon.site:8080/posts/${postId}`, {
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
      })
      .catch((error) => {
        console.error('서버 요청 오류:', error);
        // 에러 처리
      });
  };
  //수정모드로 바뀔때 필요한 함수들 //
  // 이미 대표 이미지일 경우 해제
  const handleImageClick = (index) => {
    setEditRepresentative((prevRepresentative) => {
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
    const fileObjects = Array.from(files).map((file) => URL.createObjectURL(file));

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
      !editHashtags.includes(currentHashtag.trim()) //기존해쉬태그와 중복확인
    ) {
      setEditHashtags([...editHashtags, currentHashtag.trim()]);
      setCurrentHashtag('');
    }
  };
  //태그 제거 함수
  const removeHashtag = (index) => {
    const newHashtags = [...editHashtags];
    newHashtags.splice(index, 1);
    setEditHashtags(newHashtags);
  };

if (!postData) {
return <div>Loading...</div>; // 데이터가 로드되지 않았을 때 로딩 화면을 표시
}

  
return (
<ThemeProvider theme={theme}>
  <MainContainer>
        <ReStorerButtonContainer>
          <ReStorerButton onClick={handleSaveClick}>저장</ReStorerButton>
        </ReStorerButtonContainer>
        <EditInput
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <ContentTextArea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
         <ImagesContainer>
        {editSelectedFile.map((file, index) => (
          <ImageContainer key={index}>
            {/* 이미지 파일 미리보기 부분 */}
            <StyledFileImg
              src={editFilePreviews[index]}
              alt={`미리보기 ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
        
            {editRepresentative === index && <Badge>대표</Badge>}
            {/* 이미지 삭제 버튼 */}
            <RemoveCircleIcon onClick={() => handleRemoveImage(index)} />
          </ImageContainer>
        ))}
      </ImagesContainer>
      <FileContainer>
        <FileLabel htmlFor="image">사진 선택</FileLabel>
        <FileInput
          type="file"
          id="image"
          name="image"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
        <FileNameInput
          placeholder="첨부 파일"
          value={editSelectedFile.join(', ')}
          readOnly
        />
      </FileContainer>
      <VoteCommentContainer>
        <VoteComment>📢투표는 수정이 불가능합니다.</VoteComment>
      </VoteCommentContainer>
     <VoteResult choices={postData.vote.choices} postData={postData} />
      <HashContainer>
        <HashtagInputContainer>
          <HashtagInput
            type="text"
            placeholder="#태그 입력 (최대 5개 입력 가능)"
            value={currentHashtag}
            onChange={handleHashtagChange}
          />
          <StyledBsPlusSquare onClick={addHashtag} />
        </HashtagInputContainer>
      </HashContainer>

      {/* 선택한 해시태그 목록 */}
      <HashtagContainer>
        {editHashtags.map((hashtag, index) => (
          <Hashtag key={index}>
            #{hashtag.tag}
            <AiFillMinusCircle onClick={() => removeHashtag(index)} />
          </Hashtag>
        ))}
      </HashtagContainer>
      </MainContainer>
    </ThemeProvider>
  );
};


export default Edit;
const VoteCommentContainer = styled.div`
  display: flex;
  margin: 10px;
  width: 60%;
`;
const VoteComment = styled.div`
  color: #e53935;
  font-size: 10px;
  font-weight: bold;
  display: flex;
`;

const  MainContainer= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const EditInput = styled.input`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline;
  border-radius: 5px;
  padding-bottom: 0px;
  width: 60%;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
`;
const ContentTextArea = styled.textarea`
  width: 60%;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  color: ${({ theme }) => theme.medium_purple};
  margin-bottom: 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;
const ReStorerButtonContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-end;
`;
const ReStorerButton = styled.button`
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  border-radius: 5px;
  padding: 5px;
  width: 100px;
  margin-bottom: 10px;
`;
//사진 수정모드
const FileContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const FileLabel = styled.label`
  padding: 11px 30px;
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  display: inline;
`;
const FileInput = styled.input`
  margin-top: 10px;
  display: none;
`;
const ImagesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 60%;
`;
const Badge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: green;
  color: white; /* 텍스트 색상 */
  padding: 3px 5px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 10px;
`;
const ImageContainer = styled.div`
  position: relative;
  margin-right: 5px;
`;
const StyledFileImg = styled.img`
  position: relative;
  width: 50px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  margin-right: 5px;
  border-radius: 5px;
`;
const RemoveCircleIcon = styled(IoIosRemoveCircle)`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${({ theme }) => theme.medium_purple};
  color: white;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;
const FileNameInput = styled.input`
  display: inline;
  width: 57%;
  height: 20px;
  padding: 7px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  margin: 5px;
`;
const HashContainer = styled.div`
  width: 60%;
  border-radius: 5px;
  margin-top: 10px;
`;
const HashtagInputContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledBsPlusSquare = styled(BsPlusSquare)`
  font-size: 24px;
  margin-left: 5px;
`;

const HashtagInput = styled.input`
  width: 66%;
  padding: 10px;
  font-size: 13px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
`;
const HashtagContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
`;
const Hashtag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  background-color: ${({ theme }) => theme.light_purple};
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 15px;
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
  & svg {
    cursor: pointer;
    margin-left: 5px;
  }
`;