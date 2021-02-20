import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action,
} from 'vuex-module-decorators'
import store from '@/store'
import { AnswerData, RequestForm } from '@/interfaces/form'

export interface FormState {
    current: RequestForm | null
    lastAnswerData: AnswerData | null
}

@Module({
    name: 'form',
    store,
    dynamic: true,
    namespaced: true,
})
export class FormStore extends VuexModule implements FormState {
    current: RequestForm | null = null
    lastAnswerData: AnswerData | null = null

    @Mutation
    setRequestForm(data: RequestForm | null) {
        this.current = data
    }

    @Mutation
    setLastAnswerData(data: AnswerData | null) {
        this.lastAnswerData = data
    }

    @Action({ commit: 'setRequestForm' })
    async getRequestForm(): Promise<RequestForm | null> {
        if (this.current) {
            return this.current
        }

        try {
            return require('@/assets/dummy/input.json')
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export const useFormStore = () => getModule(FormStore)
