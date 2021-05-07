export default {
    methods: {
        copyToClipboard(color) {
            navigator.clipboard.writeText(`#${color.toUpperCase()}`).then(() => {
                this.$toasted.show('کپی شد!');
            }, (err) => {
                console.error('Could not copy text: ', err);
            });
        },
    },
};
