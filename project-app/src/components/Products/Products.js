import React, { useEffect, useState } from "react";
import { Routes, useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from "../../Api";

function Products(){

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        setCategories([
            {catId : '1', name: 'Categoria 1'},
            {catId : '2', name: 'Categoria 2'},
            {catId : '3', name: 'Categoria 3'},
        ])
    }, [])

    return(
        <div className="row w-75 mx-auto p-3">
            <div className="col-sm-1"></div>
                <div className="col-sm-10">
                   <h2>Página de produtos</h2> 
                   <ul class="nav">
                       {categories.map((category)=>
                            <li className="nav-item" KEY ={category.catId}>
                                <Link className="nav-link active bg-dark text-white" to={category.catId}>
                                    {category.name}
                                </Link>
                            </li>
                       )}
                   </ul>

                   <Routes>
                       <Route path='/' element={ <AllCategories />}/>
                       <Route path=':id' element={ <Category />}/>
                   </Routes>

                </div>
            <div className="col-sm-1"></div>
        </div>
    )
}

export default Products;

function AllCategories(){

    const [products, setProducts] = useState([])

    useEffect(()=>{
        Api.get('/product')
            .then((response)=>{
                setProducts(response.data)
                console.log(products);
            })
    },[products])

    return(
        <>
            <h3>Todos os produtos</h3>
            <table className='table table-striped'>
                <thead>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Descrição</th>
                </thead>

                <tbody>
                    {products.map((product, index)=>
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

function Category(){

    let {id} = useParams();

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        Api.get(`/product/category/${id}`)
            .then((response)=>{
                setProducts(response.data)
                console.log(products);
            })
    },[id, products])

    return(
        <>
            <h3>Produtos da categoria {id}</h3>
            <table className='table table-striped'>
                <thead>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Descrição</th>
                </thead>

                <tbody>
                    {products.map((product, index)=>
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}