<template>
    <select
        class="ui-selectbox"
        :class="{
            'ui-selectbox--selected': isSelected,
            'ui-selectbox--disabled': disabled,
            'ui-selectbox--block': block,
            'ui-selectbox--error': state.error,
        }"
        :value="selectValue"
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
    readonly required!: boolean

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
    readonly error!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly optional!: boolean

    selectValue = ''

    state = {
        error: false,
    }

    get isSelected() {
        return !!this.selectValue
    }

    get isValid() {
        if (this.required) {
            return this.isSelected
        }

        return true
    }

    @Watch('value')
    watchValue(value: string) {
        if (this.selectValue === value) {
            return
        }

        this.selectValue = value
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
            this.selectValue = this.value
        }

        if (this.error) {
            this.state.error = this.error
        }
    }

    onChange(e: Event) {
        if (this.disabled) {
            return
        }

        const target = e?.target as HTMLSelectElement
        const nextValue = target?.value ?? ''

        if (nextValue === this.selectValue) {
            return
        }

        this.selectValue = nextValue

        if (this.isValid === this.state.error) {
            this.state.error = !this.isValid

            this.$emit('update:error', this.state.error)
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
