const colors = {
  // alphas
  white: 'rgba(255,255,255,1.0)',
  tint: 'rgba(255,255,255,0.5)',
  shade: 'rgba(0,0,0,0.40)',
  shadeDark: 'rgba(0,0,0,0.70)',
  // red
  red50: '#FFF3F8',
  red100: '#FFE3EE',
  red200: '#FFC5DC',
  red300: '#FFA2C8',
  red400: '#FF73AC',
  red500: '#FF4591',
  red600: '#FF2D82',
  red700: '#FF1675',
  red800: '#DF005B',
  red900: '#CF0758',
  // orange
  orange50: '#FFF9F3',
  orange100: '#FEF1E3',
  orange200: '#FEE2C4',
  orange300: '#FED0A1',
  orange400: '#FEB973',
  orange500: '#FDA144',
  orange600: '#FD952C',
  orange700: '#FD8A15',
  orange800: '#EB7701',
  orange900: '#DD6F00',
  // yellow
  yellow50: '#FFFCF6',
  yellow100: '#FFF8E8',
  yellow200: '#FFF1D0',
  yellow300: '#FFE9B5',
  yellow400: '#FFDD8F',
  yellow500: '#FFD574',
  yellow600: '#FFCF61',
  yellow700: '#FFC745',
  yellow800: '#F1B730',
  yellow900: '#ECAC16',
  // green
  green50: '#F2FDF9',
  green100: '#E0FBF0',
  green200: '#C0F7E1',
  green300: '#9AF3CF',
  green400: '#67ECB8',
  green500: '#35E6A0',
  green600: '#1BE393',
  green700: '#02E088',
  green800: '#02C97A',
  green900: '#00BA70',
  // blue
  blue50: '#F6F9FF',
  blue100: '#E8EFFF',
  blue200: '#D0DFFF',
  blue300: '#B3CBFF',
  blue400: '#8EB2FF',
  blue500: '#6898FF',
  blue600: '#548AFF',
  blue700: '#427EFF',
  blue800: '#3068E1',
  blue900: '#2556C0',
  // indigo
  indigo50: '#F4F4F9',
  indigo100: '#E5E4EF',
  indigo200: '#C9C7DE',
  indigo300: '#A8A5CB',
  indigo400: '#7D78B1',
  indigo500: '#514B97',
  indigo600: '#3B348A',
  indigo700: '#261E7D',
  indigo800: '#1B145D',
  indigo900: '#130E46',
  // purple
  purple50: '#FBF6FF',
  purple100: '#F6E9FF',
  purple200: '#ECD2FF',
  purple300: '#E1B7FF',
  purple400: '#D294FF',
  purple500: '#C370FF',
  purple600: '#BB5DFF',
  purple700: '#B44CFF',
  purple800: '#9E3DE5',
  purple900: '#832DC1',
  // light-grey
  lightGrey100: '#F9FBFD',
  lightGrey200: '#F7F9FC',
  lightGrey300: '#F3F5FA',
  lightGrey400: '#EDF1F8',
  lightGrey500: '#E7ECF7',
  lightGrey600: '#DFE6F4',
  lightGrey700: '#D7E0F1',
  lightGrey800: '#CAD6EB',
  lightGrey900: '#BFCCE3',
  // dark-grey
  darkGrey50: '#ADBAD0',
  darkGrey100: '#A2B0C9',
  darkGrey200: '#95A5C2',
  darkGrey300: '#8596B7',
  darkGrey400: '#7688AE',
  darkGrey500: '#6B7FA6',
  darkGrey600: '#6478A2',
  darkGrey700: '#4A5D85',
  darkGrey800: '#344468',
  darkGrey900: '#243252',
  // navy
  navy100: '#E1E0E9',
  navy200: '#C1C0D1',
  navy300: '#9C9AB6',
  navy400: '#6B6791',
  navy500: '#353069',
  navy600: '#201B5A',
  navy700: '#080248',
  navy800: '#050035',
  navy900: '#03001E',
  // brand - defined to provide type interface (assigned externally)
  red: null,
  redDark: null,
  orange: null,
  orangeDark: null,
  yellow: null,
  yellowDark: null,
  green: null,
  greenDark: null,
  blue: null,
  blueDark: null,
  purple: null,
  purpleDark: null,
  navy: null,
  navyDark: null,
  greyText: null
};

colors.red = colors.red700;
colors.redDark = colors.red900;
colors.orange = colors.orange700;
colors.orangeDark = colors.orange900;
colors.yellow = colors.yellow700;
colors.yellowDark = colors.yellow900;
colors.green = colors.green700;
colors.greenDark = colors.green900;
colors.blue = colors.blue700;
colors.blueDark = colors.blue900;
colors.purple = colors.purple700;
colors.purpleDark = colors.purple900;
colors.navy = colors.navy700;
colors.navyDark = colors.navy900;
colors.greyText = colors.darkGrey900;
colors.indigo = colors.indigo700;

module.exports = { colors };
