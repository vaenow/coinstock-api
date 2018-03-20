/**
 * Created by luowen on 2018/2/6
 */

const path = require('path');

const { downloadFile } = require('./utils');
const { CHAT_ROOM_STOCK, EXCLUDE_COINS } = require('./const');
const { fetchStockData, suggestStock, suggestStockAsync } = require('./lib/sinajs.lib');
const stockUS = require('./stockUS');
const stockHK = require('./stockHK');
const stockA = require('./stockA');
const stockSuggest = require('./stockSuggest');

function guessStockExchange({ query }) {
  let stockEx = null;
  if (!query) return stockEx;

  if (stockA.isMatch({ query })) {
    stockEx = stockA;
  } else if (stockHK.isMatch({ query })) {
    stockEx = stockHK;
  } else if (stockUS.isMatch({ query })) {
    stockEx = stockUS;
  }

  return stockEx;
}

function guessStockExchangeV2({ query }) {
  return new Promise((resolve, reject) => {
    suggestStock(
      { query },
      (buffer) => {
        const { symbol } = stockSuggest.extractData(buffer);
        const stockEx = guessStockExchange({ query: symbol });
        console.log(stockEx);
        resolve({ stockEx, symbol });
      })
  })
}

async function boot({ query }) {

  query = query.toLowerCase();
  if(query === '腾讯') query = '腾讯控股';
  // let stockEx = guessStockExchange({ query });
  // if (!stockEx) {
  let { stockEx, symbol } = await guessStockExchangeV2({ query });
  // }

  if (stockEx) {
    return new Promise((resolve, reject) => {
      fetchStockData(
        { symbol: stockEx.parseSymbol({ symbol }) },
        (buffer) => {
          const data = stockEx.extractData(buffer);
          const say = stockEx.sayTempl(data);
          const chart = stockEx.parseImg({ symbol });
          if (data.code) {
            console.log(say, chart);
            resolve({ /*say, */chart, query, ...data });
          } else {
            resolve({});
          }
        })
    })
  } else {
    console.log('no stockEx')
  }
}

function isMatchRoom(room, content) {
  if (!content || content.length >= 10) return; // 忽略长度大于等于10的字符串
  if (!isNaN(content) && content.length <= 3) return; // 忽略长度小于等于3的数字
  // if (!content.startsWith(' ')) return;

  const names = room.toString().match(/<(.*)>/);
  return names
    && names[1]
    && CHAT_ROOM_STOCK.indexOf(names[1]) !== -1
    && EXCLUDE_COINS.indexOf(content.toUpperCase()) === -1
}

async function getLocalFilePath(url) {
  const filename = url.split(/\//).pop();
  return await downloadFile(url, path.join(__dirname, 'charts', filename))
}
// getLocalFilePath('http://image.sinajs.cn/newchart/daily/n/sh603100.gif');

module.exports = {
  boot,
  isMatchRoom,
  getLocalFilePath,
};
