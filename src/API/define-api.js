var APILink = "http://localhost:55244/api/"

 var API = {
  signup: APILink + "user/signup",
  signin: APILink + "user/login",
  checklogin: APILink + "user/checklogin",
  detailitem: APILink + "item/detail/",
  commentItem: APILink + "item/comment",
  listitem: APILink + "item/",
  category: APILink + "item",
  comment: APILink + "item/comment",
  getOrder: APILink + "order/",
  order: APILink + "order",
  discount: APILink + "order/discount/",
  checkout: APILink + "order/checkout",
  allorder: APILink + "order/allorder/",
  cancelorder: APILink + "order/cancel",
  hotitem: APILink + "item/hotitem",
  newitem: APILink + "item/newitem",
}

export default API