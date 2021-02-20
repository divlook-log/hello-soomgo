<template>
    <div class="page-home">
        <h1>👋 Hello Soomgo</h1>

        <router-link to="/form">
            <Btn primary>
                사무실 대청소 신청하기
            </Btn>
        </router-link>

        <p v-if="lastAnswerData">
            <pre><code>{{ lastAnswerData }}</code></pre>
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useFormStore } from '@/store/modules/form'
import Btn from '@/components/forms/Btn.vue'

@Component({
    components: {
        Btn,
    },
})
export default class Home extends Vue {
    get formStore() {
        return useFormStore()
    }

    get lastAnswerData() {
        const lastAnswerData = this.formStore.lastAnswerData

        if (lastAnswerData) {
            try {
                return JSON.stringify(lastAnswerData, null, 4)
            } catch (error) {
                console.error(error)
                return ''
            }
        }

        return ''
    }
}
</script>

<style lang="scss" scoped>
.page-home {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
