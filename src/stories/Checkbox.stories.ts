import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'
import { Controls } from '@/libs/storybook'
import Checkbox from '@/components/forms/Checkbox.vue'

export default ((): Meta => ({
    title: 'Components/Checkbox',
    component: Checkbox,
    argTypes: {
        value: {
            control: Controls.text(),
        },
        disabled: {
            control: Controls.boolean(),
        },
        block: {
            control: Controls.boolean(),
        },
        required: {
            control: Controls.boolean(),
        },
        readonly: {
            control: Controls.boolean(),
        },
        error: {
            control: Controls.boolean(),
        },
        label: {
            control: Controls.text(),
        },
        name: {
            control: Controls.text(),
        },
        checked: {
            control: Controls.boolean(),
        },
    },
}))()

const Template: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Checkbox },
    template: `
        <Checkbox
            :value="value"
            :disabled="disabled"
            :block="block"
            :required="required"
            :readonly="readonly"
            :error="error"
            :label="label"
            :name="name"
            :checked="checked"
            @input="onInput"
            @change="onChange"
            @click="onClick"
            @update:checked="onUpdateChecked"
        />
    `,
    methods: {
        onInput: action('onInput'),
        onChange: action('onChange'),
        onClick: action('onClick'),
        onUpdateChecked: action('onUpdateChecked'),
    },
})

export const Default = Template.bind({})
Default.args = {}

export const WithLabel = Template.bind({})
WithLabel.args = {
    label: '텍스트',
}

export const WithValue = Template.bind({})
WithValue.args = {
    label: '사과',
    value: 'apple',
}

export const Checked = Template.bind({})
Checked.args = {
    label: '텍스트',
    checked: true,
}

export const Error = Template.bind({})
Error.args = {
    label: '텍스트',
    error: true,
}

export const Block = Template.bind({})
Block.args = {
    label: '텍스트',
    block: true,
}
