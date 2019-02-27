import Vue from 'vue'
import Index from './index.vue'
Vue.config.productionTip = false

export default {
    name: "vue",
    requires: [],
    load() {
        this.vue = new Vue({
            el: '#app',
            template: '<Index/>',
            components: { Index }
        });

        // let 1 render be done
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.vue.$children[0]);
            }, 0);
        });
    },
    unload() {},
};
