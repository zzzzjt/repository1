import { Input, Button, Checkbox, Row, Col, Divider, Select, Option, Table, TableColumn, Link, Pagination } from 'element-ui';
const element = {
  install: function(Vue) {
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(Checkbox);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Link);
    Vue.use(Pagination);
  }
};
export default element;
