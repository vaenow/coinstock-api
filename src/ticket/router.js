const router = require('koa-router')()
const token = require('./controllers/token')
router.prefix('/v1')
/**
 * 代币搜索列表接口
 */
router.get('/ticket/search',token.search)

// router.get('/ticket',token.tokenList)

module.exports = router

