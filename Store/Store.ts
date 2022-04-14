import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';
import { makeObservable, observable } from 'mobx';

import ExchangeStore from "./stores/ExchangeStore";

const isServer = !(typeof window != 'undefined' && window.document);
enableStaticRendering(isServer);

let store: DataStore;

export class DataStore {
    @observable exchange = new ExchangeStore();

    constructor() {
        makeObservable(this);
    }
}

export function useStore() {
    function initializeStore() {
        const _store = store ?? new DataStore();
        // For SSG and SSR always create a new store
        if (typeof window === 'undefined') return _store;
        // Create the store once in the client
        if (!store) store = _store;
        return _store;
    }

    return useMemo(() => initializeStore(), []);
}
