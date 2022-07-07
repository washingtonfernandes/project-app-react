import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import{ useParams } from 'react-router-dom';
import Api from '../../../../Api';
import { getToken } from '../../../../Auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


function ContactResponse(){
    let {idContact} = useParams();
    const [contact,setContact] = useState([]);
    const {handleSubmit, register, reset} = useForm();
    const navigate = useNavigate();

    useEffect(()=>{
        Api.get(`/contact/${idContact}`, {
            params: {},
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        })
        .then((response)=>{
            setContact(response.data)
            reset(response.data);
        } )
    },[idContact, reset])

    const handleOnChange = (event) =>{
         setContact({...contact, status:event.target.value})
    }

    const onSubmit = (data) => {
        Api.put(`/contact/${contact.idContact}`, 
            {
                status: data.status,
                description: data.description
            },
            {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            }
        )
        .finally(()=>{
            navigate('/contactView');
        })
    }

    return(
        <div className="row">
            <div className="col-sm-5">
                <div className="col-sm-10">
                    <h4>Resposta ao Contato</h4>
                    <table className='table table-striped justify-content-center'>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>Nome</th>
                                <td>{contact.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{contact.email}</td>
                            </tr>
                            <tr>
                                <th>Mensagem</th>
                                <td>{contact.message}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>
                                    <select 
                                        className="form-control"
                                        value={contact.status}
                                        {...register('status')}
                                        onChange={(event) => handleOnChange(event)}
                                        >
                                            <option value="0">Aberto</option>
                                            <option value="1">Fechado</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Descrição</th>
                                <td>
                                    <textarea 
                                        className="form-control"
                                        {...register('description')}
                                        defaultValue={contact.description}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>  
                    <button onClick={handleSubmit(onSubmit)}>
                        Salvar
                    </button>
                </div> 

                <div className="col-sm-1">

                </div>  
            </div>   
        </div>
    )
}

export default ContactResponse