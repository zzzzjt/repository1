import { Select, Option, OptionGroup, Input, Button, Dialog, Row, Col } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Button)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Col)
  }
}
export default element