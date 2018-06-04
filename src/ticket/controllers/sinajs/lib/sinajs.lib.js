/**
 * Created by luowen on 2018/2/6
 */

var http = require('http');
var iconv = require('iconv-lite');
var queryString = require('query-string');

var optionsFetchDefault = {
  host: 'hq.sinajs.cn',
  port: 80,
  path: '/list=',
  symbol: 'sh000001',
  method: 'GET',
  encoding: null //让body 直接是buffer
};

var optionsSuggestDefault = {
  host: 'suggest3.sinajs.cn',
  port: 80,
  // path: '/suggest/type=&key=${}&name=suggestdata_1429775785401',
  path: '',
  // key: '000001',
  method: 'GET',
  encoding: null //让body 直接是buffer
};
var optionsSuggestParam = {
  type: '',
  key: '',
  name: ''
};

exports.fetchStockData = function (options = {}, callback) {
  // http://hq.sinajs.cn/list=gb_inx
  console.log('options', options)
  options = {
    ...optionsFetchDefault,
    ...options
  };
  options.path += options.symbol;
  request(options, callback);
};

const suggestStock = function ({ query }, callback) {
  // http://suggest3.sinajs.cn/suggest/type=&key=60&name=suggestdata_1429775785401
  var param = {
    ...optionsSuggestParam,
    name: 'suggestdata_' + Date.now(),
    key: query
  };
  var parsedHash = queryString.stringify(param);
  var options = {
    ...optionsSuggestDefault,
    path: '/suggest/' + parsedHash
  };
  console.log('options', options);
  request(options, callback);
};
exports.suggestStock = suggestStock

exports.suggestStockAsync = function ({ query }) {
  return new Promise((resolve, reject) => {
    suggestStock(
      { query },
      (buffer) => {
        resolve(buffer)
      })
  });
};

function request(options, callback) {
  var quoteReq = http.get(options, function (quoteRes) {
    console.log('res statusCode: ' + quoteRes.statusCode, options.host + options.path);
    var chunks = [];
    quoteRes.on('data', function (chunk) {
      chunks.push(chunk)
    });
    quoteRes.on('end', function () {
      var decodedBody = iconv.decode(Buffer.concat(chunks), 'gbk');
      console.log(decodedBody);
      typeof callback === 'function' && callback(decodedBody);
    })
  });
  quoteReq.on('error', function (err) {
    console.error('request to fetch data failed' + err.message);
  });
  quoteReq.end();
}
