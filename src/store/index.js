import debounce from 'lodash.debounce';
import mapValues from 'lodash.mapvalues';

const state = {
    device: {},
    favoriteColors: [],
    sidebarIsOpen: false,
};

const mutations = {
    setDevice (state, device) {
        state.device = device;
    },
    setFavoriteColors (state, colors) {
        state.favoriteColors = colors;
    },
    setSidebar(state, isOpen) {
        state.sidebarIsOpen = isOpen;
    },
};

const actions = {
    checkDevice({ commit }) {
        if (window) {
            const device = {};
            const deviceWidths = {
                isSmallMobile: [0, 575],
                isMobile: [0, 767],
                isTablet: [768, 991],
                isDesktop: [992, Infinity],
                isLargeDesktop: [1200, Infinity],
            };
            const checkDevice = debounce(() => {
                const windowWidth = window.innerWidth;
                Object.assign(device, mapValues(deviceWidths, (value, key) => {
                    return windowWidth >= value[0] && windowWidth <= value[1];
                }));
                commit('setDevice', device);
            }, 300);
            window.addEventListener('resize', checkDevice);
            checkDevice();
        }
    },
    toggleFavoriteColor({ state, commit }, value) {
        if (state.favoriteColors.indexOf(value) === -1) {
            commit('setFavoriteColors', [
                ...state.favoriteColors,
                value,
            ]);
        } else {
            commit('setFavoriteColors', state.favoriteColors.filter(color => color !== value));
        }
    },
    toggleSidebar({ state, commit }) {
        commit('setSidebar', !state.sidebarIsOpen);
    },
    openSidebar({ commit }) {
        commit('setSidebar', true);
    },
    closeSidebar({ commit }) {
        commit('setSidebar', false);
    },
};

export default {
    state,
    mutations,
    actions,
};
