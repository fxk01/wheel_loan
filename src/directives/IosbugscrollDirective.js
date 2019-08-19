import Vue from 'vue'
// iosbugscroll
Vue.directive('iosbugscroll', {
  inserted: function(el) {
    var ua = navigator.userAgent.toLowerCase()
    if (/micromessenger/.test(ua)) {
      if (/iphone|ipad|ipod/.test(ua)) {
        // input、textarea被组件包装的场景
        const childInput = el.getElementsByTagName('input')
        const childTextarea = el.getElementsByTagName('textarea')
        for (let i = 0; i < childInput.length; i++) {
          childInput[i].onblur = function temporaryRepair() {
            setTimeout(function() {
              checkWxScroll()
            }, 200)
          }
        }

        for (let i = 0; i < childTextarea.length; i++) {
          childTextarea[i].onblur = function temporaryRepair() {
            setTimeout(function() {
              checkWxScroll()
            }, 200)
          }
        }
        // input、textarea中的场景
        el.onblur = function temporaryRepair() {
          setTimeout(function() {
            checkWxScroll()
          }, 200)
        }
      }
    }
  },
})

function checkWxScroll() {
  var currentPosition, timer
  var speed = 1
  timer = setInterval(function() {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop
    currentPosition -= speed
    window.scrollTo(0, currentPosition)
    currentPosition += speed
    window.scrollTo(0, currentPosition)
    clearInterval(timer)
  }, 1)
}
