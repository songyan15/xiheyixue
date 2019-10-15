import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate' //首先引入
Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward',
  typeName:"检验士中级",
  courseCode:'111',
  subjectType:[],
  subTitle:"",
  subjectIndexList:''
}
export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    UPDATE_TYPENAME(state,name){
      state.typeName = name
    },
    setCourseCode (state,code){
      state.courseCode = code
    },
    setSubjectType (state,subjectType){
      state.subjectType = subjectType
    },
    setSubjectIndexList (state,subjectIndexList){
      state.subjectIndexList = subjectIndexList
    },
    updSubTitle(state,subTitle){
      state.subTitle = subTitle
    }
  },
  plugins: [persistedState ()] //解决vuex刷新数据丢失
})
