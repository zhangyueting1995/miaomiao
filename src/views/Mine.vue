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

</style>


