import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import HomeFuncionario from "../pages/HomeFuncionario/HomeFuncionario"
import ListarProduto from "../pages/ListarProduto/ListarProduto"



const AppRoutes = () =>{

    return (
     <BrowserRouter>
        <Routes>
          
           <Route 
             path="/"
             element={<HomeFuncionario/>}
           />
            <Route 
             path="/pizzaria/funcionario/home"
             element={<HomeFuncionario/>}
           />
           <Route 
             path="/pizzaria/funcionario/produtos"
             element={<ListarProduto/>}
           />

        </Routes>
     
     </BrowserRouter>
    )
}

export default AppRoutes
