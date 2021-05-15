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
        state.favoriteColors = [...new Set(colors)];
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
    removeFavoriteColor({ state, commit }, value) {
        commit('setFavoriteColors', state.favoriteColors.filter(color => color !== value));
    },
    addFavoriteColor({ commit }, value) {
        commit('setFavoriteColors', [
            ...state.favoriteColors,
            value,
        ]);
        commit('setSidebar', true);
    },
    toggleFavoriteColor({ state, dispatch }, value) {
        if (state.favoriteColors.indexOf(value) === -1) {
            dispatch('addFavoriteColor', value);
        } else {
            dispatch('removeFavoriteColor', value);
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
