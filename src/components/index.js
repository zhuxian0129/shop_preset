import spPagination from './sp-pagination';

const component = {
  install: (Vue) => {
    Vue.component('spPagination', spPagination)
  }
}

export default {
  install(Vue) {
    Vue.use(component)
  }
}
