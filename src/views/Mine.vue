<template>
  <div>
    <my-header title="我的喵喵"></my-header>
    <div id="content"></div>
    <Login></Login>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import MyHeader from '@/components/MyHeader'
import TabBar from '@/components/TabBar'
import Login from '@/components/Login'
export default {
  name:'Mine',
  components:{MyHeader,TabBar,Login}
}
</script>
<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>


