import { db } from "~/plugins/firebase";

export const state = () => ({
    currentUser: null
});

export const getters = {
    currentUser: state => state.currentUser
};

export const actions = {
    setCurrentUser({ commit }, user) {
        commit('SET_CURRENT_USER', user)
    }

};

export const mutations = {
    SET_CURRENT_USER(state, user) {
        state.currentUser = user
    }
};
