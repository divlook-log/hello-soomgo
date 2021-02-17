import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/vue'
import { Controls } from '@/libs/storybook'
import Btn from '@/components/forms/Btn.vue'

export default ((): Meta => ({
    title: 'Components/Button',
    component: Btn,
    argTypes: {
        text: {
            control: Controls.text(),
        },
        type: {
            control: Controls.select(['button', 'submit']),
        },
    },
}))()

const Template: Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Btn },
    template: `
        <Btn
            :type="type"
            @click="onClick"
        >
            {{ text }}
        </Btn>
    `,
    methods: {
        onClick: action('onClick'),
    },
})

export const WithText = Template.bind({})
WithText.args = {
    text: 'Hello Button',
    type: 'button',
}
