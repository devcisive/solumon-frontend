import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function TextButton() {
  return (
    <Button
      variant="text"
      sx={{
        color: '#292435',
        '&:hover': {
          color: 'gray',
        },
      }}
    >
      전체보기
      <ChevronRightIcon />
    </Button>
  );
}

export default TextButton;
