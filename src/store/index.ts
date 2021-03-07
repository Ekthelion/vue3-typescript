import { createStore } from "vuex";
import { GrudgeType, ForgivePayload } from "@/types";
import { GRUDGE_ADD, GRUDGE_FORGIVE } from "./mutation-types";

export default createStore({
  state: {
    grudgeList: [] as GrudgeType[],
  },
  mutations: {
    [GRUDGE_ADD](state, grudge: GrudgeType) {
      state.grudgeList.push({ ...grudge, when: 0, forgiven: false });
    },
    [GRUDGE_FORGIVE](state, payload: ForgivePayload) {
      state.grudgeList.map(grudge => {
        if (grudge.id === payload.id) {
          grudge.forgiven = payload.forgiven;
          grudge.when = payload.forgiven ? new Date().getTime() : 0;
        }
        return grudge;
      });
    },
  },
  actions: {
    [GRUDGE_ADD]({ commit }, grudge: GrudgeType) {
      commit(GRUDGE_ADD, grudge);
    },
    [GRUDGE_FORGIVE]({ commit }, payload) {
      commit(GRUDGE_FORGIVE, payload);
    },
  },
  modules: {},
  getters: {
    grudges: state => state.grudgeList,
    grudgeById: (_, getters) => (id: String): GrudgeType => getters.grudges.find((elem: GrudgeType) => elem.id === id),
  },
});
