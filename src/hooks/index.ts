import { useEffect } from "react";

export  const useMount = (fn: () => void) => {
    // 判断一下，传如的 fn 是否是一个函数
    if (typeof fn === 'function') {
        useEffect(() => {
            fn?.();
        }, []);
        return;
    } else {
        throw(new TypeError(`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`));
    }
};
