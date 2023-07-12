/**
 * INIT 初始状态，没有任何信息
 * 
 * PENDING 正在请求状态
 * 
 * FULFILLED 请求成功状态
 * 
 * REJECTED 请求失败状态
 */
export const FETCH_FLIGHT_LIST_STATUS = {
    INIT: 'init',
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}