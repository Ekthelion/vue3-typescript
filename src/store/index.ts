import { createStore } from "vuex";
import { InjectionKey } from "vue";
import { GrudgeType, ForgivePayload } from "@/types";
import { GRUDGE_ADD, GRUDGE_FORGIVE, GRUDGES_GET, GRUDGES_SET, GRUDGE_GET, GRUDGE_DELETE } from "./mutation-types";
import graphqlClient from "../client/graphql";
import { gql } from "graphql-tag";

const grudgesQuery = gql`
  query Grudges {
    grudges {
      id
      title
      when
      who
      forgiven
    }
  }
`;

const grudgeByIdQuery = gql`
  query grudgeById($id: String) {
    grudge(id: $id) {
      id
      title
      who
      when
      forgiven
    }
  }
`;

const addGrudgeMutation = gql`
  mutation AddGrudge($input: AddGrudgeInput) {
    addGrudge(input: $input) {
      id
      title
      who
      when
      forgiven
    }
  }
`;

const forgiveMutation = gql`
  mutation Forgive($input: ForgiveInput) {
    forgive(input: $input) {
      id
      title
      who
      when
      forgiven
    }
  }
`;

const deleteMutation = gql`
  mutation Delete($id: String) {
    delete(id: $id)
  }
`;

export default createStore({
  state: {
    grudgeList: [] as GrudgeType[],
  },
  mutations: {
    [GRUDGES_GET](state, grudges: GrudgeType[]) {
      state.grudgeList = grudges;
    },
    [GRUDGE_ADD](state, grudge: GrudgeType) {
      state.grudgeList.push({ ...grudge });
    },
    [GRUDGE_FORGIVE](state, payload: GrudgeType) {
      state.grudgeList = state.grudgeList.map(grudge => {
        if (grudge.id === payload.id) {
          grudge.forgiven = payload.forgiven;
          grudge.when = payload.when;
        }
        return grudge;
      });
    },
    [GRUDGE_DELETE](state, id: string) {
      console.log(GRUDGE_DELETE, id);
      state.grudgeList = state.grudgeList.filter(g => g.id !== id);
    },
  },
  actions: {
    async [GRUDGE_ADD]({ commit }, grudge: GrudgeType) {
      const { data } = await graphqlClient.mutate({
        mutation: addGrudgeMutation,
        variables: { input: grudge },
      });
      commit(GRUDGE_ADD, data.addGrudge);
    },
    async [GRUDGE_FORGIVE]({ commit }, payload) {
      const { data } = await graphqlClient.mutate({
        mutation: forgiveMutation,
        variables: { input: payload },
      });
      commit(GRUDGE_FORGIVE, data.forgive);
    },
    async [GRUDGE_GET]({ commit }, id) {
      const { data } = await graphqlClient.query({
        query: grudgeByIdQuery,
        variables: { id },
      });
      commit(GRUDGE_GET, data.grudgeById);
    },
    async [GRUDGES_GET]({ commit }) {
      const { data } = await graphqlClient.query({
        query: grudgesQuery,
      });
      commit(GRUDGES_GET, data.grudges);
    },
    async [GRUDGE_DELETE]({ commit }, id) {
      const { data } = await graphqlClient.mutate({
        mutation: deleteMutation,
        variables: { id },
      });
      commit(GRUDGE_DELETE, data.delete);
    },
  },
  modules: {},
  getters: {
    grudges: state => state.grudgeList,
    grudgeById: (_, getters) => (id: string): GrudgeType => getters.grudges.find((elem: GrudgeType) => elem.id === id),
  },
});

export type Store = ReturnType<typeof createStore>;
export const StoreKey: InjectionKey<Store> = Symbol("Store");
