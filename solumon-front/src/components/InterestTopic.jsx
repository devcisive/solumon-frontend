import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

const topicList = [
  '연애',
  '친구',
  '뷰티',
  '패션',
  '공부',
  '취업',
  '학업',
  '연예',
  '드라마',
  '영화',
  '진로',
  '결혼',
  '독서',
  '반려동물',
  '게임',
  '직장',
  '음악',
  '음식',
  '스포츠',
  '운동',
  '다이어트',
  '자취',
  '건강',
  '여행',
  '자격증',
  '해외',
  '전자기기',
];

function InterestTopic() {
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [generalUserInfo, setGeneralUserInfo] = useRecoilState(GeneralUserInfo);

  const handleClickTopic = (topic) => {
    if (selectedTopic.includes(topic)) {
      setSelectedTopic(selectedTopic.filter((item) => item !== topic));
    } else {
      // 최대 5개까지만 선택 가능
      if (selectedTopic.length < 5) {
        setSelectedTopic([...selectedTopic, topic]);
      }
    }
  };

  useEffect(() => {
    setGeneralUserInfo({
      ...generalUserInfo,
      interests: selectedTopic,
    });
  }, [selectedTopic]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledUl>
          {topicList.map((topic, idx) => (
            <StyledLi
              key={idx}
              onClick={() => handleClickTopic(topic)}
              isSelected={selectedTopic.includes(topic)}
            >
              {topic}
            </StyledLi>
          ))}
        </StyledUl>
      </Wrapper>
    </ThemeProvider>
  );
}

export default InterestTopic;

const Wrapper = styled.div``;

const StyledUl = styled.ul`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 30px;
  width: 640px;
`;

const StyledLi = styled.li`
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.light_purple : 'transparent'};
  font-size: 18px;
  width: fit-content;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;

  /* &:hover {
    color: ${({ theme }) => theme.linen};
    background-color: ${({ theme }) => theme.medium_purple};
  } */
`;
