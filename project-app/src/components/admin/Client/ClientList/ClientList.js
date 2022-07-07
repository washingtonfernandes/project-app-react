import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../../Api";
import SearchBar from "../../../commons";
import { getToken } from "../../../../Auth";

function ClientList() {

    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        Api.get('/client', 
        {
            params: {},
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
    )
    .then((response)=>{
        console.log(response.data);
        setClients(response.data);
    })
    },[])

    const handleClickAdd = () =>{
        navigate('/admin/clientAdd')
    }

    const handleClickUpdate = (idClient) => {
        navigate(`/admin/clientUpdate/${idClient}`)
    }

    const handleClickDelete = (idClient) => {
        Api.delete(`/client/${idClient}`)
        .finally(()=>{
            window.location.reload(false);
        })
    }

    return(
        <div className="row mt-3 justify-content-center">
            <div className="col-sm-8">
                <div className="col-sm-12">

                    <h3>Listagem de clientes</h3>
                    <SearchBar path='/client/search' handle={(data) => { setClients(data) }} />

                    <button 
                        className="btn btn-primary mb-4"
                        onClick={() => handleClickAdd()}
                    >
                        Novo
                    </button>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Nome </th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th className="text-center" colSpan="2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client, index)=>
                                <tr key = {index}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.address}</td>
                                    <td>
                                        <button 
                                            className="btn btn-warning"
                                            onClick={() => handleClickUpdate(client.idClient)}
                                        >
                                            Alterar
                                            
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => handleClickDelete(client.idClient)}
                                        >
                                            Deletar

                                        </button>
                                    </td>

                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>    
                <div className="col-sm-1"></div>
            </div>
        </div>    
    )
}

export default ClientList