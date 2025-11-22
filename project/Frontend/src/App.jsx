import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home/Home.jsx'
import About from './Home/About.jsx'
import Places from './Home/Places.jsx'
import Hotel from './Home/Hotel.jsx'
import CarRent from './Home/CarRent.jsx'
import SignIn from './Home/SignIn.jsx'
import AdminHome from './Admin/AdminHome.jsx'
import Table from './Admin/Table.jsx'
import AddTour from './Admin/Manage/AddTour.jsx'
import AddHomestay from './Admin/Manage/AddHomestay.jsx'
import AddVehicle from './Admin/Manage/AddVehicle.jsx'

function AppContent() {
    const location = useLocation();
    
    // Kiểm tra xem có phải trang admin không
    const isAdminPage = location.pathname.startsWith('/admin');
    
    return (
        <>
            {/* Hiển thị navbar cho tất cả trang TRỪ trang admin */}
            {!isAdminPage && (
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="/">South VietNam</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                                aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu"></span> Menu
                        </button>

                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                                <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
                                <li className="nav-item"><a href="/places" className="nav-link">Places</a></li>
                                <li className="nav-item"><a href="/hotel" className="nav-link">Hotels</a></li>
                                <li className="nav-item"><a href="/carrent" className="nav-link">Car Rent</a></li>
                                <li className="nav-item"><a href="/signin" className="nav-link">Sign in</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/places" element={<Places />} />
                <Route path="/hotel" element={<Hotel />} />
                <Route path="/carrent" element={<CarRent />} />
                <Route path="/signin" element={<SignIn />} />


                <Route path='/admin' element={<AdminHome/>} />
                <Route path='/admin/tables' element={<Table/>} />
                <Route path='/admin/addtour' element={<AddTour/>} />
                <Route path='/admin/addhomestay' element={<AddHomestay/>} />
                <Route path='/admin/addvehicle' element={<AddVehicle/>} />
            </Routes>
        </>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App