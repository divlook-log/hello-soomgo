<template>
    <div
        class="ui-checklist"
        :class="{
            'ui-checklist--error': error,
        }"
    >
        <div class="checklist-container">
            <!--
                @slot v-slot="{ inputName, setValue, hasValue }"
                @binding inputName
                @binding setValue
                @binding hasValue
            -->
            <slot :inputName="name" :setValue="setValue" :hasValue="hasValue" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Checklist extends Vue {
    @Prop({
        type: Array,
        default: () => [],
    })
    readonly value!: string[]

    @Prop({
        type: String,
        required: true,
    })
    readonly name!: string

    /**
     * 'checkbox' | 'radio'
     */
    @Prop({
        type: String,
        default: 'checkbox',
    })
    readonly type!: 'checkbox' | 'radio'

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly error!: boolean

    get hasValue() {
        return (value: string) => this.selectedValues.indexOf(value) !== -1
    }

    selectedValues: string[] = []

    setValue(value: string) {
        const index = this.selectedValues.indexOf(value)

        switch (this.type) {
            case 'radio': {
                this.selectedValues.splice(0, this.selectedValues.length)
                this.selectedValues.push(value)
                break
            }

            default: {
                if (index === -1) {
                    this.selectedValues.push(value)
                } else {
                    this.selectedValues.splice(index, 1)
                }
                break
            }
        }

        this.$emit('input', this.selectedValues)
    }
}
</script>

<style lang="scss">
@import '@/assets/style/variable.scss';

.ui-checklist {
    .checklist-container {
        border: 1px solid $color-line;
        border-radius: 0.25rem;

        .ui-checkbox,
        .ui-radio {
            border: none;
            border-radius: 0;
            border-bottom: 1px solid $color-line;

            &.ui-checkbox--checked,
            &.ui-radio--checked {
                border-color: $color-line;
            }
        }

        .ui-checkbox:first-child,
        .ui-radio:first-child {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }

        .ui-checkbox:last-child,
        .ui-radio:last-child {
            border: none;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
        }
    }

    &.ui-checklist--error {
        .checklist-container {
            border-color: $color-danger;

            .ui-checkbox,
            .ui-radio {
                border-color: $color-danger;

                span {
                    color: $color-danger;
                }
            }
        }
    }
}
</style>
