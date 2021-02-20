import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'
import { Controls } from '@/libs/storybook'
import Selectbox from '@/components/forms/Selectbox.vue'

export default ((): Meta => ({
    title: 'Components/Selectbox',
    component: Selectbox,
    argTypes: {
        value: {
            control: false,
        },
        placeholder: {
            control: Controls.text(),
        },
        option: {
            control: Controls.array(),
        },
        required: {
            control: Controls.boolean(),
        },
        disabled: {
            control: Controls.boolean(),
        },
        error: {
            control: Controls.boolean(),
        },
        optional: {
            control: Controls.boolean(),
        },
    },
}))()

const Template: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Selectbox },
    template: `
        <Selectbox
            :value="value"
            :placeholder="placeholder"
            :option="option"
            :required="required"
            :disabled="disabled"
            :error="error"
            :optional="optional"
            @input="onInput"
            @change="onChange"
            @update:error="onError"
        />
    `,
    methods: {
        onInput: action('onInput'),
        onChange: action('onChange'),
        onError: action('onError'),
    },
})

export const Default = Template.bind({})
Default.args = {
    option: ['A', 'B', 'C', 'D'],
}

export const Placeholder = Template.bind({})
Placeholder.args = {
    placeholder: 'A ~ D',
    option: ['A', 'B', 'C', 'D'],
}

export const Optional = Template.bind({})
Optional.args = {
    option: ['A', 'B', 'C', 'D'],
    optional: true,
}

export const Required = Template.bind({})
Required.args = {
    option: ['A', 'B', 'C', 'D'],
    optional: true,
    required: true,
}

export const Error = Template.bind({})
Error.args = {
    option: ['A', 'B', 'C', 'D'],
    error: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
    option: ['A', 'B', 'C', 'D'],
    disabled: true,
}
