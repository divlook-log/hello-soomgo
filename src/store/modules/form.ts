import { VuexModule, Module, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface FormState {}

@Module({
    store,
    name: 'form',
})
class FormStore extends VuexModule implements FormState {}

export const useFormStore = () => getModule(FormStore)
