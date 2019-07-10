import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/movie',
      name:'Movie',
			component:()=>import('@/views/Movie'),
			children:[
				{
					path:'comingsoon',
					component:()=>import('@/components/ComingSoon')
				},
				{
					path:'nowplaying',
					component:()=>import('@/components/NowPlaying')
				},
				{
					path:'search',
					component:()=>import('@/components/Search'),
				},
				{
					path:'city',
					component:()=>import('@/components/City')
				},
				{
					path:'detail/1/:movieId',
					components:{
						default:()=>import('@/components/NowPlaying'),
						detail:()=>import('@/components/Detail')
					},
					props:{detail:true}
				},
				{
					path:'detail/2/:movieId',
					components:{
						default:()=>import('@/components/ComingSoon'),
						detail:()=>import('@/components/Detail')
					},
					props:{detail:true}
				},
				{
					path:'/movie',
					redirect:'/movie/nowplaying'
				}
			]
    },
    {
      path:'/mine',
      name:'Mine',
      component:()=>import('@/views/Mine')
    },
    {
      path:'/cinema',
      name:'Cinema',
			component:()=>import('@/views/Cinema')
		},
		//路由重定向到/movie
    {
			path:'/*',
			redirect:'/movie'
    }
  ]
})
