import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";

function Contact(){

    const {handleSubmit, register} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        Api.post('/contact', {
            name : data.name, 
            email : data.email,
            message : data.message
        })
        .then((response)=>{
            console.log(response);
        })
        .catch((errors)=>{
            console.log(errors)
        })
        .finally(()=>{
            navigate('/contactView');
        })
    }

    return(
        <div className="row p-3 w-50 mx-auto">
            <div className="col-sm-1"></div>
                <div className="col-sm-10">

                    <h3 className="p-3">Página Contato</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-1">

                        <div className="form-group p-1">
                            <label htmlFor="">Nome</label>
                            <input 
                                className="form-control shadow"
                                type="text" 
                                {...register('name')} 
                            />
                        </div>

                        <div className="form-group p-1">
                            <label htmlFor="">Email</label>
                            <input 
                                className="form-control shadow"
                                type="text" 
                                {...register('email')} 
                            />
                        </div>

                        <div className="form-group p-1">
                            <label htmlFor="">Mensagem</label>
                            <textarea 
                                className="form-control shadow"
                                type="text" 
                                {...register('message')} 
                            >
                            </textarea>
                        </div>

                        <button type="submit" className="btn btn-primary p-1 mt-3">
                            Enviar
                        </button>
                        
                    </form>
                </div>

            <div className="col-sm-1"></div>
        </div>
    )
}

export default Contact;