import React from "react";
import { useForm } from "react-hook-form";
import { getToken } from "../../Auth"; 
import Api from "../../Api";


function SearchBar(props) {

    const {handleSubmit, register} = useForm();

    const onSubmit = (data) => {
        Api.get(
            `${props.path}/${data.search}`,
            {
                params:{},
                headers:{
                    Authorization: "Bearer " + getToken()
                }
            }
        ).then((response) => {
            props.handle(response.data)
        })

        //props.handle()
    }

    return(
        <div className="mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-2">
                    <label className="form-label" htmlFor="">Busca</label>
                    <input 
                        className="form-control" 
                        type="text"
                        {...register('search')}
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-success">Pesquisar</button>
                </div>

            </form>
        </div>
    )
}

export default SearchBar;