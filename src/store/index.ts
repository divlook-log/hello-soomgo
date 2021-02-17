import Vue from 'vue'
import Vuex from 'vuex'
import { FormState } from '@/store/modules/form'

Vue.use(Vuex)

export interface RootState {
    form: FormState
}

export default new Vuex.Store<RootState>({})
