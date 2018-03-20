/**
 * @file 保存币种的基本信息
 * @author wangle(wangle@nibirutech.com)
 */
const mongoose = require('mongoose')
// 保存最原始的数据
const Schema = new mongoose.Schema({
  // 排名
  ranking : {
    type : Number,
    required : true
  },
  // 币的英文名 eg: Bitcoin
  name : {
    type : String,
    required : true
  },
  // 币的中文名
  nameCn : {
    type : String
  },
  // 代币简称
  token : {
    type : String,
    required : true
  },
  // 图标url **存本地服务器的相对路径**
  icon : {
    type : String,
    required : true
  },
  // 官网
  website : {
    type : Array,
  },
  // 简要描述-综合信息
  description : {
    type : String,
    required : true
  },
  // 流通量
  supplyCirculating : {
    type : String,
    required : true
  },
  // 总发行量
  supplyTotal : {
    type : Number,
    required : true
  },
  // 代币平台 eg: New Blockchain
  tokenPlatform : {
    type : String,
  },
  // 公共组合
  publicPortfolio : {
    type : String,
  },
  // ICO分配 T：团队/合作伙伴/贡献者，B:赏金，C：基金会，O:其他
  tokenReserveSplit : {
    type : String,
  },
  // 投资者占比: 众筹目标的百分比，不是货币总量的百分比
  tokenRatioForInvestors : {
    type : Number,
  },
  // ICO总量
  totalTokensSupply : {
    type : Number,
  },
  // 热门次数
  hotNumber : {
    type : Number,
    default : 0
  },
  // 众筹起始时间
  startAt : {
    type : Number,
  },
  // 众筹结束时间
  endAt : {
    type : Number,
  },
  // 代币发行模式 eg: Increases
  tokenSupplyPostSale : {
    type : String,
  },
  // ico成本
  icoPrice : {
    type : Number,
  },
  // 筹资目标
  fundingTarget : {
    type : String,
  },
  // 资金上限 eg: unlimited
  fundingCap : {
    type : String,
  },
  // 众筹均价
  icoAvgPrice : Number,
  // 众筹方式 eg: BTC/ETH
  paymentMethod : {
    type : String,
  },
  // 白皮书网址
  whitePaper : {
    type : String,
  },
  // 博客
  blog : {
    type : String,
  },
  // 众筹网址
  saleWebsite : {
    type : String,
  },
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
// 根据币的中英文简称关键字搜索币
Schema.statics.findByKeyword = async function (keyword, cb) {
  // 不区分大小写
  const reg = new RegExp(keyword, 'i')
  return await this.find({
    $or : [
      {
        name : {
          $regex : reg
        }
      },
      {
        nameCn : {
          $regex : reg
        }
      },
      {
        token : {
          $regex : reg
        }
      }
    ]
  }, cb)
}
module.exports = mongoose.model('token', Schema)
