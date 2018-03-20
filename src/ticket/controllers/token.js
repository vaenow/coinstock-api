const response = require("../../utils/Response")
const TokenModel = require("../models/token")
const TokenExchangeRefModel = require("../models/tokenExchangeRef")
const code = require("../code")
const { boot } = require('./sinajs');


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

exports.tokenList = async (ctx) => {
  let keyword = ctx.request.query.keyword
  // 判断是否有keyword
  if (!keyword) {
    return response.error(ctx, code.TOKEN_LIST[0][0], code.TOKEN_LIST[0][1])
  }
  let tokens = await TokenModel.findByKeyword(keyword, (err, doc) => {
    if (err) {
      console.log(err)
    }
  })
  // 查询最新的一条数据
  let data = (await TokenExchangeRefModel.findOne({}).sort({ update: -1 })).data
  let res = []
  // 匹配币种的交易所
  for (let token of tokens) {
    for (let d of data) {
      if (d.tokenId.toString() === token._id.toString()) {
        for (let exchange of d.exchanges) {
          res.push({
            _id: token._id.toString(),
            name: token.name,
            icon: token.icon,
            token: token.token,
            exchange: exchange.name
          })
        }
      }
    }
  }
  return response.success(ctx, res)
}
