const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  // 某一时刻的数据
  data : [ {
    tokenId : {
      type: String,
      required: true
    },
    // 市值
    marketCap : Number,
    // ico状态 eg: 进行中/已完成/… ** 1 ,2,4,8 **
    status : String,
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
module.exports = mongoose.model('token_status', Schema)
