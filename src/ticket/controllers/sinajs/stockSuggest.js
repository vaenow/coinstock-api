/**
 * Created by luowen on 2018/2/6
 */

const { STOCK_EX: { HK } } = require('./const');
const { parseInvalid } = require('./utils');

/**
 var suggestdata_1429775785401="txkg,31,00700,00700,腾讯控股,txkg,腾讯控股,10";

 * @param buffer
 * @returns {{symbol}}
 */
function extractData(buffer) {
  console.log('extractData', buffer)
  const quoteStr = buffer.match(/"(.*)"/)[1];
  const props = quoteStr.split(/,/g);

  return {
    symbol: props[2]
  }
}

function isMatch({ symbol }) {
  console.log('symbol1 suggest', symbol)

  return symbol.match(/^HK/i)
}

function parseSymbol({ symbol }) {
  console.log('symbol', symbol)
  return ('hk' + symbol.match(/^HK(.*)/)[1]).toLowerCase();
}

module.exports = {
  extractData,
  parseSymbol,
  isMatch,
};


