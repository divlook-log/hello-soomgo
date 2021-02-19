<template>
    <div
        class="ui-textInput"
        :class="{
            'ui-textInput--disabled': disabled,
            'ui-textInput--error': state.error,
        }"
    >
        <input
            type="text"
            v-model="inputValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :maxlength="maxlength"
            @input="onInput"
            @change="onChange"
        />
        <p class="textInput-info">
            <span class="point">{{ inputValueLength }}</span>
            <span> / {{ maxlength }}자</span>
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class TextInput extends Vue {
    @Prop({
        type: String,
        default: '',
    })
    readonly value!: string

    @Prop({
        type: String,
    })
    readonly placeholder!: string

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly disabled!: boolean

    @Prop({
        type: Number,
        default: 255,
    })
    readonly maxlength!: number

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly error!: boolean

    inputValue = ''

    state = {
        error: false,
    }

    get inputValueLength() {
        return this.inputValue.length
    }

    @Watch('value')
    watchValue(value: string) {
        if (this.inputValue === value) {
            return
        }

        this.inputValue = value
    }

    @Watch('error')
    watchError(error: boolean) {
        if (this.state.error === error) {
            return
        }

        this.state.error = error
    }

    created() {
        if (this.value) {
            this.inputValue = this.value
        }

        if (this.error) {
            this.state.error = this.error
        }
    }

    onInput(e: Event) {
        if (this.disabled) {
            return
        }

        const target = e?.target as HTMLInputElement
        const nextValue = target?.value ?? ''
        const nextError = !nextValue

        if (nextError !== this.state.error) {
            this.state.error = nextError

            /**
             * @event error
             */
            this.$emit('update:error', nextError)
        }

        /**
         * @event input
         */
        this.$emit('input', nextValue)
    }

    onChange(e: Event) {
        if (this.disabled) {
            return
        }

        /**
         * @event change
         */
        this.$emit('change', e)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';

.ui-textInput {
    input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        background: $color-white;
        border: 1px solid $color-line;
        padding: 0.75rem;
        border-radius: 0.25rem;
        color: $color-text;
        line-height: 1.5;
        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            font-size: 1em;
            color: $color-nobel;
        }

        &:focus {
            outline: 0;
            border-color: $color-primary;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba($color: $color-primary, $alpha: 0.25);
        }
    }

    .textInput-info {
        text-align: right;
        color: $color-nobel;
        font-size: 0.875rem;
        padding-top: 0.25rem;
        margin: 0;

        .point {
            color: $color-caribbean-green;
        }
    }

    &.ui-textInput--error:not(.ui-textInput--disabled) {
        input {
            border-color: $color-danger;
        }

        .textInput-info {
            .point {
                color: $color-danger;
            }
        }
    }

    &.ui-textInput--disabled {
        opacity: 0.4;
    }
}
</style>
