import { Link, useNavigate } from "react-router-dom";
import { deleteToken, isAdmin } from "../../Auth";

function Nav(){

    const navigate = useNavigate();

    const logout= () => {
        deleteToken();
        navigate('/');
    }
    return(
        <nav class="navbar bg-secondary navbar-dark p-3 shadow">
            <ul class="navbar-nav d-flex flex-row">
                <li class="nav-item p-2">
                    <Link class="nav-link " to= "/">Home</Link>
                </li>
                <li class="nav-item p-2">
                    <Link class="nav-link" to= "/about">Sobre</Link>
                </li>
                <li class="nav-item p-2">
                    <Link class="nav-link" to= "/products">Produtos</Link>
                </li>
                <li class="nav-item p-2">
                    <Link class="nav-link " to= "/contact">Contato</Link>
                </li>
            </ul>

            <ul className="navbar-nav d-flex flex-row-reverse">
                {
                    isAdmin() ?
                        
                        <>
                            <li class="nav-item p-2">
                                <button className="btn-danger mt-2" onClick={logout}>Logout</button>
                            </li>

                            <li class="nav-item p-2">
                                <Link class="nav-link" to= "/contactView">Lista de Contatos</Link>
                            </li>

                            <li class="nav-item p-2">
                                <Link class="nav-link" to= "/clientList">Lista de Clientes</Link>
                            </li>

                        </> 
                    :   
                        <>
                            <li class="nav-item p-2">
                                <Link className="nav-link bg-dark p-2" to= "/user/login">Login</Link>                            </li>
                        </>
                }
            </ul>
        </nav>
        
    )

}

export default Nav;