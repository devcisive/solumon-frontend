import { useParams,useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoIosRemoveCircle } from 'react-icons/io';
import { BsPlusSquare } from 'react-icons/bs';
import VoteResult from '../components/VoteResult';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';

const Edit=()=>{
  const navigate = useNavigate();
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editSelectedFile, setEditSelectedFile] = useState([]); 
  const [editHashtags, setEditHashtags] = useState([]); 
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [editRepresentative, setEditRepresentative] = useState(null);
  const [editFilePreviews, setEditFilePreviews] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [representative, setRepresentative] = useState(null);
  const userInfo = useRecoilState(GeneralUserInfo);
  const accessToken = userInfo[0].accessToken;
  
  useEffect(() => {
  const fetchData = async () => {
    try{
      const headers = {
        'X-AUTH-TOKEN': accessToken,
        'withCredentials': true
      };
      const response = await axios.get(
        `http://solumon.site:8080/posts/${postId}`,
        {
          headers,
        }
        )
   
        if (response.status === 200) {
          console.log(response.data);
          console.log('수정데이터 받아오기 성공');
          const postData = response.data;
          const cleanedTags = postData.tags.map((tagObj) => tagObj.tag);
          const images = response.data.images; // 이미지 정보 배열
          const imageUrls = images.map((image) => image.image);
          setPostData(postData);
          setEditedTitle(response.data.title); 
          setEditedContent(response.data.contents);
          setEditHashtags(cleanedTags);
          setEditFilePreviews(imageUrls);
          console.log(editFilePreviews)
          setEditSelectedFile(images)
          console.log(editSelectedFile)
          //const decodeFile = decodeURIComponent(imageUrls);
          
          // const imageFileNames = parts.map((url) => {
           //const fileName = decodeFile.split('/').pop();
           //const cleanFileName = fileName.match(/[가-힣.]+/)[0];
          //const finalName =  cleanFileName + fileName.slice(-3);
          //console.log(finalName)
        setNewFiles((prevFiles) => {
          return prevFiles || [];
        });
      } else {
        console.error('전달 실패');
      }
    } catch (error) {
      console.error('오류 발생: ' + error);
    }
  }
  fetchData();
  },[postId, accessToken])
  // 서버로부터 게시물 데이터prevFilePreviews를 가져옴

 //사진업로드 onchange
  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    if (newFiles) {
    const newFileNames = Array.from(newFiles).map((file) => file.name); // 파일명 추출
    const newFileObjects = Array.from(newFiles).map((file) => URL.createObjectURL(file));

    // 이전 데이터와 중복되지 않도록 새로운 파일만 추가
    setEditSelectedFile((prevSelectedFile)=>[
      ...(prevSelectedFile || []),
      ...newFileNames,
    ]);
   
    setEditFilePreviews((prevFilePreviews)=>[
      ...(prevFilePreviews || []),
      ...newFileObjects,
    ]);
    setNewFiles((prevFiles)=>[
      ...(prevFiles || []),
      ...newFiles,
    ])
    if (representative === null && newFileObjects.length > 0) {
      //대표이미지를 선택하지 않았을때, 임의로 첫번째로 대표이미지 설정
      setRepresentative(0);
    }
   }
  }
  //수정한 내용 저장 버튼
  const handleSaveClick = (e) => {
    e.preventDefault();
    const updatedImages = editFilePreviews.map((image, idx) => ({
      image: image,
      index: idx + 2,
      representative: idx === editRepresentative,
    }));
  
    const updatedData = {
      title: editedTitle,
      contents: editedContent,
      tags: editHashtags.map((tag) => ({ tag })),
      images: updatedImages, // 수정된 이미지 정보를 업데이트
      // ...
    };
    console.log('수정데이터', updatedData); // updatedData 업데이트
  

    // const updatedData = {
    //   title: editedTitle,
    //   contents: editedContent,
    //   tags: editHashtags.map((tag) => ({ tag })),
    //   images:[ ...editSelectedFile.map((imageName, index) => ({
    //     image:imageName,
    //     index: index + 2,
    //     representative: index === editRepresentative, // 대표 이미지 여부
    //   })),
    //   ...postData.images,
    // ]
    // };
   alert('저장이 완료되었습니다.')
   
   const formData = new FormData();
   for (let i = 0; i < newFiles.length; i++) {
    formData.append("images", newFiles[i]);
  }
  
  const json = JSON.stringify(updatedData);
  const blob = new Blob([json], { type: "application/json" })
  formData.append("request", blob);
  console.log(formData)
  //수정한 내용 put
    const headers = {
      'X-AUTH-TOKEN': accessToken,
    };
    // console.log(headers)
    //수정한 정보 put요청 코드//
        try{
            const response = axios.put(
              `http://solumon.site:8080/posts/${postId}`,
              formData,
              {
                headers,
                withCredentials: true
                },
            ) 
            console.log(response)
            console.log(formData)
            if (response.status === 200) {
              console.log(response.data);
              console.log('수정정보전달 성공');
              navigate(`/postsDetail/${response.data.post_id}`);
             } else {
                console.error('전달 실패');
              }
            } catch (error) {
              console.error('오류 발생: ' + error);
          
            }
          }

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
  //사진지우기함수
  const handleRemoveImage = (index) => {
    setEditSelectedFile((prevSelectedFile) => {
      const updatedFiles = [...prevSelectedFile];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    setEditFilePreviews((prevFilePreviews) => {
      const updatedPreviews = [...prevFilePreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });

    setNewFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

      if (index === editRepresentative) {
        setEditRepresentative(null);
      } else if (index < editRepresentative) {
        // 제거된 이미지가 대표 이미지 앞에 있었을 경우,대표 이미지 인덱스를 감소
        setEditRepresentative(editRepresentative - 1);
      }
      
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
  <MainContainer onSubmit={handleSaveClick} encType="multipart/form-data">
        <ReStorerButtonContainer>
          <ReStorerButton type="submit" onClick={handleSaveClick}>저장</ReStorerButton>
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

      {editFilePreviews.length > 0 && (
         <ImagesContainer>
        {editFilePreviews.map((image, index) => (
          <ImageContainer key={index}>
            <StyledFileImg
              src={image}
              alt={`미리보기 ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
        
            {editRepresentative === index && <Badge>대표</Badge>}
            {/* 이미지 삭제 버튼 */}
            <RemoveCircleIcon onClick={() => handleRemoveImage(index)} />
          </ImageContainer>
        ))}
      </ImagesContainer>
      )}
      
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
          value={editSelectedFile ? editSelectedFile.join(',') : ''}
          readOnly
        />
      </FileContainer>
      <VoteCommentContainer>
        <VoteComment>📢투표는 수정이 불가능합니다.</VoteComment>
      </VoteCommentContainer>
     <VoteResult choices={postData.vote.choices} postData={postData} endAt={postData.end_at}
            createdAt={postData.created_at} />
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
            #{hashtag}
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
  width: auto;
  background-color: ${({ theme }) => theme.linen};
  margin-right:910px;
`;
const VoteComment = styled.div`
  color: #e53935;
  font-size: 17px;
  font-weight: bold;
  display: flex;
  margin:10px;
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
  margin-left:-50px;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline;
  border-radius: 5px;
  padding-bottom: 0px;
  width: 55%;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.medium_purple};
`;
const ContentTextArea = styled.textarea`
margin-left:-50px;
  width: 55%;
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
  width: 53%;
  justify-content: flex-end;
`;
const ReStorerButton = styled.button`
  background-color: ${({ theme }) => theme.medium_purple};
  color: ${({ theme }) => theme.linen};
  border-radius: 5px;
  padding: 10px;
  width: 100px;
  margin-bottom: 10px;
`;
//사진 수정모드
const FileContainer = styled.div`
margin-left:-50px;
  width: 55%;
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
margin-left:-50px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 55%;
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
  width: 100px;
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
  width: 80%;
  border-radius: 5px;
  margin-top: 10px;
  margin-left:450px;
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
  margin-left:40px;
`;
const Hashtag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  margin-top:10px;
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