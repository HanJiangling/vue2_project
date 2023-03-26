//封装一些方法 调用后端接口
//导入调用后端接口的方法 ajax
import ajax from './ajax'
// let url="http://localhost:8000/admin/shoplists"
const URLS = "/api"
//封装获取商家列表的方法
export let getShoplists = () => ajax(`${URLS}/admin/shoplists`, 'GET')
//封装下会员注册的方法
export let doregister = (name, pass) => ajax(`${URLS}/admin/registeruser`, { name, pass }, 'GET')
//封装下会员登录的方法
export let dologin = (name, pass) => ajax(`${URLS}/admin/loginuser`, { name, pass }, 'POST')
//封装获取用户登录或者注册的cookie信息方法
export let getcookieuser = () => ajax(`${URLS}/admin/userinfos`, 'GET')
//封装退出用户的方法
export let userlogout = () => ajax(`${URLS}/admin/vuelogout`, 'GET')
//封装获取单个商家信息的方法
export let shopone = (id) => ajax(`${URLS}/admin/shoplistone`, { id }, 'GET')
//封装获取单个商家下得所有食品信息的方法
export let getshopgoods = (id) => ajax(`${URLS}/admin/vueshopgoods`, { id }, 'GET')
//封装获取单个商家下得所有评价信息的方法
export let getcomments = (id) => ajax(`${URLS}/admin/vuecomments`, { id }, 'GET')
//封装下添加收货地址的方法
export let insertaddress = (name, phone, address, username) => ajax(`${URLS}/admin/addaddress`, { name, phone, address, username }, 'POST')
//封装获取当前会员的所有的收货地址
export let getalladdress = (username) => ajax(`${URLS}/admin/usersaddress`, { username }, 'GET')
//封装生成订单的方法
export let insertorder = (order_num, address_id, food_totalprice, username) => ajax(`${URLS}/admin/addorder`, { order_num, address_id, food_totalprice, username }, 'POST')
//封装生成订单详情的方法
export let insertordergoods = (foodname, pic, count, orders_id) => ajax(`${URLS}/admin/addordergoods`, { foodname, pic, count, orders_id }, 'POST')
//封装获取当前登录会员的订单信息
export let getuserorder = (username) => ajax(`${URLS}/admin/userorders`, { username }, 'GET')
//封装获取当前订单下的订单详情数据
export let getorderinfo = (orders_id) => ajax(`${URLS}/admin/orderinfos`, { orders_id }, 'GET')
//封装获取会员详情数据的方法
export let getusermessage = (name) => ajax(`${URLS}/admin/usermessage`, { name }, 'GET')
//封装插入会员详情信息的方法
export let insertusermessage = (username, phone, email, userinfo_name) => ajax(`${URLS}/admin/insertuserinfo`, { username, phone, email, userinfo_name }, 'POST')
//封装修改会员详情信息的方法
export let updateusermessage = (username, phone, email, userinfo_name) => ajax(`${URLS}/admin/updateuserinfo`, { username, phone, email, userinfo_name }, 'POST')
//封装修改会员头像的方法
export let updateuserpic = (headerpic, userinfo_name) => ajax(`${URLS}/admin/updateuserpic`, { headerpic, userinfo_name }, 'POST')
//封装搜索商家数据的方法
export let getsearchshop = (keyword) => ajax(`${URLS}/admin/searchshop`, { keyword }, 'POST')
//封装关键字搜索食品数据的方法
export let getsearchfood = (keyword) => ajax(`${URLS}/admin/searchfood`, { keyword }, 'POST')
//封装获取当前登录会员的评价信息
export let getusercomment = (username) => ajax(`${URLS}/admin/usercomments`, { username }, 'GET')
//封装获取商家的评价信息
export let getshopcomment = (name, shop_id) => ajax(`${URLS}/admin/shopcomments`, { name, shop_id }, 'POST')
//封装插入评价信息的方法
export let insertusercomment = (username, content, shoplist, time, pic) => ajax(`${URLS}/admin/insertusercomments`, { username, content, shoplist, time, pic }, 'POST')
//封装修改评价信息的方法
export let updateusercomment = (content, username) => ajax(`${URLS}/admin/updateusercomments`, { content, username }, 'POST')
//封装删除评价信息
export let delusercomment = (name, shop_id) => ajax(`${URLS}/admin/delusercomments`, { name, shop_id }, 'GET')
//封装搜索食品数据的方法
export let getsearchfoods = (foodname) => ajax(`${URLS}/admin/searchfoods`, { foodname }, 'POST')
//封装获取用户照片的方法
export let getuserpic = (username) => ajax(`${URLS}/admin/userpic`, { username }, 'POST')
