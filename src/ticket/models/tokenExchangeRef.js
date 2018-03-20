const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  // 某一时刻某一种币在交易所里面的交易数据
  data : [ {
    tokenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TokenModel',
      required: true
    },
    // 币的名称
    name : {
      type : String,
      required : true
    },
    exchanges : [ {
      // 排名
      ranking : {
        type : Number,
      },
      // 交易所
      name : {
        type : String,
      },
      // 交易对
      symbol : {
        type : String,
      },
      // 价格
      price : {
        type : Number,
      },
      // 成交量
      amount : {
        type : Number,
      },
      // 成交额
      volume : {
        type : Number,
      },
      // 占比
      ratio : {
        type : Number,
      }
    } ]
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
module.exports = mongoose.model('token_exchange_ref', Schema)
