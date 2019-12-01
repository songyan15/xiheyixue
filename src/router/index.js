import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve),
      meta: {
        title:"登录",
        showMenus:false
      }
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: resolve => require(['@/components/forgetPwd'], resolve),
      meta: {
        title:"找回密码",
        showMenus:false
      }
    },{
      path: '/updatePwd',
      name: 'updatePwd',
      component: resolve => require(['@/components/updatePwd'], resolve),
      meta: {
        title:"修改密码",
        showMenus:false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/register'], resolve),
      meta: {
        title:"注册",
        showMenus:false
      }
    },
    {
      path:'/',
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/index'], resolve),
      meta: {
        showMenus:true
      }
    },
    {
      path: '/index/course', /**/
      name: 'course',
      component: resolve => require(['@/components/course'], resolve),
      meta: {
        showMenus:true
      }
    },
    {
      path: '/index/questions',
      name: 'questions',
      component: resolve => require(['@/components/questions'], resolve),
      meta: {
        showMenus:true
      }
    },
    {
      path: '/index/shopping',
      name: 'shopping',
      component: resolve => require(['@/components/shopping'], resolve),
      meta: {
        showMenus:true
      }
    },
    {
      path: '/index/personal',
      name: 'personal',
      component: resolve => require(['@/components/personal'], resolve),
      meta: {
        showMenus:true
      }
    },
    {
      path: '/simulation',
      name:'simulation',
      component: resolve => require(['@/components/simulation'], resolve),
      meta: {
        title:"模拟考场",
        showMenus:false
      }
    },
    {
      path: '/chapter',
      name: 'chapter',
      component: resolve => require(['@/components/chapter'], resolve),
      meta: {
        title:"章节练习",
        showMenus:false
      }
    },
    {
      path: '/vedioMenu',
      name: 'vedioMenu',
      component: resolve => require(['@/components/vedioMenu'], resolve),
      meta: {
        title:"视频列表",
        showMenus:false
      }
    },
    {
      path: '/index/vocationType',
      name: 'vocationType',
      component: resolve => require(['@/components/vocationType'], resolve),
      meta: {
        title:"专业科目",
        showMenus:false
      }
    },
    {
      path: '/option',
      name: 'option',
      component: resolve => require(['@/components/option'], resolve),
      meta: {
        title:"题号",
        showMenus:false
      }
    },
    {
      path: '/subject',
      name: 'subject',
      component: resolve => require(['@/components/subject'], resolve),
      meta: {
        title:"考题",
        showMenus:false
      }
    },
    {
      path: '/errorPage',
      name: 'errorPage',
      component: resolve => require(['@/components/errorPage'], resolve),
      meta: {
        title:"错题",
        showMenus:false
      }
    },
    {
      path: '/freeSubject',
      name: 'freeSubject',
      component: resolve => require(['@/components/freeSubject'], resolve),
      meta: {
        title:"列表",
        showMenus:false
      }
    },
    {
      path: '/vedio',
      name: 'vedio',
      component: resolve => require(['@/components/vedio'], resolve),
      meta: {
        title:"视频",
        showMenus:false
      }
    },
    {
      path: '/resource',
      name: 'resource',
      component: resolve => require(['@/components/resource'], resolve),
      meta: {
        title:"资源库",
        showMenus:false
      }
    },
    {
      path: '/pivot',
      name: 'pivot',
      component: resolve => require(['@/components/pivot'], resolve),
      meta: {
        title:"押题",
        showMenus:false
      }
    },
    {
      path: '/word',
      name: 'word',
      component: resolve => require(['@/components/word'], resolve),
      meta: {
        title:"历年真题",
        showMenus:false
      }
    },{
      path: '/note',
      name: 'note',
      component: resolve => require(['@/components/note'], resolve),
      meta: {
        title:"笔记",
        showMenus:false
      }
    },{
          path: '/order',
          name: 'order',
          component: resolve => require(['@/components/order'], resolve),
          meta: {
              title:"充值",
              showMenus:false
          }
      },{
          path: '/paymentOk',
          name: 'paymentOk',
          component: resolve => require(['@/components/paymentOk'], resolve),
          meta: {
              title:"支付成功",
              showMenus:false
          }
      },{
          path: '/paymentEorr',
          name: 'paymentEorr',
          component: resolve => require(['@/components/paymentEorr'], resolve),
          meta: {
              title:"支付失败",
              showMenus:false
          }
      },{
          path: '/myOrder',
          name: 'myOrder',
          component: resolve => require(['@/components/myOrder'], resolve),
          meta: {
              title:"开通科目",
              showMenus:false
          }
      }
  ]
})


router.beforeEach((to, from, next) => {
  let Uid = localStorage.getItem('Uid')
  if (to.path === '/login'||to.path === '/register'||to.path === '/forgetPwd') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
      if(Uid) {
          next({ path: '/index' })
      } else {
          next()
      }
  } else {
      if (!Uid) {
          // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
          next({ path: '/login' })
      } else {
          next()
      }
  }
   let path = from.path //path为定义的变量，不是vue的data定义的变量，当前生命周期data还未初始化
    let query = JSON.stringify(from.query);
    localStorage.setItem("urlPath",path);
    localStorage.setItem("query",query)
    next()
})

export default router
