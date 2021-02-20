import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'
import { Controls } from '@/libs/storybook'
import TextInput from '@/components/forms/TextInput.vue'

export default ((): Meta => ({
    title: 'Components/TextInput',
    component: TextInput,
    argTypes: {
        value: {
            control: Controls.text(),
        },
        placeholder: {
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
        maxlength: {
            control: Controls.number({
                min: 1,
                max: 255,
            }),
            defaultValue: 255,
        },
        error: {
            control: Controls.boolean(),
        },
    },
}))()

const Template: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { TextInput },
    template: `
        <TextInput
            :value="value"
            :placeholder="placeholder"
            :disabled="disabled"
            :block="block"
            :required="required"
            :maxlength="maxlength"
            :error="error"
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
    value: '',
}

export const Placeholder = Template.bind({})
Placeholder.args = {
    value: '',
    placeholder: '입력해주세요.',
}

export const Disabled = Template.bind({})
Disabled.args = {
    value: '',
    placeholder: '입력할 수 없습니다.',
    disabled: true,
}

export const Block = Template.bind({})
Block.args = {
    value: '',
    block: true,
}

export const Maxlength = Template.bind({})
Maxlength.args = {
    value: '',
    placeholder: '10글자까지 입력할 수 있습니다.',
    block: true,
    maxlength: 10,
}

export const Error = Template.bind({})
Error.args = {
    value: '',
    error: true,
}

export const Required = Template.bind({})
Required.args = {
    value: '',
    placeholder: '입력값이 없으면 에러가 발생합니다.',
    block: true,
    required: true,
}
