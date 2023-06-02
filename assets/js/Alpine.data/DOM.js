export default () => {
    return {
        theme: {
            dark: false,
            name: 'retro',
        },

        getThemeName() {
            if (localStorage.getItem('theme')) {
                this.theme.name = localStorage.getItem('theme');
                this.theme.dark = this.theme.name === 'vampire';
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme.name = 'dracula';
                this.theme.dark = true;
            }

            return this.theme.dark ? 'dracula' : 'retro';
        },

        toggleTheme() {
            this.theme.dark = !this.theme.dark;
            this.theme.name = this.theme.dark ? 'dracula' : 'retro';
            localStorage.setItem('theme', this.theme.name);
            document.documentElement.setAttribute("data-theme", this.theme.name);
        },

        init() {
            console.log('AlpineJS DOM init');
            document.documentElement.setAttribute("data-theme", this.getThemeName());
        },
    };
}
