
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddItem from './component/AddItem'
import CartHeader from './component/Header'
import ProductList from './component/ProductList'
import CartList from './component/cartList'

function App() {

  return (
    <>
      <BrowserRouter>
        <CartHeader />

        <Routes>
          <Route path='/' element={<ProductList />}></Route>
          <Route path='/cart' element={<CartList/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
