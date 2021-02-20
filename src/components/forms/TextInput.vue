<template>
    <div
        class="ui-textInput"
        :class="{
            'ui-textInput--disabled': disabled,
            'ui-textInput--error': state.error,
            'ui-textInput--block': block,
        }"
    >
        <input
            type="text"
            :value="inputValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
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
        type: Boolean,
        default: false,
    })
    readonly block!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly required!: boolean

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

    get isValid() {
        if (this.required) {
            return !!this.inputValue
        }

        return true
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

        this.inputValue = nextValue

        if (this.isValid === this.state.error) {
            this.state.error = !this.isValid

            /**
             * @event update:error
             * @type { boolean }
             */
            this.$emit('update:error', this.state.error)
        }

        /**
         * @event input
         * @type { string }
         */
        this.$emit('input', nextValue)
    }

    onChange(e: Event) {
        if (this.disabled) {
            return
        }

        /**
         * @event change
         * @type { Event }
         */
        this.$emit('change', e)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';

.ui-textInput {
    display: inline-block;

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

    &.ui-textInput--error {
        input {
            border-color: $color-danger;

            &:focus {
                border-color: $color-danger;
                box-shadow: 0 0 0 0.2rem
                    rgba($color: $color-danger, $alpha: 0.25);
            }
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

    &.ui-textInput--block {
        display: block;
    }
}
</style>
