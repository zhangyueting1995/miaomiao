<template>
	<div class="city_body">
			<div class="city_list">
				<div class="city_hot">
					<h2>热门城市</h2>
					<ul class="clearfix">
						<v-touch tag="li" v-for="(elem,i) of hotList" :key="i" @tap="handleToCity(elem.nm,elem.id)">{{elem.nm}}</v-touch>
					</ul>
				</div>
				<div class="city_sort" ref="city_sort">
					<div v-for="(elem,i) of cityList" :key="i">
						<h2>{{elem.index}}</h2>
						<ul>
							<v-touch tag="li" v-for="(cit,j) of elem.list" :key="j" @tap="handleToCity(cit.nm,cit.id)">{{cit.nm}}</v-touch>
						</ul>
					</div>
				</div>
			</div>
				<div class="city_index">
					<ul>
						<li v-for="(elem,i) of cityList" :key="i" @touchstart="handleToIndex(i)">{{elem.index}}</li>
					</ul>
				</div>
	</div>
</template>
<script>
  export default {
		name:'City',
		data(){
			return{
				cityList:[],
				hotList:[]
			}
		},
		mounted(){
			
			let cityList=window.localStorage.getItem('cityList');
			let hotList=window.localStorage.getItem('hotList');
			if(cityList&&hotList){
				this.cityList=JSON.parse(cityList);
				this.hotList=JSON.parse(hotList);
			}else{
					this.$indicator.open({
							text: '加载中...',
							spinnerType: 'fading-circle'
					});
					this.axios('/api/cityList').then(result=>{
					var msg=result.data.msg;
					if(msg==="ok"){
						var cities=result.data.data.cities;
						//[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
						var {cityList,hotList}=this.formatCityList(cities);
						this.cityList=cityList;
						this.hotList=hotList;
						window.localStorage.setItem('cityList',JSON.stringify(cityList));
						window.localStorage.setItem('hotList',JSON.stringify(hotList));
						this.$indicator.close();
					}
				});
			}
			
		},
		methods:{
			formatCityList(cities){
				var cityList=[];
				var hotList=[];

				for(var i=0;i<cities.length;i++){
					if(cities[i].isHot===1){
						hotList.push(cities[i]);
					}
				}
				for(var i=0;i<cities.length;i++){
					var firstLetter=cities[i].py.substring(0,1).toUpperCase();
					if(toCom(firstLetter)){//新添加索引
						cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});
					}else{//累加到已有index中
						for(var j=0;j<cityList.length;j++){
							if(cityList[j].index===firstLetter){
								cityList[j].list.push({nm:cities[i].nm,id:cities[i].id});
							}
						}
					}
				}
				cityList.sort((n1,n2)=>{
					if(n1.index>n2.index){
						return 1
					}else if(n1.index<n2.index){
						return -1
					}else{
						return 0
					}
				});
				function toCom(firstLetter){
					for(var i=0;i<cityList.length;i++){
						if(cityList[i].index===firstLetter){
							return false;
						}
					}
					return true;
				}
				return{cityList,hotList};
			},
			handleToIndex(i){
				var h2=this.$refs.city_sort.getElementsByTagName('h2');
				this.$refs.city_sort.parentNode.scrollTop=h2[i].offsetTop;
			},
			handleToCity(nm,id){
				localStorage.setItem('nowNM',nm);
				localStorage.setItem('nowID',id);
				this.$store.commit('city/CITY_INFO',{nm,id});
				this.$router.push('/movie/nowplaying');
			},
		}
  }
</script>

<style lang="scss" scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>