/**
 * Created by luowen on 2018/2/6
 */

const { STOCK_EX: { US } } = require('./const');
const { parseInvalid, percent } = require('./utils');

/**
 temp[0]------新浪------
 temp[1]------48.98------当前价
 temp[2]------ -0.57------涨幅（-0.57%）
 temp[3]------2016-06-22 08:19:42------ipo时间
 temp[4]------ -0.28------涨跌
 temp[5]------49.31------开盘价
 temp[6]------49.83------最高价
 temp[7]------48.92------最低价
 temp[8]------57.01------52周最高
 temp[9]------32.61------52周最低
 temp[10]------280775------成交量
 temp[11]------609728------10日均量
 temp[12]------3443098080------市值
 temp[13]------0.79------每股收益
 temp[14]------62.00------市盈率
 temp[15]------0.00------
 temp[16]------1.15------贝塔系数
 temp[17]------0.00------
 temp[18]------0.00------
 temp[19]------70296000------股本
 temp[20]------58.00------
 temp[21]------48.98------今日收盘价
 temp[22]------0.00------
 temp[23]------0.00------
 temp[24]------------
 temp[25]------Jun 21 04:00PM EDT------
 temp[26]------49.26------昨日收盘价
 temp[27]------0.00------
 * @param buffer
 * @returns {{code}}
 */
function extractData(buffer) {
  console.log('extractData', buffer);
  const code = buffer.match(/hq_str_(.*?)=/)[1];
  const quoteStr = buffer.match(/"(.*)"/)[1];
  const props = quoteStr.split(/,/g);

  if (!quoteStr) return { code: null };

  return {
    code: code.replace(/^.*_/, '').toUpperCase(),
    name: props[0],
    live: props[1],
    diff: props[2],
    time: props[25],
    open: props[5],
    high: props[6],
    low: props[7],
    amount: props[10],
    times: props[14],
    close: props[21],
    ex: US,
  }
}

function sayTempl({ code, name, live, diff, time, times, amount }) {
  return `代码：${code}
名称：${parseInvalid(name)}
现价：$${parseInvalid(+live)}
涨跌：${parseInvalid(diff)}%
成交：$${parseInvalid(amount)}
市盈：${parseInvalid(times)}
时间：${parseInvalid(time)}`;
}


function isMatch({ query }) {
  console.log('query1 us', query);

  return query.match(/^[a-z\.]/i)
    // || query.match(/^\d{5}$/i)
}

function parseSymbol({ symbol }) {
  console.log('symbol', symbol)

  symbol = symbol.replace(/\./g, '');

  if (symbol.match(/^US(.*)/)) {
    return ('gb_' + symbol.match(/^US(.*)/)[1]).toLowerCase();
  }
  return ('gb_' + symbol).toLowerCase();
}

function parseImg() {
  return null
}

module.exports = {
  extractData,
  parseSymbol,
  isMatch,
  parseImg,
  sayTempl,
  ex: US
};


