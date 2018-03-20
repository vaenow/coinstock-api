/**
 * Created by luowen on 2018/2/6
 */

const { STOCK_EX: { A } } = require('./const');
const { parseInvalid, percent } = require('./utils');

/**
 temp[0]------宝光股份------股票名称
 temp[1]------18.100------今日开盘价
 temp[2]------18.190------昨日收盘价
 temp[3]------19.080------现价（股票当前价，收盘以后这个价格就是当日收盘价）
 temp[4]------19.090------最高价
 temp[5]------18.100------最低价
 temp[6]------19.080------买一
 temp[7]------19.090------卖一
 temp[8]------2871283------总量（成交量，成交的股票数，由于股票交易以一百股为基本单位，所以在使用时，通常把该值除以一百；）
 temp[9]------53939719.000------成交额，单位为“元”，为了一目了然，通常以“万元”为成交金额的单位，所以通常把该值除以一万；
 temp[10]------1100------买一挂单数量（也就是11手）
 temp[11]------19.080------买一
 temp[12]------4600------买二挂单数量
 temp[13]------19.070------买二
 temp[14]------5500------买三挂单数量
 temp[15]------19.060------买三
 temp[16]------6200------买四挂单数量
 temp[17]------19.050------买四
 temp[18]------13900------买五挂单数量
 temp[19]------19.040------买五
 temp[20]------13159------卖一挂单数量
 temp[21]------19.090------卖一
 temp[22]------20122------卖二挂单数量
 temp[23]------19.100------卖二
 temp[24]------8000------卖三数量
 temp[25]------19.110------卖三
 temp[26]------7800------卖四数量
 temp[27]------19.120------卖四
 temp[28]------1300------卖五数量
 temp[29]------19.130------卖五
 temp[30]------2016-06-22------日期
 temp[31]------15:00:00------时间
 temp[32]------00------00表示收盘
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
    live: props[3],
    diff: percent(props[1], props[3]),
    time: props[30] + " " + props[31],
    open: props[1],
    high: props[4],
    low: props[5],
    amount: props[9],
    // times: props[13],
    close: props[2],
    ex: A,
  }
}

function sayTempl({ code, name, live, diff, time, times, amount }) {
  return `代码：${code}
名称：${parseInvalid(name)}
现价：￥${parseInvalid(+live)}
涨跌：${parseInvalid(diff)}%
成交：￥${parseInvalid(+amount)}
时间：${parseInvalid(time)}`;
}


function isMatch({ query }) {
  // var hq_str_gb_sina="新浪,48.98,-0.57,2016-06-22 08:19:42,-0.28,49.31,49.83,48.92,57.01,32.61,280775,609728,3443098080,0.79,62.00,0.00,1.15,0.00,0.00,70296000,58.00,48.98,0.00,0.00,,Jun 21 04:00PM EDT,49.26,0.00";
  // hq_str_hk00001
  // if (query.length === 5 && !isNaN(query)) {
  //   return true;
  // }
  console.log('symbol1 a', query)

  return query.match(/\d{6}/i)
}

function parseSymbol({ symbol }) {
  console.log('symbol a', symbol)
  return getCodeWithPrefix({ symbol })
}

function getCodeWithPrefix({ symbol }) {
  const code = symbol.match(/(\d{6})/)[1];
  if (code.length === 6) {
    if (
      code.startsWith('0')
      || code.startsWith('3')
    ) return ('sz' + code).toLowerCase();
    if (code.startsWith('6')) return ('sh' + code).toLowerCase();
  }
}

// http://image.sinajs.cn/newchart/daily/n/sz000001.gif
function parseImg({ symbol }) {
  return `http://image.sinajs.cn/newchart/daily/n/${getCodeWithPrefix({ symbol })}.gif`
}

module.exports = {
  extractData,
  parseSymbol,
  isMatch,
  parseImg,
  sayTempl,
  ex: A
};


