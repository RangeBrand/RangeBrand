export default {
    methods: {
        copyColorToClipboard(color) {
            this.copyToClipboard(`#${color.toUpperCase()}`);
        },
        copyToClipboard(content) {
            navigator.clipboard.writeText(content).then(() => {
                this.$toasted.show('کپی شد!');
            }, (err) => {
                console.error('Could not copy text: ', err);
            });
        },
    },
};
