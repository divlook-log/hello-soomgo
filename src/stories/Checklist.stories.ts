import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'
import { Controls } from '@/libs/storybook'
import Checklist from '@/components/forms/Checklist.vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import Radio from '@/components/forms/Radio.vue'

export default ((): Meta => ({
    title: 'Components/Checklist',
    component: Checklist,
    argTypes: {
        value: {
            control: false,
            defaultValue: '',
        },
        name: {
            control: false,
        },
        type: {
            control: false,
        },
        error: {
            control: Controls.boolean(),
        },
    },
}))()

export const CheckboxList: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        Checklist,
        Checkbox,
    },
    template: `
        <Checklist
            :value="value"
            name="name"
            type="checkbox"
            :error="error"
            v-slot="{ inputName, setValue, hasValue }"
            @input="onInput"
        >
            <Checkbox
                value="a"
                label="A"
                block
                :name="inputName"
                :checked="hasValue('a')"
                readonly
                @click="setValue('a')"
            />
            <Checkbox
                value="b"
                label="B"
                block
                :name="inputName"
                :checked="hasValue('b')"
                readonly
                @click="setValue('b')"
            />
            <Checkbox
                value="c"
                label="C"
                block
                :name="inputName"
                :checked="hasValue('c')"
                readonly
                @click="setValue('c')"
            />
        </Checklist>
    `,
    methods: {
        onInput: action('onInput'),
    },
})

export const RadioList: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        Checklist,
        Radio,
    },
    template: `
        <Checklist
            :value="value"
            name="name"
            type="radio"
            :error="error"
            v-slot="{ inputName, setValue, hasValue }"
            @input="onInput"
        >
            <Radio
                value="a"
                label="A"
                block
                :name="inputName"
                :checked="hasValue('a')"
                readonly
                @click="setValue('a')"
            />
            <Radio
                value="b"
                label="B"
                block
                :name="inputName"
                :checked="hasValue('b')"
                readonly
                @click="setValue('b')"
            />
            <Radio
                value="c"
                label="C"
                block
                :name="inputName"
                :checked="hasValue('c')"
                readonly
                @click="setValue('c')"
            />
        </Checklist>
    `,
    methods: {
        onInput: action('onInput'),
    },
})
