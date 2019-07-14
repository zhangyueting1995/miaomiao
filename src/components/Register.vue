<template>
  <div class="register_body">
    <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="regList.username"></mt-field>
      <mt-field label="邮箱"  placeholder="请输入邮箱" type="email" v-model="regList.email"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="regList.password"></mt-field>
       <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="regList.pwd2" :state="pwdState" @blur.native.capture="pwdOn"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="regList.phone"></mt-field>
    </div>
    <div class="register_btn">
      <button @touchend.prevent="handleToRegister">注册</button>
    </div>
    <div class="register_link">
      <a href="/mine/login">立即登录</a>
      <a href="/mine/findpwd">找回密码</a>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Register',
    data(){
      return{
        regList:{
          username:'',
          email:'',
          password:'',
          pwd2:'',
          phone:''
        },
        pwdState:'',
      };
    },
    methods:{
      handleToRegister(){
        for(var key in this.regList){
          if(this.regList[key]==""){
           this.$toast("有信息未填写");
           return;
          }
        }
        this.$messagebox.alert("没做后台，不能注册！");
      },
      pwdOn(){
        console.log(1);
        if(this.regList.password==this.regList.pwd2){
          this.pwdState="success"
        }else{
          this.pwdState="error";
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
#content .register_body{  width:100%;}
.register_body .register_btn{ height:50px; margin:10px;}
.register_body .register_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>