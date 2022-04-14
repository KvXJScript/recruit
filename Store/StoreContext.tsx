import React, { createContext, useContext } from 'react';
import { useStore, DataStore } from './Store';

const RootStateContext = createContext<DataStore>(null);

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return <RootStateContext.Provider value={useStore()}>{children}</RootStateContext.Provider>;
};

export const useRootStore = () => useContext(RootStateContext);
