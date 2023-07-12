import { useEffect, useState, useContext } from "react";
import { MobXProviderContext } from 'mobx-react';
import { Store } from '../store';

export function useStore<T extends typeof Store, V extends keyof T>(name: V): T[V] {
    const store = useContext(MobXProviderContext) as T;
    return store[name]
}
    

export const useMount = (fn: () => void) => {
    // 判断一下，传如的 fn 是否是一个函数
    if (typeof fn === 'function') {
        useEffect(() => {
            fn?.();
        }, []);
        return;
    } else {
        throw(new TypeError(`useMount: parameter fn expected to be a function, but got "${typeof fn}".`));
    }
};

export const useShowFilter = () => {
    const [isShow, setIsShow] = useState(true);

    const scrollHandle = () => {
        setIsShow(false);
        clearTimeout(timer!);
        timer = setTimeout(() => {
            setIsShow(true);
        }, 500);
    }
    let timer = null;

    useEffect(() => {
        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle);
        }
    });

    return isShow;
}

export const useShowJumpTop = () => {
    const [isShow, setIsShow] = useState(false);

    const scrollHandle = () => {
        if (scrollY === 0) {
            setIsShow(false);
        } else {
            setIsShow(true);
        }
    }
    let timer = null;

    useEffect(() => {
        window.addEventListener('scroll', scrollHandle);

        return () => {
            window.removeEventListener('scroll', scrollHandle);
        }
    });

    return isShow;
}
