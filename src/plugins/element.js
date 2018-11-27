import Vue from 'vue'
import {
  Button,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Input,
  InputNumber,
  Switch,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Switch)

Vue.prototype.$message = Message
