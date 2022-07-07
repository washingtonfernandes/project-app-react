import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../../../../Api";
import { getToken } from "../../../../Auth";

function ClientAdd(){

    const {handleSubmit, register} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        Api.post('/client', 
            {
                name : data.name, 
                email : data.email,
                phone : data.phone,
                address : data.address
            },
            {           
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            }
        )
        .then(()=> {
            navigate('/clientList');
        })
    }
    return(
        <>
            <div className="row p-3">
                <div className="col-sm-8"></div>
                <div className="col-sm-12">
                    <h2>Adicionar Cliente</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-1">

                        <div className="form-group p-1">
                            <label className="form-label" htmlFor="">Nome</label>
                            <input 
                                className="form-control"
                                type="text" 
                                {...register('name')} 
                            />
                        </div>

                        <div className="form-group p-1">
                            <label className="form-label" htmlFor="">Email</label>
                            <input 
                                className="form-control"
                                type="text" 
                                {...register('email')} 
                            />
                        </div>

                        <div className="form-group p-1">
                            <label className="form-label" htmlFor="">Telefone</label>
                            <input 
                                className="form-control"
                                type="text" 
                                {...register('phone')} 
                            >
                            </input>
                        </div>

                        <div className="form-group p-1">
                            <label className="form-label" htmlFor="">Endereço</label>
                            <input 
                                className="form-control"
                                type="text" 
                                {...register('address')} 
                            >
                            </input>
                        </div>

                        <button type="submit" className="btn btn-primary p-2">
                            Salvar
                        </button>

                        </form>
                
                </div>
                <div className="col-sm-1"></div>    
            </div> 
        </>
    )
}

export default ClientAdd;