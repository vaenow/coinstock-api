const response = require("../../utils/Response")
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
