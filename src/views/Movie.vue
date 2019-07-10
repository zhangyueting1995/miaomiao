<template>
  <div id="main">
    <my-header title="喵喵电影"></my-header>
    <div id="content">
      <div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
			  </router-link>
				<div class="hot_swtich">
					<router-link tag="div" to="/movie/nowplaying" class="hot_item active">正在热映</router-link>
					<router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <tab-bar></tab-bar>
    <transition name="fade">
       <router-view name="detail" />
    </transition>
  </div>
</template>
<script>
import MyHeader from '@/components/MyHeader'
import TabBar from '@/components/TabBar'
import { setTimeout } from 'timers';
export default {
  name:'Movie',
  components:{MyHeader,TabBar},
  mounted(){
    this.axios.get("/api/getLocation").then(res=>{
      if(res.data.msg==="ok"){
        var nm=res.data.data.nm;
        var id=res.data.data.id;
       if(nm===this.$store.state.city.nm){return;}
        setTimeout(()=>{
          this.$messagebox.confirm("是否切换到您所在的城市?",`当前城市:${nm}`)
          .then(actions=>{
            window.localStorage.setItem('nowNM',nm);
            window.localStorage.setItem('nowID',id);
            window.location.reload();
          }).catch(err=>{})
        },2000)
      }
    });
  }
}
</script>
<style scoped>
.fade-enter-active{
  transition:all .8s;
}
.fade-leave-active{
  transform:translate(-100%);
  transition:all .8s;
}
.fade-enter{transform:translate(-100%);}
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>


