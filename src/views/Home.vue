<template>
    <div class="page-home">
        <h1>👋 Hello Soomgo</h1>

        <router-link to="/form">
            <Btn primary>
                사무실 대청소 신청하기
            </Btn>
        </router-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Btn from '@/components/forms/Btn.vue'

@Component({
    components: {
        Btn,
    },
})
export default class Home extends Vue {}
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
