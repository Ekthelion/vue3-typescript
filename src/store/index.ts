import { createStore } from "vuex";
import { InjectionKey } from "vue";
import { GrudgeType } from "@/types";
import { GRUDGE_ADD, GRUDGE_FORGIVE, GRUDGES_GET, GRUDGE_GET, GRUDGE_DELETE } from "./mutation-types";
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

const deletedSubscription = gql`
  subscription Delete {
    deleted
  }
`;

const addedSubscription = gql`
  subscription Add {
    added {
      id
      who
      when
      forgiven
      title
    }
  }
`;

const forgivenSubscription = gql`
  subscription grudgeForgiven {
    forgiven {
      id
      forgiven
      when
    }
  }
`;

const store = createStore({
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
    grudgeById: (_, getters) => (id: string): GrudgeType => {
      const grudge = getters.grudges.find((elem: GrudgeType) => elem.id === id);
      return grudge;
    },
  },
});

graphqlClient.subscribe({ query: deletedSubscription }).subscribe({
  next(response) {
    const { data } = response;
    const { deleted } = data;
    store.commit(GRUDGE_DELETE, deleted);
  },
  error(err) {
    console.log(err);
  },
});

graphqlClient.subscribe({ query: addedSubscription }).subscribe({
  next(response) {
    store.dispatch(GRUDGES_GET);
  },
  error(err) {
    console.log(err);
  },
});

graphqlClient.subscribe({ query: forgivenSubscription }).subscribe({
  next(response) {
    const { data } = response;
    store.commit(GRUDGE_FORGIVE, data.forgiven);
  },
  error(err) {
    console.log(err);
  },
});

export default store;

export type Store = ReturnType<typeof createStore>;
export const StoreKey: InjectionKey<Store> = Symbol("Store");
