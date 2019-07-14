<template>
  <div class="container">
    <div><img src="@/assets/rd.png" alt=""></div>
    <p class="txt"><span>{{sec}}</span>秒后返回上一页</p>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
  export default {
    name:'Develop',
    data(){
      return{
        sec:3,
        timer:null
      };
    },
   activated(){
     this.sec=3;
     this.timer=setInterval(()=>{
       this.sec--;
       //console.log(1);
       if(this.sec<=0){
         clearInterval(this.timer);
         this.$router.back();
       }
     },1000);
    },
  }
</script>

<style lang="scss" scoped>
.container{
  width:200px;
  position: absolute;;
  top:50%;left:50%;
  margin-top:-100px;
  margin-left:-100px;
  .txt{
    color:#000;
    margin:0.5rem 0 0 1.5rem;
    font:bolder 1rem "Microsoft YaHei";
  }
}
</style>