import { useEffect, useState } from "react";
import { toDos } from "../components/List/List";

export function usePersistedState(key: string, initialState: toDos[]) {
    const [state, setState] = useState(() => {
        const storageValue = localStorage.getItem(key);

        if (storageValue) {
            const value: toDos[] = JSON.parse(storageValue);
            return value;
        }
        else {
            return initialState;
        }

    });


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(initialState))
    }, [key, state]);

    return [state, setState];
}