import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { IoIosRemoveCircle } from 'react-icons/io';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import Button from '../components/Button';

const Posts = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState(['', '', '', '', '']);
  const [hashtags, setHashtags] = useState([]);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [representative, setRepresentative] = useState(null);

  const handleFileChange = (event) => {
    //사진 업로드
    const files = event.target.files;
    setSelectedFile((prevSelectedFile) => [
      ...(prevSelectedFile || []),
      ...Array.from(files),
    ]);
  };

  // 사진 삭제
  const handleRemoveImage = (index) => {
    setSelectedFile((prevSelectedFile) => {
      const updatedFiles = [...prevSelectedFile];
      updatedFiles.splice(index, 1);
      if (index === representative) {
        setRepresentative(null);
      } else if (index < representative) {
        // 제거된 이미지가 대표 이미지 앞에 있었을 경우,대표 이미지 인덱스를 감소
        setRepresentative(representative - 1);
      }
      return updatedFiles;
    });
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
  const handleTimeInputChange = (e, setTimeFunction) => {
    const inputTime = e.target.value;
    const parsedTime = new Date(inputTime); //분,초은 날리고 시간까지 전달해줘야함(자스에서사용위해)
    parsedTime.setMinutes(0);
    parsedTime.setSeconds(0);
    setTimeFunction(parsedTime.toISOString().slice(0, 16));
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

  //태그입력 onchange
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
  // 게시글 데이터 생성
  const RegisterSubmit = () => {
    const postData = {
      title,
      contents: content,
      tags: hashtags.map((tag) => ({ tag })),
      images: selectedFile.map((file, index) => ({
        image: URL.createObjectURL(file),
        index: index + 1,
        representative: index === representative,
      })),
    };
    // 투표 데이터 생성
    const voteData = {
      choices: options.map((choice, index) => ({
        choice_num: index + 1,
        choice_text: choice,
      })),
      end_at: endDate,
    };
    // 전체 데이터 구성
    const requestData = {
      ...postData,
      vote: voteData,
    };
    console.log('등록 데이터:', requestData);

    //   msw POST 요청 코드 //
    const Url = 'https://jsonplaceholder.typicode.com/posts/{postId}/vote';
    fetch(Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData), // 데이터를 JSON 형태로 변환
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류');
        }
        return response.json(); // JSON 형태의 응답 데이터를 파싱
      })
      .then((data) => {
        console.log('응답 데이터:', data);
      })
      .catch((error) => {
        console.error('요청 오류:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        {/* 전체게시글작성폼*/}
        <HeadContainer>
          {/* 제목과 등록버튼 */}
          <TitleSpan>게시글 작성</TitleSpan>
          <Button
            name="등록"
            type="button"
            onClick={RegisterSubmit}
            bgColor={theme.medium_purple}
            color={theme.linen}
            fontSize="12px"
            fontWeight={500}
            padding="10px 40px"
            borderRadius="5px"
          />
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
            {selectedFile.map((file, index) => (
              <ImageContainer key={index}>
                <StyledFileImg
                  src={URL.createObjectURL(file)}
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
            value={
              selectedFile.length > 0
                ? selectedFile.map((file) => file.name).join(', ')
                : ''
            }
            readOnly
          ></FileNameInput>
          {/* 업로드 버튼 */}
          <Button
            name="업로드"
            type="button"
            onClick={RegisterSubmit}
            bgColor={theme.medium_purple}
            color={theme.linen}
            fontSize="12px"
            fontWeight={500}
            padding="10px 40px"
            borderRadius="5px"
          />
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
          {hashtags.map((hashtag, index) => (
            <Hashtag key={index}>
              #{hashtag}
              <AiFillMinusCircle onClick={() => removeHashtag(index)} />
            </Hashtag>
          ))}
        </HashtagContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default Posts;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const TitleSpan = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 10px;
  display: inline;
  margin-right: 325px;
  padding-bottom: 0px;
`;
const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
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
`;
const ContentTextArea = styled.textarea`
  width: 70%;
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
const FileContainer = styled.div`
  width: 61%;
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

const HashContainer = styled.div`
  width: 70%;
  border-radius: 5px;
`;
const HashtagInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 50%;
  align-items: center;
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
