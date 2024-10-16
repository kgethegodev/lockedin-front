import {defineStore} from "pinia";
import api from "../../services/api.js";

export const useAuthStore = defineStore('auth',  {
    state: () => ({
        _user: null,
        _token: null,
    }),
    getters: {
        user: (state) => state._user,
    },
    actions: {
        async register (data){
            await api.post('users',data).then((res)=> {
                this._token = res.token;
                this._user = res.user;
                return res
            }).catch(err => {
                return Promise.reject(err);
            })
        },

        async login (data){},

        async logout (){
            await api.post('auth/logout').then((res)=> {
                this.token = null;
                this._user = null;
            }).catch(err => {
                return Promise.reject(err);
            })
        }
    },
    persist: {
        storage: localStorage
	},
})