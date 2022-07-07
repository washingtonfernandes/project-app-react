import React, { useEffect, useState } from "react";
import Api from "../../Api";

function Home(){

    const [page, setPage] = useState([])

    useEffect(()=>{
        Api.get('/page/1')
            .then((response)=>{
                setPage(response.data)
            })
    },[])

    return(
        <div className="row ">
            <div className="col-sm-1"></div>
                <div 
                    className="col-sm-10"
                    dangerouslySetInnerHTML={
                        {
                            __html: page.content
                        }
                    }
                >
                    
                </div>
            <div className="col-sm-1"></div>
        </div>
    )
}

export default Home;