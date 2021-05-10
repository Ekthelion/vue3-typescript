import { createStore } from "vuex";
import { InjectionKey } from "vue";
import { GrudgeType, ForgivePayload } from "@/types";
import { GRUDGE_ADD, GRUDGE_FORGIVE, GRUDGES_GET, GRUDGES_SET, GRUDGE_GET } from "./mutation-types";
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

const AddGrudgeMutation = gql`
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

const ForgiveMutation = gql`
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
    async [GRUDGE_ADD]({ commit }, grudge: GrudgeType) {
      const { data } = await graphqlClient.mutate({
        mutation: AddGrudgeMutation,
        variables: { input: grudge },
      });
      commit(GRUDGE_ADD, data.addGrudge);
    },
    async [GRUDGE_FORGIVE]({ commit }, payload) {
      const { data } = await graphqlClient.mutate({
        mutation: ForgiveMutation,
        variables: { input: payload },
      });
      commit(GRUDGE_FORGIVE, data.forgive);
    },
    async [GRUDGE_GET]({ commit }, id) {
      const response = await graphqlClient.query({
        query: grudgeByIdQuery,
        variables: { id: id },
      });
      commit(GRUDGE_GET, response.data.grudgeById);
    },
    async [GRUDGES_GET]({ commit }) {
      const response = await graphqlClient.query({
        query: grudgesQuery,
      });
      commit(GRUDGES_GET, response.data.grudges);
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
