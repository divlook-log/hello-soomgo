<template>
    <button class="ui-btn" :type="type" @click="onClick">
        <slot />
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Btn extends Vue {
    @Prop()
    readonly type!: 'button' | 'submit'

    onClick() {
        /**
         * Click
         *
         * @event click
         */
        this.$emit('click')
    }
}
</script>

<style lang="scss" scoped></style>
