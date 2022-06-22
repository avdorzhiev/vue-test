import Vue from 'vue';

Vue.filter('emptyValue', (value: string) => {
    if (!value) return '---';
    return value;
});
