import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { HashTagChoice } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { IoIosRemoveCircle } from 'react-icons/io';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import Button from '../components/Button';
import HashTagList from '../components/HashTagList';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const storage = getStorage();

const Posts = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState(['', '', '', '', '']);
  const hashTagChoice = useRecoilValue(HashTagChoice);
  const [toggle, setToggle] = useState(true);
  const [representative, setRepresentative] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  const currentUserUid = storedUserInfo.memberId;
  const nickName = storedUserInfo.nickname;

  const handleFileChange = (event) => {
    //사진 업로드
    const files = event.target.files;
    const fileNames = Array.from(files).map((file) => file.name); // 파일명 추출
    const fileObjects = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    console.log(files);

    setSelectedFile((prevSelectedFile) => [
      ...(prevSelectedFile || []),
      ...fileNames,
    ]);
    setFilePreviews((prevFilePreviews) => [
      ...(prevFilePreviews || []),
      ...fileObjects,
    ]);
    setFiles((prevFiles) => [...(prevFiles || []), ...files]);

    if (representative === null && fileObjects.length > 0) {
      //대표이미지를 선택하지 않았을때, 임의로 첫번째로 대표이미지 설정
      setRepresentative(0);
    }
    console.log(files);
    console.log(selectedFile);
    console.log(filePreviews);
  };

  // 사진 삭제
  const handleRemoveImage = (index) => {
    setSelectedFile((prevSelectedFile) => {
      const updatedFiles = [...prevSelectedFile];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    setFilePreviews((prevFilePreviews) => {
      const updatedPreviews = [...prevFilePreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });

    if (index === representative) {
      setRepresentative(null);
    } else if (index < representative) {
      // 제거된 이미지가 대표 이미지 앞에 있었을 경우, 대표 이미지 인덱스를 감소
      setRepresentative(representative - 1);
    }
  };

  //사진이미지 스토리지에 업로드
  const uploadImages = async () => {
    const imageUrls = [];

    for (const [index, file] of files.entries()) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      //url 변형하기
      await uploadTask.then(async (snapshot) => {
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push({
          image: imageUrl,
          name: file.name,
          index: index + 1,
          representative: index === representative,
        });
      });
    }

    return imageUrls;
  };

  //투표항목입력할때 발생하는 onchange
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  //사진 클릭해서 대표이미지 설정하기
  const handleImageClick = (index) => {
    setRepresentative((prevRepresentative) => {
      // 이미 대표 이미지일 경우 해제
      if (prevRepresentative === index) {
        return null;
      }
      return index;
    });
  };

  //투표마감일 입력 onChange
  const handleTimeInputChange = (e, setEndDate) => {
    const inputTime = e.target.value;
    const clientTime = new Date(inputTime + 'Z');
    const parsedTime = new Date(
      clientTime.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    );
    parsedTime.setMinutes(0);
    parsedTime.setSeconds(0);
    setEndDate(parsedTime.toISOString().slice(0, 19));
  };

  //투표항목 제거하기(최소2개항목 유지)
  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  // 투표항목 추가하기(최대5개항목 유지)
  const addOption = () => {
    if (options.length < 5) {
      const newOptions = [...options, ''];
      setOptions(newOptions);
    }
  };

  // 해시태그 토글 버튼
  const handleToggleTag = (value) => {
    if (value === '태그 미사용') {
      setToggle(true);
    } else {
      setToggle(false);
    }
    console.log(value);
  };

  // 게시글 데이터 생성
  const RegisterSubmit = async (e) => {
    e.preventDefault();
    const images = await uploadImages();

    //유효성(validation)
    if (!title || !content) {
      alert('제목과 내용을 작성해주세요.');
      return;
    }

    if (options.length < 2) {
      alert('최소 2개의 투표 항목을 입력해주세요.');
      return;
    }

    const hasEmptyOption = options.some((option) => option.trim() === '');
    if (hasEmptyOption) {
      alert('투표 항목을 모두 입력해주세요.');
      return;
    }
    const currentTime = new Date().toISOString().slice(0, 17); // 현재 날짜와 시간
    if (endDate <= currentTime) {
      alert('유효한 투표 종료일을 선택해주세요.');
      return;
    }
    //데이터 등록 완료후 입력값초기화
    setTitle('');
    setContent('');
    setEndDate('');
    setOptions(['', '', '', '', '']);
    setRepresentative(null);
    setSelectedFile([]);
    setFilePreviews([]);

    const postData = {
      title,
      contents: content,
      tags: hashTagChoice,
      images,
      uid: currentUserUid,
      created_at: new Date().toISOString(),
      nickname: nickName,
      total_comment_count: 0,
      total_vote_count: 0,
      join: [],
    };

    // 투표 데이터 생성
    const vote = {
      choices: options.map((choice, index) => ({
        choice_num: index,
        choice_text: choice,
      })),
      end_at: endDate,
    };

    // 전체 데이터 구성
    const requestData = {
      ...postData,
      vote,
    };
    console.log('등록 데이터:', requestData);

    try {
      const postsCollection = collection(db, 'posts-write');
      const newPostRef = await addDoc(postsCollection, requestData);
      const postId = newPostRef.id;
      console.log(`파이어스토어 저장완료`, postId);
      navigate(`/postsDetail/${postId}`);
    } catch (error) {
      console.log(`파이어스토어 저장완료`, error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* 전체게시글작성폼*/}
      <MainContainer onSubmit={RegisterSubmit} encType="multipart/form-data">
        <HeadContainer>
          {/* 제목과 등록버튼 */}
          <TitleSpan>게시글 작성</TitleSpan>
        </HeadContainer>

        {/* 게시글 작성 폼 */}
        <ContentContainer>
          <TitleInput
            type="text"
            name="title"
            value={title}
            placeholder="제목"
            onChange={(e) => setTitle(e.target.value)}
          ></TitleInput>
          <ContentTextArea
            name="content"
            value={content}
            placeholder="본문"
            onChange={(e) => setContent(e.target.value)}
          ></ContentTextArea>
        </ContentContainer>

        {/* 선택한 이미지 미리보기 */}
        {selectedFile && selectedFile.length > 0 && (
          <ImagesContainer>
            {filePreviews.map((file, index) => (
              <ImageContainer key={index}>
                <StyledFileImg
                  src={file}
                  alt={`미리보기 ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                />
                {representative === index && <Badge>대표</Badge>}
                <RemoveCircleIcon onClick={() => handleRemoveImage(index)} />
              </ImageContainer>
            ))}
          </ImagesContainer>
        )}

        {/* 파일 업로드 */}
        <FileContainer>
          <FileLabel htmlFor="image">사진 선택</FileLabel>
          <FileInput
            type="file"
            id="image"
            name="image"
            multiple="multiple"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          ></FileInput>
          <FileNameInput
            placeholder="첨부 파일"
            value={selectedFile.length > 0 ? selectedFile.join(', ') : ''}
            readOnly
          ></FileNameInput>
        </FileContainer>

        {/* 투표 작성 부분 */}
        <Container>
          <StyledContainer>
            <VoteLabel htmlFor="end">
              투표 마감일 :
              <VoteEnd
                id="end"
                type="datetime-local"
                placeholder="투표 마감일"
                value={endDate}
                onChange={(e) => handleTimeInputChange(e, setEndDate)}
              />
            </VoteLabel>
          </StyledContainer>
          <StyledContainer2>
            {options.map((option, index) => (
              <OptionContainer key={index}>
                {index === 0 && options.length < 5 ? (
                  <StyledAiFillPlusCircle onClick={addOption}>
                    투표 항목 추가
                  </StyledAiFillPlusCircle>
                ) : (
                  <StyledAiFillMinusCircle onClick={() => removeOption(index)}>
                    투표 항목 제거
                  </StyledAiFillMinusCircle>
                )}
                <VoteChoice
                  type="text"
                  placeholder={`항목 입력`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </OptionContainer>
            ))}
          </StyledContainer2>
        </Container>

        {/* 해시태그 입력 */}
        <ToggleContainer>
          <ToggleWrapper>
            <ToggleSpan
              isSelected={toggle}
              onClick={() => handleToggleTag('태그 미사용')}
            >
              태그 미사용
            </ToggleSpan>
            <ToggleSpan
              isSelected={!toggle}
              onClick={() => handleToggleTag('태그 사용')}
            >
              태그 사용
            </ToggleSpan>
          </ToggleWrapper>
        </ToggleContainer>

        {/* 선택한 해시태그 목록 */}
        {toggle ? (
          <></>
        ) : (
          <HashtagContainer>
            <HashTagList />
          </HashtagContainer>
        )}
        <ButtonContainer>
          <Button
            name="게시글 등록"
            type="submit"
            onClick={RegisterSubmit}
            bgColor={theme.medium_purple}
            fontSize="16px"
            fontWeight={500}
            padding="12px 70px"
            borderRadius="5px"
          />
        </ButtonContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default Posts;

const MainContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
`;

const TitleSpan = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 10px;
  display: inline;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 49%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const TitleInput = styled.input`
  width: 70%;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  color: ${({ theme }) => theme.medium_purple};
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  padding-left: 10px;
`;

const ContentTextArea = styled.textarea`
  width: 70%;
  height: 400px;
  line-height: 18px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  color: ${({ theme }) => theme.medium_purple};
  margin-bottom: 10px;
  padding: 10px 0 0 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const FileContainer = styled.div`
  width: 72%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 10px;
  width: 50%;
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
  width: 80px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  margin-left: 5px;
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

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.medium_purple};
  width: 49%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: center;
`;

const StyledContainer = styled.div`
  display: flex;
  margin-left: 60px;
  margin-top: 15px;
  width: 90%;
  justify-content: space-between;
`;

const StyledContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px;
  margin-bottom: 30px;
`;

const StyledAiFillMinusCircle = styled(AiFillMinusCircle)`
  font-size: 24px;
  color: ${({ theme }) => theme.dark_purple};
  margin-right: 5px;
`;

const StyledAiFillPlusCircle = styled(AiFillPlusCircle)`
  font-size: 24px;
  color: ${({ theme }) => theme.dark_purple};
  margin-right: 5px;
`;

const OptionContainer = styled.div`
  display: flex;
  margin: 5px;
  align-items: center;
  flex: 1;
`;

const VoteLabel = styled.label`
  color: ${({ theme }) => theme.medium_purple};
  font-size: 12px;
`;

const VoteEnd = styled.input`
  color: ${({ theme }) => theme.dark_purple};
  margin-left: 5px;
`;

const VoteChoice = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
`;

const ToggleContainer = styled.div`
  display: flex;
  width: 50%;
  margin-top: 10px;
`;

const ToggleWrapper = styled.div`
  display: flex;

  border: 1px solid ${({ theme }) => theme.light_purple};
  border-radius: 15px;
`;

const ToggleSpan = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 15px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.light_purple : 'transparent'};
  transition: 0.3s;
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
