import { Input, Button,Checkbox } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Checkbox)
  }
}
export default element