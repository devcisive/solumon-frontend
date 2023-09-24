import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
//컴포넌트 이름 수정 Tabs->TabsComponent
function TabsComponent({ tabLabels, defaultTab = 0 }) {
  const [value, setValue] = React.useState(defaultTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  TabsComponent.propTypes = {
    tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    defaultTab: PropTypes.number.isRequired,
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
export default TabsComponent;
