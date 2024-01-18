export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // 24시간 형식으로 표시
  };
  const formattedDate = date.toLocaleString(undefined, options);

  // 포맷팅 된 문자열에서 마지막에 있는 점을 제거
  return formattedDate.replace(/\.$/, '');
};

export const formatDate2 = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

//id를 시간을 바탕으로 랜덤으로 만들어주는 함수
export const generateSequentialId = () => {
  return new Date().getTime().toString();
};
