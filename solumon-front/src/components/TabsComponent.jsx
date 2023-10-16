import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//컴포넌트 이름 수정 Tabs->TabsComponent
function TabsComponent({ tabLabels, defaultTab, onClick }) {
  const [value, setValue] = React.useState(defaultTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onClick(tabLabels[newValue]); // 새로운 탭을 클릭할 때 콜백 함수 호출
  };

  return (
    <Box sx={{ width: '40%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}

TabsComponent.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultTab: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TabsComponent;
