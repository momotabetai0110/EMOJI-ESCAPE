export function useCookieFunction(){
    //指定したキーの値を返す
    const getParamByCookie = (key) =>{
        const regex = new RegExp("(^| )" + key + "=([^;]+)")
        const match = document.cookie.match(regex)

        return match ? match[2] : null
    }

    const saveKeyToCookie = (key,param) =>{
        document.cookie = `${key}=${param}; path=/; max-age=2592000`
    }

    return {
        getParamByCookie,
        saveKeyToCookie
    }
}