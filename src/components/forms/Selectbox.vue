<template>
    <select
        class="ui-selectbox"
        :class="{
            'ui-selectbox--selected': isSelected,
            'ui-selectbox--disabled': disabled,
            'ui-selectbox--block': block,
            'ui-selectbox--error': formState.error,
        }"
        :value="formState.value"
        :required="required"
        :disabled="disabled"
        @change="onChange"
    >
        <template v-if="placeholder">
            <option :disabled="!optional" selected value="">
                {{ placeholder }}
            </option>
        </template>

        <template v-for="(row, key) in option">
            <option :key="key" :value="row">{{ row }}</option>
        </template>
    </select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Selectbox extends Vue {
    @Prop({
        type: String,
        default: '',
    })
    readonly value!: string

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
        type: Boolean,
        default: false,
    })
    readonly error!: boolean

    @Prop({
        type: String,
        default: '선택해주세요.',
    })
    readonly placeholder!: string

    @Prop({
        type: Array,
        default: () => [],
    })
    readonly option!: string[]

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly optional!: boolean

    formState = {
        value: '',
        error: false,
    }

    get isSelected() {
        return !!this.formState.value
    }

    get isValid() {
        if (this.required) {
            return this.isSelected
        }

        return true
    }

    @Watch('value')
    watchValue(value: string) {
        if (this.formState.value === value) {
            return
        }

        this.formState.value = value
    }

    @Watch('error')
    watchError(error: boolean) {
        if (this.formState.error === error) {
            return
        }

        this.formState.error = error
    }

    created() {
        if (this.value) {
            this.formState.value = this.value
        }

        if (this.error) {
            this.formState.error = this.error
        }
    }

    onChange(e: Event) {
        if (this.disabled) {
            return
        }

        const target = e?.target as HTMLSelectElement
        const nextValue = target?.value ?? ''

        if (nextValue === this.formState.value) {
            return
        }

        this.formState.value = nextValue

        if (this.isValid === this.formState.error) {
            this.formState.error = !this.isValid

            this.$emit('update:error', this.formState.error)
        }

        this.$emit('input', nextValue)
        this.$emit('change', e)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';

$bg-image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAxOGgxOFYwSDB6Ii8+PHBhdGggc3Ryb2tlPSIjRTFFMUUxIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE0LjQzNCA2Ljc1MWwtNS40IDUuNC01LjQtNS40Ii8+PC9nPjwvc3ZnPg==';
$padding: 0.75rem;

.ui-selectbox {
    display: inline-block;
    border-radius: 0.25rem;
    border: 1px solid $color-line;
    padding: $padding;
    padding-right: $padding * 2 + 1rem;
    font-size: 1rem;
    appearance: none;
    color: $color-nobel;
    outline: 0;
    background-color: $color-white;
    background-image: url($bg-image);
    background-repeat: no-repeat;
    background-position-x: 98%;
    background-position-x: calc(100% - #{$padding});
    background-position-y: 50%;
    background-size: 1rem;

    option {
        &:disabled {
            opacity: 0.4;
        }
    }

    &:focus {
        outline: 0;
        border-color: $color-primary;
        box-shadow: 0 0 0 0.2rem rgba($color: $color-primary, $alpha: 0.25);
    }

    &:not(.ui-selectbox--disabled) {
        cursor: pointer;
    }

    &.ui-selectbox--selected {
        color: $color-text;
    }

    &.ui-selectbox--disabled {
        opacity: 0.4;
    }

    &.ui-selectbox--error {
        border-color: $color-danger;

        &:focus {
            border-color: $color-danger;
            box-shadow: 0 0 0 0.2rem rgba($color: $color-danger, $alpha: 0.25);
        }
    }

    &.ui-selectbox--block {
        display: block;
        width: 100%;
    }
}
</style>
