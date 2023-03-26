<template>
  <div>
    <div class="cartcontrol">
     <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count"  @click="updates(false)"></div>
     </transition>
      <div class="cart-count" v-if="food.count">{{food.count}}</div>
      <div class="iconfont icon-add_circle" @click="updates(true)"></div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
    props:['food'],
    methods:{
  
        // add(){
        //     // this.food.count=1;
        //     if(!this.food.count){
        //          Vue.set(this.food, 'count', 1 )
        //     }else{
        //         this.food.count++
        //     }
           
        // },
   
        // updates(){
        //     if(this.food.count){
        //         this.food.count--
        //     }
        // }

        updates(isadd){
            this.$store.dispatch('updateFoodCount',{isadd,food:this.food})
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all 2s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>