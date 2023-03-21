export const wait = (num:number) => {
    return new Promise((res) => {
        setTimeout(res, num)
    })
}

export const throttle = async <T = unknown>(cb:Promise<T>, timeout: number) => {
    const res = await Promise.all([cb, wait(timeout)])
    return res[0]
}