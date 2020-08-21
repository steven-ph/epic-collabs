const { createGlobalStyle } = require('styled-components');
const { rgba } = require('polished');
const { colours } = require('./colours');
const { easing } = require('./easing');

const GlobalStyle = createGlobalStyle`
  .ant-tooltip-inner {
    background-color: ${rgba(colours.indigo700, 0.85)};
    text-align: center;
    font-size: 13px;
  }

  .antd-white-tooltip {
    .ant-tooltip-arrow::before {
      background: #FFF;
    }
    .ant-tooltip-inner {
      background: #FFF;
      color: ${colours.navy900};
      font-size: 14px;
      font-weight: 600;
    }
  }
  .antd-white-tooltip .ant-tooltip-inner {
    text-align: left;
  }

  .rotatable {
    transform: rotate(0deg);
    transition: transform .1s ${easing.easeInOutCubic};
  }

  .rotatable.rotate-180 {
    transform: translateY(50%) rotate(-180deg);
    transition: transform .1s ${easing.easeInOutCubic};
  }
`;

module.exports = { GlobalStyle };
