import jwt_decode from "jwt-decode";

export function isAdmin(){

    const checkJwt = (token) => {
        var strToken = jwt_decode(token);
        if(strToken.admin === '1'){
            return true;
        }else{
            return false;
        }
    }

    return(
        (
            getToken() != null ? 
                checkJwt(getToken())
            :
                false
        )
    )
}

export function setToken(token){
    localStorage.setItem('@projectapp/token', token)
}

export function getToken(){
    return localStorage.getItem('@projectapp/token')
}

export function deleteToken(){
    return localStorage.removeItem('@projectapp/token')
}