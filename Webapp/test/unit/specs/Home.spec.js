import Vue from 'vue'
import Home from '@/components/Landingpage/Landingpage'

describe('Landingpage.vue', () => {
  // const Constructor = Vue.extend(Landingpage)
  // const wrapper = mount(Constructor)
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    // const vm = wrapper.vm
    expect(vm.$el)
    expect(vm.$el.querySelector('#app div .pizza').textContent).toEqual('hai')
    // expect(wrapper.html().toContain('<div class="pizza">hai</div>'))
  })
})
