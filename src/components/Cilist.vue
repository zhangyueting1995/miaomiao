<template>
  <div class="cinema_body">
    <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul>
        <li v-for="(item,i) of ciList" :key="i">
          <div>
            <span>{{item.nm}}</span>
            <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <div v-for="(num,j) in item.tag" :key="j" :class="j|formatClass">{{j|formatCard}}</div>
        </div>
        </li>
      </ul>
    </mt-loadmore>
	</div>
</template>

<script>
  export default {
    name:'Cilist',
    data(){
      return{
        ciList:[],
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
      this.axios.get("/api/cinemaList?cityId="+cityId).then((result)=>{
        if(result.data.msg==="ok"){
          this.ciList=result.data.data.cinemas;
          this.$indicator.close();
          this.prevCityId=cityId;
        }
      });
    },
    methods:{
      loadTop(){
            // 加载更多数据
        this.$refs.loadmore.onTopLoaded();  
      },
    },
    filters:{
      formatCard(key){
            var card = [
                { key : 'allowRefund' , value : '改签' },
                { key : 'endorse' , value : '退' },
                { key : 'sell' , value : '折扣卡' },
                { key : 'snack' , value : '小吃'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        },
        formatClass(key){
          var card = [
                { key : 'allowRefund' , value : 'bl' },
                { key : 'endorse' , value : 'bl' },
                { key : 'sell' , value : 'or' },
                { key : 'snack' , value : 'or'}
            ];
          for(var item of card){
            if(item.key===key){
              return item.value
            }   
          }
           return "hide"
        }
    }
  }
</script>

<style lang="scss" scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.hide{
  display:none;
}
</style>