import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";
import { setToken } from "../../../Auth";

function Login(){

    const {handleSubmit, register} = useForm();

    const navigate = useNavigate();

    const onSubmit = data => {
        Api.post('/user/login', {
            userName: data.userName,
            password: data.password
        })
        .then((response)=>{
            if(response.data.access === 'true'){
                setToken(response.data.token)
            }
        })
        .finally(()=>{
            navigate('/');
        })
    }

    return(
        <>
            <div className="row p-5 w-50 mx-auto">
                <div className="col-sm-12 ">
                    
                    <div className="col-sm-10">

                        <h5 className="p-3 border rounded-3 border-2 text-center text-white bg-dark">LOGIN</h5>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-1 ">

                            <div className="form-group p-1">
                                <label htmlFor="">Usuário</label>
                                <input 
                                    className="form-control shadow"
                                    type="text" 
                                    {...register('userName')} 
                                />
                            </div>

                            <div className="form-group p-1">
                                <label htmlFor="">Senha</label>
                                <input 
                                    className="form-control shadow"
                                    type="password" 
                                    {...register('password')} 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary p-1 mt-2">
                                Enviar
                            </button>
                            
                        </form>
                    </div>
                </div>
                <div className="col-sm-1"></div>
            </div>

        </>
    )
}

export default Login;