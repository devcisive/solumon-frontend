const deviceSizes = {
  mobile: '374px',
  tablet: '767px',
  laptop: '1023px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

export default device;
