import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // input validator
        inputValidator: {
            dataRight : 'right input',
            dataWrong : 'wrong input'
        }
    },
    mutations: {

    },
    actions: {

    }
})