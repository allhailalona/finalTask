import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EntryForm from './components/EntryForm'

export default function App() {
    return (
        <div className='h-screen w-screen'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<EntryForm />} />
                </Routes>        
            </BrowserRouter>
        </div>
    )
}