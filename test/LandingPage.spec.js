import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('IndexPage', () => {
    describe('Layout', () => {
        test('It has a header', () => {
            const wrapper = mount(IndexPage)
            const header = wrapper.find('h2')
            expect(header.exists()).toBeTruthy()
        })
        test('Check header content', () => {
            const wrapper = mount(IndexPage)
            const header = wrapper.find('h2')
            const content = "Introduce tu CUPS para descubrir si cumples con los requisitos para sumarte a la revolución de los tejados";
            expect(header.text()).toEqual(content)
        })
        test('It has an input', () => {
            const wrapper = mount(IndexPage)
            const input = wrapper.find('input')
            expect(input.exists()).toBeTruthy()
        })
        test('Check input placeholder', () => {
            const wrapper = mount(IndexPage)
            const input = wrapper.find('input')
            expect(input.attributes('placeholder')).toBe('Introduce el CUPS')
        })
        test('It has a button', () => {
            const wrapper = mount(IndexPage)
            const button = wrapper.find('button')
            expect(button.exists()).toBeTruthy()
        })
        test('Button is disabled by default', () => {
            const wrapper = mount(IndexPage)
            const button = wrapper.find('button')
            expect(button.element.disabled).toBeTruthy()
        })
    })

    describe('Interactions', () => {
        test('Button enabled when user types 6 characters (CUPS length)', async () => {
            const wrapper = mount(IndexPage)
            const input = wrapper.find('input')
            input.setValue('123456')
            await input.trigger('input')
            const button = wrapper.find('button')
            expect(button.element.disabled).toBeFalsy()
        })
    })
})