// const url = 'http://192.168.102.92:8080'; //测试
const url = 'http://www.shandianke.cn/api'; //生产

export default {
  register: `POST ${url}/register`,
  login: `POST ${url}/login`,
  sendSms: `POST ${url}/sendSms`,
  getUserInfo: `POST ${url}/getUserInfo`,
  ordList: `POST ${url}/order/ordList`,
  ordListCount: `POST ${url}/order/ordListCount`,
  orderDetailed: `POST ${url}/order/orderDetailed`,
  colseInquiry: `POST ${url}/order/colseInquiry`,
  ocrfile: `POST ${url}/upload/ocrfile`,
  submitOrder: `POST ${url}/order/submitOrder`,
  carCity: `POST ${url}/car/city`,
  carList: `POST ${url}/che/car/list`,
  inquiry: `POST ${url}/order/inquiry`,
  notifyList: `POST ${url}/notify/list`,
  assessAmount: `POST ${url}/order/assessAmount`,
}