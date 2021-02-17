interface NumberOption {
    min?: number
    max?: number
    step?: number
}

/**
 * Controls
 *
 * @see https://storybook.js.org/docs/vue/essentials/controls#annotation
 */
export class Controls {
    /**
     * serialize array into a comma-separated string inside a textbox
     */
    static array(separator = ',') {
        return {
            type: 'array',
            separator,
        }
    }

    /**
     * checkbox input
     */
    static boolean() {
        return {
            type: 'boolean',
        }
    }

    /**
     * a numeric text box input
     */
    static number({ min, max, step }: NumberOption = {}) {
        return {
            type: 'number',
            min,
            max,
            step,
        }
    }

    /**
     * a range slider input
     */
    static range({ min, max, step }: NumberOption = {}) {
        return {
            type: 'range',
            min,
            max,
            step,
        }
    }

    /**
     * json editor text input
     */
    static object() {
        return {
            type: 'object',
        }
    }

    /**
     * radio buttons input
     */
    static radio(options: string[]) {
        return {
            type: 'radio',
            options,
        }
    }

    /**
     * inline radio buttons input
     */
    static inlineRadio(options: string[]) {
        return {
            type: 'inline-radio',
            options,
        }
    }

    /**
     * multi-select checkbox input
     */
    static check(options: string[]) {
        return {
            type: 'check',
            options,
        }
    }

    /**
     * multi-select inline checkbox input
     */
    static inlineCheck(options: string[]) {
        return {
            type: 'inline-check',
            options,
        }
    }

    /**
     * select dropdown input
     */
    static select(options: string[]) {
        return {
            type: 'select',
            options,
        }
    }

    /**
     * multi-select dropdown input
     */
    static multiSelect(options: string[]) {
        return {
            type: 'multi-select',
            options,
        }
    }

    /**
     * simple text input
     */
    static text() {
        return {
            type: 'text',
        }
    }

    /**
     * color picker input that assumes strings are color values
     */
    static color() {
        return {
            type: 'color',
        }
    }

    /**
     * date picker input
     */
    static date() {
        return {
            type: 'date',
        }
    }
}
