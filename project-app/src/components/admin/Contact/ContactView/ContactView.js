import React, { useEffect, useState } from "react";
import Api from "../../../../Api";
import { getToken } from "../../../../Auth";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../../commons";

function ContactView(){

    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        Api.get('/contact', 
            {
                params: {},
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }

        )
        .then((response)=>{
            setContacts(response.data);
        })
    },[])

    const handleClickResponse = (idContact) => {
        navigate(`/admin/contact/response/${idContact}`)
    }

    const handleClickDelete = (idContact) => {
        Api.delete(`/contact/${idContact}`)
        .finally(()=>{
            window.location.reload(false);
        })
    }

    return(
        <div className="row mt-3 justify-content-center">
            <div className="col-sm-8 ">
                <div className="col-sm-12 ">
                    <h2>Lista de contatos</h2>
                    <SearchBar path='/contact/search' handle={(data) => { setContacts(data) }} />
                    <table className='table table-striped '>
                        <thead>
                            <th >Nome </th>
                            <th>Email</th>
                            <th>Mensagem</th>
                            <th>Status</th>
                            <th className="text-center" colSpan="2">Ações</th>
                        </thead>

                        <tbody>
                            {contacts.map((contact, index)=>
                                <tr key = {index}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>{
                                            <span class="badge bg-success">Sucesso</span>

                                        }</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => handleClickResponse(contact.idContact)}
                                        >Responder
                                            
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => handleClickDelete(contact.idContact)}
                                        >Deletar
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>    
    
    )
}

export default ContactView;