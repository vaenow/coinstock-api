const response = require("../../utils/Response")
const code = require("../code")
const { boot } = require('./sinajs');

// https://ex.sina.com.cn/quotes_service/api/jsonp_v2.php/var%20_sh601222_60_1523981261325=/CN_MarketData.getKLineData?symbol=sh601222&scale=60&ma=no&datalen=1023
// this._objectType = {
//   "11": "A 股","12": "B 股","13": "权证","14": "期货","15": "债券",
//   "21": "开基","22": "ETF","23": "LOF","24": "货基","25": "QDII","26": "封基",
//   "31": "港股","32": "窝轮","33":"港指数",
//   "41": "美股","42": "外期",
//   '81':'债券','82':'债券',"111":"A股"
// };
exports.search = async (ctx) => {
  console.log('ctx.request.query')
  let keyword = ctx.request.query.keyword;
  // 判断是否有keyword
  if (!keyword) {
    return response.error(ctx, code.TOKEN_LIST[0][0], code.TOKEN_LIST[0][1])
  }
  const ret = await boot({ query: keyword });

  console.log('ret', ret)
  return response.success(ctx, ret)
};
