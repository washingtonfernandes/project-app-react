import axios from "axios";

const Api = axios.create(
    {
        baseURL : 'http://159.223.8.27:8001/index.php'
    }
)

export default Api;