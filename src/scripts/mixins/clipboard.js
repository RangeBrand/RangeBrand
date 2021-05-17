export default {
    methods: {
        copyUrlToClipboard() {
            try {
                this.copyToClipboard(window.location.href);
            } catch {
                this.$toasted.show('یه مشکلی پیش اومد!');
            }
        },
        copyColorToClipboard(color) {
            this.copyToClipboard(`#${color.toUpperCase()}`);
        },
        copyToClipboard(content) {
            navigator.clipboard.writeText(content).then(() => {
                this.$toasted.show('کپی شد!');
            }, (err) => {
                console.error('Could not copy text: ', err);
                this.$toasted.show('یه مشکلی پیش اومد!');
            });
        },
    },
};
