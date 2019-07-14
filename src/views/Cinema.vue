<template>
  <div>
    <my-header title="猪猪影院"></my-header>
    <div id="content">
      <div class="cinema_menu">
				<router-link tag="div" to="/develop" class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<router-link tag="div" to="/develop" class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<router-link tag="div" to="/develop" class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</router-link>
			</div>
      <Cilist></Cilist>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import MyHeader from '@/components/MyHeader'
import TabBar from '@/components/TabBar'
import Cilist from '@/components/Cilist'
export default {
  name:'Cinema',
  components:{MyHeader,TabBar,Cilist}
}
</script>
<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>


