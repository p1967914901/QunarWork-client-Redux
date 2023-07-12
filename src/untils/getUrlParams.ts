export default function getUrlParams () {
    const paramList = decodeURIComponent(location.search.slice(1)).split('&');
    return paramList.reduce((res:{[key:string]: string}, cur) => {
        res[cur.split('=')[0]] = cur.split('=')[1];
        return res;
    }, {});
}