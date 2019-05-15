import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gifs: [],
    userGif: {},
    defaultLimit: 18,
    limit: 18,
    offset: 0,
    isSearch: false,
    query: '',
    loading: false,
    notFound: {
      status: false
    },
  },
  mutations: {
    LOAD_GIFS: (state, gifs) => {
      state.gifs = gifs
    },
    USER: (state, user) => {
      state.userGif = user
    },
    SET_SEARCH_STATUS:(state, status)=>{
      state.isSearch = status
    },
    SET_QUERY:(state, query)=>{
      state.query = query
    },
    NOT_FOUND: (state, data) => {
      state.notFound.data = data.data
      state.notFound.status = data.status
    }
  },
  actions: {
    LOAD_GIFS({commit, state}) {
      commit('SET_SEARCH_STATUS', false)
      commit('SET_QUERY', '')
      commit('NOT_FOUND', {
        data: {},
        status: false
      })
      axios.get(`/v1/gifs/trending`, {
        params: {
          api_key: config.apiKey,
          limit: state.limit
        }
      })
        .then(response => {
          let data;
          data = response.data.data;
          commit('LOAD_GIFS', data);
        })
    },
    LOAD_GIF({commit, state}, id) {
      return new Promise((resolve, reject) => {
        axios.get(`/v1/gifs/${id}`, {
          params: {
            api_key: config.apiKey,
          }
        })
          .then(response => {
            commit('USER', response.data.data.user)
            resolve(response.data.data)
          }).catch(err => {
          reject(err)
        })
      })
    },
    SEARCH_GIFS({commit, state, dispatch}, payload) {
      let q = payload.query || state.query
      commit('NOT_FOUND', {
        data: {},
        status: false
      })
      if(q){
        commit('SET_QUERY', q)
        commit('SET_SEARCH_STATUS', true);
        state.loading = true
        axios.get('v1/gifs/search', {
          params: {
            api_key: config.apiKey,
            q: q,
            limit: state.limit,
            offset: payload.scroll? state.offset+state.defaultLimit: state.offset,
            rating: 'G',
            lang: 'en'
          }
        }).then(result=>{
          let data;
          data = result.data.data;
          if(payload.scroll){
            console.log(payload.scroll)
            let gif = state.gifs.concat(data)
            commit('LOAD_GIFS', gif);
            state.offset = state.offset + state.defaultLimit
          }else {
            commit('LOAD_GIFS', data);
          }

          if (!data.length) {
            dispatch('NOT_FOUND')
          }

          state.loading = false
        })
      }
      else if(!payload.scroll) {
        dispatch('LOAD_GIFS') ;
      }

    },
    NOT_FOUND ({commit}) {
      axios.get(`/v1/gifs/random`, {
        params: {
          api_key: config.apiKey,
          tag: 'not found',
          rating: 'G'
        }
      })
        .then(res => {
          let data = {}
          data.data = res.data.data
          data.status = true
          commit('NOT_FOUND', data)
        })
    }
  },
  getters: {
    gifs: state => state.gifs,
    loading: state => state.loading,
    isSearch: state => state.isSearch
  }
})
