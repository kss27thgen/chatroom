import { db } from "~/plugins/firebase";

export const state = () => ({
    currentChannel: {},
    livelyChannel: null
});

export const getters = {
    currentChannel: state => state.currentChannel,
    livelyChannel: state => state.livelyChannel,
};

export const actions = {
    setCurrentChannel({ commit }, channel) {
        commit('SET_CURRENT_CHANNEL', channel)
    },
    livelyChannel({ commit }, channel) {
        commit('LIVELY_CHANNEL', channel)
    }

};

export const mutations = {
    SET_CURRENT_CHANNEL(state, channel) {
        state.currentChannel = channel
    },
    LIVELY_CHANNEL(state, channel) {
        state.livelyChannel = channel
    }
};
