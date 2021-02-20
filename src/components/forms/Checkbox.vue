<template>
    <div
        class="ui-checkbox"
        :class="{
            'ui-checkbox--block': block,
            'ui-checkbox--disabled': disabled,
            'ui-checkbox--error': error,
            'ui-checkbox--checked': isChecked,
        }"
        @click="onClick"
    >
        <input
            ref="input"
            type="checkbox"
            :checked="formState.checked"
            :value="value"
            :name="name"
            :disabled="disabled"
            :required="required"
            :readonly="readonly"
            @click.stop
            @change="onChange"
        />

        <template v-if="label">
            <span class="checkbox-label">{{ label }}</span>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Checkbox extends Vue {
    @Ref('input')
    readonly inputRef!: HTMLInputElement

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
    readonly readonly!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly error!: boolean

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly checked!: boolean

    @Prop({
        type: String,
        default: '',
    })
    readonly label!: string

    @Prop({
        type: String,
    })
    readonly name!: string

    formState = {
        checked: false,
    }

    get isChecked() {
        return this.formState.checked
    }

    @Watch('checked')
    watchValue(checked: boolean) {
        if (this.formState.checked === checked) {
            return
        }

        this.formState.checked = checked
    }

    created() {
        if (this.checked) {
            this.formState.checked = this.checked
        }
    }

    onClick(event: Event) {
        if (!this.readonly) {
            this.inputRef.click()
        }

        this.$emit('click', event)
    }

    onChange() {
        this.formState.checked = !this.formState.checked
        this.$emit('update:checked', this.formState.checked)
        this.$emit('change', this.formState.checked)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variable.scss';

.ui-checkbox {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    background: $color-white;
    border: 1px solid $color-line;
    padding: 0.75rem;
    border-radius: 0.25rem;
    color: $color-text;
    line-height: 1.5;
    font-weight: 400;
    font-size: 1rem;

    input {
        margin: 0;
    }

    .checkbox-label {
        margin-left: 6px;
    }

    &:not(.ui-checkbox--disabled) {
        cursor: pointer;
    }

    &.ui-checkbox--block {
        display: flex;
    }

    &.ui-checkbox--checked {
        border-color: $color-primary;

        .checkbox-label {
            color: $color-primary;
        }
    }

    &.ui-checkbox--error {
        border-color: $color-danger;

        .checkbox-label {
            color: $color-danger;
        }
    }

    &.ui-checkbox--disabled {
        opacity: 0.4;
    }
}
</style>
