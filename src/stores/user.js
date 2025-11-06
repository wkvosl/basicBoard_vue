import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    nickname: localStorage.getItem('nickname') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },

  actions: {
    login(token, nickname) {
      this.accessToken = token
      this.nickname = nickname
      localStorage.setItem('accessToken', token)
      localStorage.setItem('nickname', nickname)
    },

    logout() {
      this.accessToken = null
      this.nickname = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('nickname')
    },
  },
})
