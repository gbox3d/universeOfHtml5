document.addEventListener('DOMContentLoaded',()=> {
    const Counter = {
    data() {
        return {
            counter: 0
        }
    },
    async mounted() {
        while (this.counter < 100) {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 1000);
            })
            this.counter++;
        }

    }

}
Vue.createApp(Counter).mount('#counter')

})