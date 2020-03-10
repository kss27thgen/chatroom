import { db } from "~/plugins/firebase";

export const state = () => ({
    currentChannel: {}
});

export const getters = {
    currentChannel: state => state.currentChannel 
};

export const actions = {
    setCurrentChannel({ commit }, channel) {
        commit('SET_CURRENT_CHANNEL', channel)
    }

};

export const mutations = {
    SET_CURRENT_CHANNEL(state, channel) {
        state.currentChannel = channel
    }
};
