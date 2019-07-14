<template>
  <div class="center_body">
    <p><strong>个人中心</strong><strong class="loginout" @touchend.prevent="handleToLoginout">退出</strong></p>
    <ul class="list_one">
      <li>
        <span>我的订单</span>
        <a href="/develop"><img src="@/assets/right.png" alt=""></a>
      </li>
      <li>
        <span>优惠券</span>
        <a href="/develop"><img src="@/assets/right.png" alt=""></a>
      </li>
      <li>
        <span>影院会员卡</span>
        <a href="/develop"><img src="@/assets/right.png" alt=""></a>
      </li>
    </ul>
     <ul class="list_two">
      <li>
        <span>看过的电影</span>
        <a href="/develop"><img src="@/assets/right.png" alt=""></a>
      </li>
      <li>
        <span>我的订单</span>
        <a href="/develop"><img src="@/assets/right.png" alt=""></a>
      </li>
      <li>
        <span>我的订单</span>
        <a href="/develop"><img src="@/assets/right.png" alt=""></a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'Center',
    methods:{
      handleToLoginout(){
        console.log(1)
        this.$messagebox.confirm("您确定要退出吗？").then(res=>{
          sessionStorage.removeItem("uname");
          sessionStorage.removeItem("upwd");
          this.$router.push('/mine/login');
        }).catch(res=>{})
      }
    },
     beforeRouteEnter(to,from,next){
      var uname=sessionStorage.getItem("uname");
      if(!uname){
        next('/mine/login');
      }else{
        next();
      }
    }
  }
 
</script>

<style lang="scss" scoped>
.center_body{
  margin-top:-40px;
  >p{
    font-size:1.25rem;
    color:#e54847;
    padding:1rem;
    .loginout{
      float:right
    }
  }
  .list_one,.list_two{
   /*background-color:rgb(245, 245, 245);*/
   font-size:1rem;
   border-top:1px solid #ccc; 
   border-bottom:1px solid #ccc; 
   li{
     height:2rem;
     display:flex;
     padding:0 1rem;
     justify-content: space-between;
     align-items: center;
     +li{
       border-top:1px solid #ccc;
       }
      &:active{
        background-color:#e54847;
        color:white;
      } 
   }
  }
  .list_two{
    margin-top:1rem;
  }
}
img{
  width:1.5rem;
}
</style>