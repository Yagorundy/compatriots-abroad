import { mount } from '@vue/test-utils'
import GoogleMap from '@/components/GoogleMap.vue'

describe('GoogleMap', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(GoogleMap)
    expect(wrapper.vm).toBeTruthy()
  })
})
