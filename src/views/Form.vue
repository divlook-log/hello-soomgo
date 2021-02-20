<template>
    <div class="page-form" v-if="hasForm">
        <h1>{{ form.title }}</h1>

        <template v-if="item">
            <h2>{{ item.title }}</h2>

            <div class="form-area">
                <template v-if="formType === FormType.Checkbox">
                    <Checklist
                        v-model="currentValue"
                        name="checkbox"
                        type="checkbox"
                        :error="error"
                        v-slot="{ inputName, hasValue, setValue }"
                        @input="error = false"
                    >
                        <template v-for="(row, key) in options">
                            <Checkbox
                                :key="key"
                                :name="inputName"
                                :label="row.text"
                                block
                                readonly
                                :checked="hasValue(row.text)"
                                @click="setValue(row.text)"
                            />
                        </template>
                    </Checklist>
                </template>

                <template v-else-if="formType === FormType.Radio">
                    <Checklist
                        v-model="currentValue"
                        name="radio"
                        type="radio"
                        :error="error"
                        v-slot="{ inputName, hasValue, setValue }"
                        @input="error = false"
                    >
                        <template v-for="(row, key) in options">
                            <Radio
                                :key="key"
                                :name="inputName"
                                :label="row.text"
                                block
                                readonly
                                :checked="hasValue(row.text)"
                                @click="setValue(row.text)"
                            />
                        </template>
                    </Checklist>
                </template>

                <template v-else-if="formType === FormType.TextInput">
                    <TextInput
                        v-model="currentValue"
                        :error.sync="error"
                        block
                        required
                        placeholder="직접 입력해주세요."
                    />
                </template>

                <template v-else-if="formType === FormType.Selectbox">
                    <Selectbox
                        v-model="currentValue"
                        :error.sync="error"
                        block
                        required
                        placeholder="선택해주세요."
                        :option="options.map((row) => row.text)"
                    />
                </template>
            </div>

            <p class="form-btns">
                <Btn :disabled="!prevItem" @click="goPrevItem">이전</Btn>

                <Btn primary @click="goNextItem">
                    {{ nextItem ? '다음' : '제출' }}
                </Btn>
            </p>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useFormStore } from '@/store/modules/form'
import { FormType } from '@/interfaces/form'
import { AnswerData, AnswerItem } from '@/interfaces/form'
import Btn from '@/components/forms/Btn.vue'
import Checklist from '@/components/forms/Checklist.vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import Radio from '@/components/forms/Radio.vue'
import TextInput from '@/components/forms/TextInput.vue'
import Selectbox from '@/components/forms/Selectbox.vue'

@Component({
    components: {
        Btn,
        Checklist,
        Checkbox,
        Radio,
        TextInput,
        Selectbox,
    },
})
export default class Form extends Vue {
    currentItemIndex = 0
    currentValue = ''
    answerData: AnswerItem[] = []
    error = false

    get FormType() {
        return FormType
    }

    get formStore() {
        return useFormStore()
    }

    get form() {
        return this.formStore.current
    }

    get hasForm() {
        return this.formStore.current !== null
    }

    get item() {
        return this.form?.items?.[this.currentItemIndex] ?? null
    }

    get prevItem() {
        return this.form?.items?.[this.currentItemIndex - 1] ?? null
    }

    get nextItem() {
        return this.form?.items?.[this.currentItemIndex + 1] ?? null
    }

    get formType() {
        return this.item?.formType ?? -1
    }

    get options() {
        return this.item?.options ?? []
    }

    async created() {
        await this.formStore.getRequestForm()

        this.formStore.setLastAnswerData(null)

        if (!this.hasForm) {
            alert('데이터가 없습니다.')
            this.$router.back()
        }
    }

    goPrevItem() {
        if (!this.prevItem) {
            return
        }

        this.error = false
        this.saveCurrentAnswer()
        this.loadAnswerValue(this.prevItem.itemId)
        this.currentItemIndex--
    }

    goNextItem() {
        this.saveCurrentAnswer()

        if (!this.currentValue) {
            this.error = true
            alert('값을 입력해주세요!')
            return
        }

        if (this.nextItem) {
            this.loadAnswerValue(this.nextItem.itemId)
            this.currentItemIndex++
            return
        }

        this.printAnswerData()
    }

    saveCurrentAnswer() {
        if (!this.item) {
            return
        }

        const answerItem = this.answerData.find((row) => {
            return row.id === this.item?.itemId
        })

        if (answerItem) {
            answerItem.answer = this.currentValue
        } else {
            this.answerData.push({
                id: this.item.itemId,
                answer: this.currentValue,
            })
        }
    }

    loadAnswerValue(itemId: number) {
        const answerItem = this.answerData.find((row) => {
            return row.id === itemId
        })

        if (answerItem) {
            this.currentValue = answerItem.answer
        } else {
            this.currentValue = ''
        }
    }

    printAnswerData() {
        if (!this.form) {
            return
        }

        const output: AnswerData = {
            id: this.form.formId,
            items: this.answerData,
        }

        this.formStore.setLastAnswerData(output)

        alert(JSON.stringify(output, null, 4))

        this.$router.push('/')
    }
}
</script>

<style lang="scss" scoped>
.page-form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .form-area {
        min-width: 300px;
        margin: 20px 0;
    }

    .form-btns {
        .ui-btn {
            margin-right: 20px;

            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>
