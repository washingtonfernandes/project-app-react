import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Api from "../../../../Api";
import { getToken } from '../../../../Auth';
import { useParams } from 'react-router-dom'

function ClientUpdate() {
    let {idClient} = useParams();
    const [client, setClient] = useState([]);
    const {handleSubmit, register, reset} = useForm();
    const navigate = useNavigate();

    useEffect(()=>{
        Api.get(`/client/${idClient}`, 
            {
                params: {},
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        )
        .then((response)=>{
            setClient(response.data);
            reset(response.data);
        })
    },[idClient, reset])

    const onSubmit = (data) => {
        Api.put(`/client/${idClient}`, 
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
        <div className="row justify-content-center">
            <div className="col-sm-8"></div>
            <div className="col-sm-12">
                <h2>Alterar Cliente</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="p-1">

                    <div className="form-group p-1">
                        <label className="form-label" htmlFor="">Nome</label>
                        <input 
                            className="form-control"
                            type="text" 
                            {...register('name')} 
                            defaultValue={client.name}
                        />
                    </div>

                    <div className="form-group p-1">
                        <label className="form-label" htmlFor="">Email</label>
                        <input 
                            className="form-control"
                            type="text" 
                            {...register('email')} 
                            defaultValue={client.email}
                        />
                    </div>

                    <div className="form-group p-1">
                        <label className="form-label" htmlFor="">Telefone</label>
                        <input 
                            className="form-control"
                            type="text" 
                            {...register('phone')} 
                            defaultValue={client.phone}
                        >
                        </input>
                    </div>

                    <div className="form-group p-1">
                        <label className="form-label" htmlFor="">Endereço</label>
                        <input 
                            className="form-control"
                            type="text" 
                            {...register('address')} 
                            defaultValue={client.address}
                        >
                        </input>
                    </div>

                    <button onClick={handleSubmit(onSubmit)} className="btn btn-primary p-2">
                        Salvar
                    </button>

                    </form>
            
            </div>
            <div className="col-sm-1"></div>    
        </div> 
    )


}

export default ClientUpdate;