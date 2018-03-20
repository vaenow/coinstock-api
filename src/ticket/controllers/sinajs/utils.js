/**
 * Created by luowen on 2018/2/6
 */

const _ = require('lodash');
const http = require('http');
const path = require('path');
const fs = require('fs');

function getUtcDiff() {
  const d = new Date();
  return (-8) * 3600000;
}

function parseInvalid(content) {
  if (
    content == null
    || content === 'NULL'
  ) {
    return '-'
  }
  return content
}

// console.log(percent(1.2, 3.4))
// console.log(percent(0.1134, 3.4, true));
// console.log(percent(0.1134, 0, true));
// console.log(percent(0.1134, 0));
// console.log(percent(0.1134, true));
// console.log(percent(0.1134, false));
// console.log(percent(0.1134));
function percent(from, to = null, isStr = null) {
  let rate;
  if (isStr === null && (to === null || to === false || to === true)) {
    rate = from;
    if (to === true) {
      isStr = true
    }
  } else {
    rate = (to - from) / from;
  }
  const per = _.round(rate * 100, 2);
  return isStr ? per + '%' : per;
}

const downloadFile = function(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  return new Promise((resolve => {
    http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function(args) {
        file.close();
        console.log('args', args)
        resolve(dest)
      });
    });
  }))
}
// downloadFile('http://image.sinajs.cn/newchart/daily/n/sh603100.gif', path.join(__dirname, 'charts/xx.jpg'))

module.exports = {
  getUtcDiff,
  percent,
  parseInvalid,
  downloadFile,
}
