import Vue from 'vue'
Vue.directive('focusclass', {
  inserted: (el, binding) => {
    const childInput = el.getElementsByTagName('input')
    const childTextarea = el.getElementsByTagName('textarea')
    for (let i = 0; i < childInput.length; i++) {
      childInput[i].onfocus = () => {
        el.classList.add(binding.value)
      }
      childInput[i].onblur = () => {
        el.classList.remove(binding.value)
      }
    }
    for (let i = 0; i < childTextarea.length; i++) {
      childTextarea[i].onfocus = () => {
        el.classList.add(binding.value)
      }
      childInput[i].onblur = () => {
        el.classList.remove(binding.value)
      }
    }
    el.onfocus = () => {
      el.classList.add(binding.value)
    }
    el.onblur = () => {
      el.classList.remove(binding.value)
    }
  },
})
