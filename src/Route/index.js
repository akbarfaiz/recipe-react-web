import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom";
import Home from '../Page/Home'
import Profile from '../Page/Profile'
import EditRecipe from '../Page/Edit'
import Add from '../Page/Add'
import Search from '../Page/Search/index.js'
import SearchDetail from '../Page/Search/detail.js'
import Register from '../Page/Auth/register'
import Login from '../Page/Auth/login'

function App(){
    return(
            <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to='home' replace="true"/>} />
                        <Route path='/home' element={<Home/>} />
                        <Route path='/profile' element={<Profile/>} />
                        <Route path='/profile/editRecipe/:id' element={<EditRecipe/>} />
                        <Route path='/add' element={<Add/>} />
                        <Route path='/search' element={<Search/>} />
                        <Route path='/search/detail/:id' element={<SearchDetail/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login/>} />
                    </Routes>
            </BrowserRouter>
    )
}

export default App