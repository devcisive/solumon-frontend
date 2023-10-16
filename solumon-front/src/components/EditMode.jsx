import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoIosRemoveCircle } from 'react-icons/io';
import { BsPlusSquare } from 'react-icons/bs';
import theme from '../style/theme';
import VoteResult from './VoteResult';

const EditMode = ({
  editedTitle,
  editedContent,
  editSelectedFile,
  editRepresentative,
  hashtags,
  editFilePreviews,
  handleSaveClick,
  handleImageClick,
  handleFileChange,
  handleRemoveImage,
  handleHashtagChange,
  addHashtag,
  removeHashtag,
  currentHashtag,
  setEditedTitle,
  setEditedContent,
  postData,
}) => {
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
        {/* 이미지 업로드, 태그 입력 등을 구현 */}
        <ImagesContainer>
          {editSelectedFile.map((file, index) => (
            <ImageContainer key={index}>
              <StyledFileImg
                src={editFilePreviews[index]} // 이미지 파일 미리보기
                alt={`미리보기 ${index + 1}`}
                onClick={() => handleImageClick(index)}
              />
              {/* 아래의 Badge 및 RemoveCircleIcon 부분은 제대로 동작하도록 추가 작업 필요 */}
              {editRepresentative === index && <Badge>대표</Badge>}
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
            value={editSelectedFile.map((file) => file.name).join(', ')}
            readOnly
          />
        </FileContainer>
        <VoteCommentContainer>
          <VoteComment>※투표는 수정이 불가능합니다.</VoteComment>
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
EditMode.propTypes = {
  editedTitle: PropTypes.string.isRequired,
  editedContent: PropTypes.string.isRequired,
  editSelectedFile: PropTypes.array.isRequired,
  editRepresentative: PropTypes.number,
  hashtags: PropTypes.array.isRequired,
  editFilePreviews: PropTypes.array.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  handleImageClick: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  handleHashtagChange: PropTypes.func.isRequired,
  addHashtag: PropTypes.func.isRequired,
  removeHashtag: PropTypes.func.isRequired,
  currentHashtag: PropTypes.string.isRequired,
  setEditedTitle: PropTypes.func.isRequired,
  setEditedContent: PropTypes.func.isRequired,

  postData: PropTypes.object,
};
export default EditMode;
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

const MainContainer = styled.div`
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
