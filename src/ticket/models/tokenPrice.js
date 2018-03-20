const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  // 某一时刻币种的全网价格
  data : [ {
    // 币种id关联
    coinId : {
      type : String
    },
    // 排名
    ranking : {
      type : Number
    },
    // 代币简称
    token : {
      type : String
    },
    // 币的中文名
    nameCn : String,
    // 流通市值
    marketCap : {
      // 人民币，单位亿
      type : Number
    },
    // 人民币价格
    price : {
      type : Number,
    },
    // 数量
    quantity : {
      // 单位万
      type : Number
    },
    // 24小时成交额(元)
    volume24h : {
      // 单位万
      type : Number
    },
    // 24小时涨跌   eg: 10.5
    change24h : {
      type : Number
    }
  } ],
  // 创建时间
  createdAt : {
    type : Number,
    default : Date.now
  },
  // 修改时间
  updatedAt : {
    type : Number,
    default : Date.now
  },
  // 删除时间，删除时间默认为0，如果>0则表示已经删除
  deletedAt : {
    type : Number,
    default : 0
  },
  status : {
    type : Number,
    // -1 删除，0 无效， 1有效
    default : 1,
    enum : [ -1, 0, 1 ]
  }
})
module.exports = mongoose.model('token_price', Schema)
