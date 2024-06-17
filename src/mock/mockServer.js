import Mock from 'mockjs'
import goodsList from './goodsList.json'
var data = Mock.mock('/mock/getGoodsList','get',{
    data:goodsList
  })