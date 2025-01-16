export const GenericStyle = {
  // center  vertically in row
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
  },

  // center both vertically and horizontally in row
  flexRowCompleteCenter: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // center both horizontally and vertically in column

  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexColumnCenterString: `
  display: flex;
  flex-direction: column;
  align-items: center;
`,

  font10Regular: {
    fontSize: '10px',
    fontWeight: '400',
  },

  font12Regular: {
    fontSize: '12px',
    fontWeight: '400',
  },

  font14Regular: {
    fontSize: '14px',
    fontWeight: '400',
  },

  font16Regular: {
    fontSize: '16px',
    fontWeight: '400',
  },

  font18Regular: {
    fontSize: '18px',
    fontWeight: '400',
  },

  font20Regular: {
    fontSize: '20px',
    fontWeight: '400',
  },

  font24Regular: {
    fontSize: '24px',
    fontWeight: '400',
  },

  font10Medium: {
    fontSize: '10px',
    fontWeight: '500',
  },

  font12Medium: {
    fontSize: '12px',
    fontWeight: '500',
  },

  font14Medium: {
    fontSize: '14px',
    fontWeight: '500',
  },
  font16Medium: {
    fontSize: '16px',
    fontWeight: '500',
  },
  font18Medium: {
    fontSize: '18px',
    fontWeight: '500',
  },
  font20Medium: {
    fontSize: '20px',
    fontWeight: '500',
  },
  font24Medium: {
    fontSize: '24px',
    fontWeight: '500',
  },
  font10Bold: {
    fontSize: '10px',
    fontWeight: '700',
  },
  font12Bold: {
    fontSize: '12px',
    fontWeight: '700',
  },
  font14Bold: {
    fontSize: '14px',
    fontWeight: '700',
  },
  font16Bold: {
    fontSize: '16px',
    fontWeight: '700',
  },
  font18Bold: {
    fontSize: '18px',
    fontWeight: '700',
  },
  font20Bold: {
    fontSize: '20px',
    fontWeight: '700',
  },
  font24Bold: {
    fontSize: '24px',
    fontWeight: '700',
  },
  font10ExtraBold: {
    fontSize: '10px',
    fontWeight: '800',
  },
  font12ExtraBold: {
    fontSize: '12px',
    fontWeight: '800',
  },
  font14ExtraBold: {
    fontSize: '14px',
    fontWeight: '800',
  },
  font16ExtraBold: {
    fontSize: '16px',
    fontWeight: '800',
  },
  font18ExtraBold: {
    fontSize: '18px',
    fontWeight: '800',
  },
  font20ExtraBold: {
    fontSize: '20px',
    fontWeight: '800',
  },
  font24ExtraBold: {
    fontSize: '24px',
    fontWeight: '800',
  },
  font10Black: {
    fontSize: '10px',
    fontWeight: '900',
  },
  font12Black: {
    fontSize: '12px',
    fontWeight: '900',
  },
  font14Black: {
    fontSize: '14px',
    fontWeight: '900',
  },
  font16Black: {
    fontSize: '16px',
    fontWeight: '900',
  },
  font18Black: {
    fontSize: '18px',
    fontWeight: '900',
  },
  font20Black: {
    fontSize: '20px',
    fontWeight: '900',
  },
  font24Black: {
    fontSize: '24px',
    fontWeight: '900',
  },

  // Font Sizes
  font10: '10px',
  font12: '12px',
  font14: '14px',
  font16: '16px',
  font18: '18px',
  font20: '20px',
  font24: '24px',
  font28: '28px',
  font32: '32px',
  font36: '36px',
  font40: '40px',
  font48: '48px',
  font56: '56px',

  // Padding and Margin Sizes
  small_padding: '2px',
  tenary_padding: '4px',
  tertiary_padding: '8px',
  primary_padding: '12px',
  secondary_padding: '16px',
  larger_padding: '20px',
  extra_padding: '28px',

  small_margin: '2px',
  tenary_margin: '4px',
  tertiary_margin: '8px',
  primary_margin: '12px',
  secondary_margin: '16px',
  larger_margin: '20px',
  extra_margin: '28px',

  // Border Radius
  borderRadiusSmall: '4px',
  borderRadiusMedium: '8px',
  borderRadiusLarge: '16px',
  borderRadiusFull: '50%',

  // Box Shadows
  boxShadowSmall: '0 1px 2px rgba(0, 0, 0, 0.1)',
  boxShadowMedium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  boxShadowLarge: '0 10px 15px rgba(0, 0, 0, 0.1)',
  boxShadowHover: '0 2px 8px rgba(0, 0, 0, 0.15)',

  // Opacity
  opacityHigh: '1',
  opacityMedium: '0.7',
  opacityLow: '0.4',

  // Z-Index
  zIndexLow: 10,
  zIndexMedium: 50,
  zIndexHigh: 100,
  zIndexTop: 1000,

  // Display Utilities
  displayNone: {
    display: 'none',
  },
  displayBlock: {
    display: 'block',
  },
  displayFlex: {
    display: 'flex',
  },
  displayInline: {
    display: 'inline',
  },
  positionAbsolute: {
    position: 'absolute',
  },
  positionFixed: {
    position: 'fixed',
  },
  positionRelative: {
    position: 'relative',
  },
  positionSticky: {
    position: 'sticky',
  },

  // Transitions
  transitionDefault: 'all 0.3s ease',
  transitionFast: 'all 0.2s ease',
  transitionSlow: 'all 0.5s ease',

  // Image Sizes (Width & Height)
  image18: {
    width: '18px',
    height: '18px',
  },
  image20: {
    width: '20px',
    height: '20px',
  },
  image24: {
    width: '24px',
    height: '24px',
  },
  image28: {
    width: '28px',
    height: '28px',
  },
  image32: {
    width: '32px',
    height: '32px',
  },
  image36: {
    width: '36px',
    height: '36px',
  },
  image40: {
    width: '40px',
    height: '40px',
  },
  image48: {
    width: '48px',
    height: '48px',
  },
  image56: {
    width: '56px',
    height: '56px',
  },
};
