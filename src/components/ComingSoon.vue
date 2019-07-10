<template>
<div class="movie_body">
  <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
    <ul>
      <li v-for="(item,i) of comingList" :key="i">
        <v-touch tag="div" @tap="handleToDetail(item.id)"  class="pic_show"><img :src="item.img|setWH('128.180')"></v-touch>
        <div class="info_list">
          <v-touch tag="h2" @tap="handleToDetail(item.id)">{{item.nm}}  <img v-if="item.version=='v3d imax'" src="@/assets/3d_max.png"></v-touch>
          <p><span class="person">{{item.wish}}</span> 人想看</p>
          <p>主演: {{item.star}}</p>
          <p>{{item.rt}} 上映</p>
        </div>
        <div class="btn_pre">
          预售
        </div>
      </li>
    </ul>
  </mt-loadmore>
</div>
</template>

<script>
  export default {
    name:'ComingSoon',
    data(){
      return{
        comingList:[],
        allLoaded:false,
        prevCityId:-1
      };
    },
    activated(){
      var cityId=this.$store.state.city.id;
			if(this.prevCityId==cityId){return;}
      this.$indicator.open({
 					text: '加载中...',
  				spinnerType: 'fading-circle'
			});
      this.axios.get('/api/movieComingList?cityId='+cityId).then(result=>{
        if(result.data.msg==='ok'){
          this.comingList=result.data.data.comingList;
          this.$indicator.close();
          this.prevCityId=cityId;
        }
        //console.log(this.comingList);
      })
    },
    methods:{
       loadTop(){
      // 加载更多数据
        this.$refs.loadmore.onTopLoaded();  
      },
      handleToDetail(movieId){
				this.$router.push("/movie/detail/2/"+movieId);
			},
    }
  }
</script>

<style lang="scss" scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>