<template>
  <div id="content">
    <div class="login_body">
      <div>
        <input v-model="uname" class="login_text" type="text" placeHolder="账户名/手机号/Email" >
      </div>
      <div>
        <input v-model="upwd" class="login_text" type="password" placeHolder="请输入您的密码" >
      </div>
      <div class="login_btn">
        <button @touchend="handleToLogin">登录</button>
      </div>
      <div class="login_link">
        <a href="/mine/register">立即注册</a>
        <a href="/mine/findpwd">找回密码</a>
      </div>
    </div>
	</div>
</template>

<script>
  export default {
    name:'Login',
    data(){
      return{
        uname:'',
        upwd:''
      };
    },
    methods:{
      handleToLogin(){
        var uname = this.uname.trim();
        var upwd = this.upwd.trim();
        if(!uname || !upwd){
          this.$toast("账号/密码不能为空");
          return;
        }else{
          this.axios.get("/api2/login.json").then(res=>{
            if(res.statusText=="OK"){
              var {phone,pwd,email,name}=res.data;
              if((uname==name||email||phone) && (upwd==pwd)){
                //把账号密码保存到session;
                sessionStorage.setItem("uname",uname);
                sessionStorage.setItem("upwd",upwd);
                this.$messagebox.alert("登录成功").then(res=>{
                  this.$router.push('/mine/center');
                });
              }else{
                this.$toast("账号/密码错误");
              }
            }
          });
        }
      },
    },
    beforeRouteEnter(to,from,next){
      var uname=sessionStorage.getItem("uname");
      if(!uname){
        next();
      }else{
        next('/mine/center');
      }
    }
  }
</script>

<style lang="scss" scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn button{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>