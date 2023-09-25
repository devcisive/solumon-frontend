import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { useState } from 'react';
import { IoIosRemoveCircle } from 'react-icons/io';

const PostInputForm = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFile((prevSelectedFile) => [
      ...(prevSelectedFile || []),
      ...Array.from(files),
    ]);
  };
  const handleRemoveImage = (index) => {
    setSelectedFile((prevSelectedFile) => {
      const updatedFiles = [...prevSelectedFile];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const RegisterSubmit = () => {
    console.log('등록완료');
  };
  return (
    <ThemeProvider theme={theme}>
      <HeadContainer>
        <TitleSpan>게시글작성</TitleSpan>
        <RegisterButton onClick={RegisterSubmit}>등록</RegisterButton>
      </HeadContainer>

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

      {selectedFile && selectedFile.length > 0 && (
        <ImagesContainer>
          {selectedFile.map((file, index) => (
            <ImageContainer key={index}>
              <StyledFileImg
                src={URL.createObjectURL(file)}
                alt={`미리보기 ${index + 1}`}
              />
              <RemoveCircleIcon onClick={() => handleRemoveImage(index)} />
            </ImageContainer>
          ))}
        </ImagesContainer>
      )}
      <FileContainer>
        <FileLabel htmlFor="image">사진선택</FileLabel>
        <FileInput
          type="file"
          id="image"
          name="image"
          multiple="multiple"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        ></FileInput>
        <FileNameInput
          placeholder="첨부파일"
          value={
            selectedFile.length > 0
              ? selectedFile.map((file) => file.name).join(', ')
              : ''
          }
          readOnly
        ></FileNameInput>
      </FileContainer>
    </ThemeProvider>
  );
};

export default PostInputForm;
const TitleSpan = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.dark_purple};
  margin-bottom: 10px;
  display: inline;
  margin-right: 325px;
  padding-bottom: 0px;
`;
const RegisterButton = styled.button`
  padding: 8px;
  background-color: ${({ theme }) => theme.medium_purple};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 70px;
  font-size: 10px;
  text-align: center;
  display: inline;
  margin: 5px;
`;

const HeadContainer = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleInput = styled.input`
  width: 500px;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  border-radius: 5px;
  color: ${({ theme }) => theme.medium_purple};
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  margin-right: 500px;
`;
const ContentTextArea = styled.textarea`
  width: 500px;
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
  width: 500px;
  display: flex;
`;
const FileLabel = styled.label`
  padding: 10px;
  background-color: ${({ theme }) => theme.medium_purple};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 50px;
  font-size: 10px;
  text-align: center;
  display: inline;
`;
const FileInput = styled.input`
  width: 500px;
  margin-top: 10px;
   display: none;
  }
`;
const ImagesContainer = styled.div`
  display: flex;
  width: 500px;
  margin-bottom: 10px;
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
  width: 300px;
  height: 20px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
  margin-left: 5px;
`;
