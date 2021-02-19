<template>
    <button
        class="ui-btn"
        :class="{
            'ui-btn--primary': primary,
        }"
        :type="type"
        :disabled="disabled"
        @click="onClick"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Btn extends Vue {
    @Prop({
        type: String,
        default: 'button',
    })
    readonly type!: 'button' | 'submit'

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly primary!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly disabled!: boolean

    onClick() {
        if (this.disabled) {
            return
        }

        /**
         * Click
         *
         * @event click
         */
        this.$emit('click')
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';

.ui-btn {
    display: inline-block;
    box-sizing: border-box;
    background: $color-white;
    color: $color-text;
    border: 1px solid $color-mercury;
    font-size: 1rem;
    font-weight: 500;
    height: 3rem;
    border-radius: 0.25rem;
    min-width: 7.5rem;

    &.ui-btn--primary {
        background-color: $color-caribbean-green;
        color: $color-white;
        border: 0;
    }

    &:not(:disabled) {
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.4;
    }

    &:focus {
        outline: 0;
    }
}
</style>
