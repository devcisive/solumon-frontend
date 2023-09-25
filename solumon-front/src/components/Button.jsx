import styled, { ThemeProvider } from 'styled-components';
import theme from '../style/theme';
import PropTypes from 'prop-types';

function Button({
  name,
  onClick,
  bgColor,
  color,
  fontSize,
  fontWeight,
  padding,
  borderRadius,
}) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton
        onClick={onClick}
        bgColor={bgColor}
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        padding={padding}
        borderRadius={borderRadius}
      >
        <StyledSpan>{name}</StyledSpan>
      </StyledButton>
    </ThemeProvider>
  );
}
Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.number,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
};
export default Button;

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || theme.medium_purple};
  color: ${(props) => props.color || props.theme.linen};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || 400};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius || '0'};
  border: none;
  width: 150px;
  height: 100px;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.linen};
  text-align: center;
  font-size: 26px;
  font-weight: 500px;
`;
