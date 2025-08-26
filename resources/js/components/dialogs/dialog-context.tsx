import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type DialogId = 'createProject' | 'createOpportunity' | 'createQuote' | 'createArchitect';

type OpenMap = Record<DialogId, boolean>;

type Ctx = {
    openMap: OpenMap;
    open: (id: DialogId) => void;
    close: (id: DialogId) => void;
    toggle: (id: DialogId) => void;
    closeAll: () => void;
};

const GlobalDialogContext = createContext<Ctx | null>(null);

const DEFAULT_STATE: OpenMap = {
    createProject: false,
    createOpportunity: false,
    createQuote: false,
    createArchitect: false,
};

export function GlobalDialogProvider({ children }: { children: ReactNode }) {
    const [openMap, setOpenMap] = useState<OpenMap>(DEFAULT_STATE);

    const open = useCallback((id: DialogId) => setOpenMap((s) => ({ ...s, [id]: true })), []);
    const close = useCallback((id: DialogId) => setOpenMap((s) => ({ ...s, [id]: false })), []);
    const toggle = useCallback((id: DialogId) => setOpenMap((s) => ({ ...s, [id]: !s[id] })), []);
    const closeAll = useCallback(() => setOpenMap(DEFAULT_STATE), []);

    const value = useMemo(() => ({ openMap, open, close, toggle, closeAll }), [openMap, open, close, toggle, closeAll]);
    return <GlobalDialogContext.Provider value={value}>{children}</GlobalDialogContext.Provider>;
}

export function useGlobalDialogs() {
    const ctx = useContext(GlobalDialogContext);
    if (!ctx) throw new Error('useGlobalDialogs must be used within GlobalDialogProvider');
    return ctx;
}

/** Convenience hook for a single dialog id */
export function useDialog(id: DialogId) {
    const { openMap, open, close, toggle } = useGlobalDialogs();
    return {
        open: openMap[id],
        openDialog: () => open(id),
        closeDialog: () => close(id),
        toggleDialog: () => toggle(id),
    };
}
