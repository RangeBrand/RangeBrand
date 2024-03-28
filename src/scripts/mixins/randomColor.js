export default {
    methods: {
        async getRandomColor() {
            const { data: results } = await this.$fetch('/colors');
            return results.colors.edges[Math.floor(Math.random() * results.colors.edges.length)]?.node?.colors || ['000000', 'ffffff'];
        },
    },
};
