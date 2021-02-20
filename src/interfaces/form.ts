export enum FormType {
    Checkbox = 1,
    Radio = 2,
    TextInput = 3,
    Selectbox = 4,
}

export interface ItemOption {
    id: number
    text: string
}

export interface FormItem {
    itemId: number
    title: string
    formType: number
    options: ItemOption[]
}

export interface RequestForm {
    formId: number
    title: string
    items: FormItem[]
}

export interface AnswerItem {
    /**
     * itemId
     */
    id: number
    answer: string
}

export interface AnswerData {
    /**
     * formId
     */
    id: number
    items: AnswerItem[]
}
