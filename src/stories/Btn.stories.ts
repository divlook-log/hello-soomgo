import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'
import { Controls } from '@/libs/storybook'
import Btn from '@/components/forms/Btn.vue'

export default ((): Meta => ({
    title: 'Components/Btn',
    component: Btn,
    argTypes: {
        text: {
            control: Controls.text(),
        },
        type: {
            control: Controls.select(['button', 'submit']),
        },
        primary: {
            control: Controls.boolean(),
        },
        disabled: {
            control: Controls.boolean(),
        },
    },
}))()

const Template: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Btn },
    template: `
        <Btn
            :type="type"
            :primary="primary"
            :disabled="disabled"
            @click="onClick"
        >
            {{ text }}
        </Btn>
    `,
    methods: {
        onClick: action('onClick'),
    },
})

export const Default = Template.bind({})
Default.args = {
    text: 'Hello Button',
    type: 'button',
}

export const Primary = Template.bind({})
Primary.args = {
    text: 'Hello Button',
    type: 'button',
    primary: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
    text: 'Hello Button',
    type: 'button',
    disabled: true,
}

export const PrimaryWithDisabled = Template.bind({})
PrimaryWithDisabled.args = {
    text: 'Hello Button',
    type: 'button',
    primary: true,
    disabled: true,
}
