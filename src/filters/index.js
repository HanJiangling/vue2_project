//导入vue
import Vue from 'vue'
Vue.filter('datetotime',function(value,format="YYYY-MM-DD HH:mm:ss"){
    //过滤数据
    //返回过滤完毕的数据
    //moment js库=》过滤数据
      return moment(value).format(format)
  })