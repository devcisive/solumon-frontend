import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { HashTagChoice } from '../recoil/AllAtom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';

const hashTagList = [
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

function HashTagList() {
  const [selectedHashTag, setSelectedHashTag] = useState([]);
  const setHashTagChoice = useSetRecoilState(HashTagChoice);

  const handleClickHashTag = (hashTag) => {
    if (selectedHashTag.includes(hashTag)) {
      setSelectedHashTag(selectedHashTag.filter((item) => item !== hashTag));
    } else {
      // 최대 5개까지만 선택 가능
      if (selectedHashTag.length < 5) {
        setSelectedHashTag([...selectedHashTag, hashTag]);
      }
    }
  };

  useEffect(() => {
    setHashTagChoice({
      hashTag: selectedHashTag,
    });
  }, [selectedHashTag]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledUl>
          {hashTagList.map((hashTag, idx) => (
            <StyledLi
              key={idx}
              onClick={() => handleClickHashTag(hashTag)}
              isSelected={selectedHashTag.includes(hashTag)}
            >
              {hashTag}
            </StyledLi>
          ))}
        </StyledUl>
      </Wrapper>
    </ThemeProvider>
  );
}

export default HashTagList;

const Wrapper = styled.div`
  margin-top: 20px;
`;

const StyledUl = styled.ul`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 15px;
`;

const StyledLi = styled.li`
  color: ${({ theme }) => theme.dark_purple};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.light_purple : 'transparent'};
  font-size: 14px;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.light_purple};
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
`;
