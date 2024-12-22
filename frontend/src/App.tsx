import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import EntryForm from './components/EntryForm'
import Navbar from './components/Navbar'
import Deposit from './components/actions/Deposit'
import Withdraw from './components/actions/Withdraw'
import Loan from './components/actions/Loan'

function ActionsLayout() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
}

export default function App() {
  return (
    <div className='h-screen w-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EntryForm />} />
          <Route path='/actions' element={<ActionsLayout />}>
            <Route path='deposit' element={<Deposit />} />
            <Route path='withdraw' element={<Withdraw />} />
            <Route path='loan' element={<Loan />} />
          </Route>
        </Routes>        
      </BrowserRouter>
    </div>
  )
}