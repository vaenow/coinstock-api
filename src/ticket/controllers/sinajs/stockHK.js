/**
 * Created by luowen on 2018/2/6
 */

const { STOCK_EX: { HK } } = require('./const');
const { parseInvalid } = require('./utils');

/**
 temp[0]------CHEUNG KONG------名称
 temp[1]------长和------股票名称
 temp[2]------90.300------今日开盘价
 temp[3]------91.050------昨日收盘价
 temp[4]------91.050------最高价
 temp[5]------90.000------最低价
 temp[6]------90.750------当前价（现价）
 temp[7]------ -0.300------涨跌
 temp[8]------ -0.329------涨幅
 temp[9]------90.650------买一
 temp[10]------90.750------卖一
 temp[11]------627798876------成交额
 temp[12]------6932826------成交量
 temp[13]------2.954------市盈率
 temp[14]------2.810------周息率（2.810%）
 temp[15]------118.800------52周最高
 temp[16]------87.600------52周最低
 temp[17]------2016/06/22------日期
 temp[18]------16:01------时间
 * @param buffer
 * @returns {{code}}
 */
function extractData(buffer) {
  console.log('extractData', buffer)
  const code = buffer.match(/hq_str_(.*?)=/)[1];
  const quoteStr = buffer.match(/"(.*)"/)[1];
  const props = quoteStr.split(/,/g);

  if (!quoteStr) return { code: null };

  return {
    code: code.replace(/^.*_/, '').toUpperCase(),
    name: props[0],
    nameCn: props[1],
    live: props[6],
    diff: props[8],
    time: props[17] + " " + props[18],
    open: props[2],
    high: props[4],
    low: props[5],
    amount: props[12],
    times: props[13],
    close: props[3],
    ex: HK,
 }
}

function sayTempl({ code, name, nameCn, live, diff, time, times, amount }) {
  return `代码：${code}
名称：${parseInvalid(name)} ${parseInvalid(nameCn)}
现价：$${parseInvalid(+live)}（港币）
涨跌：${parseInvalid(diff)}%
成交：$${parseInvalid(amount)}
市盈：${parseInvalid(times)}
时间：${parseInvalid(time)}`;
}


function isMatch({ query }) {
  // var hq_str_gb_sina="新浪,48.98,-0.57,2016-06-22 08:19:42,-0.28,49.31,49.83,48.92,57.01,32.61,280775,609728,3443098080,0.79,62.00,0.00,1.15,0.00,0.00,70296000,58.00,48.98,0.00,0.00,,Jun 21 04:00PM EDT,49.26,0.00";
  // hq_str_hk00001
  // if (query.length === 5 && !isNaN(query)) {
  //   return true;
  // }
  console.log('query1 hk', query)

  return query.match(/^HK/i)
    || query.match(/^\d{5}$/i)
}

function parseSymbol({ symbol }) {
  console.log('symbol', symbol)
  if (symbol.match(/^HK(.*)/)) {
    return ('hk' + symbol.match(/^HK(.*)/)[1]).toLowerCase();
  }
  return ('hk' + symbol).toLowerCase();
}

// http://image.sinajs.cn/newchart/hk_stock/daily/02202.gif?1288616934000
function parseImg({ symbol }) {
  return `http://image.sinajs.cn/newchart/hk_stock/daily/${symbol}.gif`
}

module.exports = {
  extractData,
  parseSymbol,
  isMatch,
  sayTempl,
  parseImg,
  ex: HK
};


