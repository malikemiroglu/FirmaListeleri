import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Companies from "./pages/Companies"
import Detail from "./pages/Detail"
import AddCompany from "./pages/AddCompany"
import NotFound from "./pages/NotFound"
import CompanyProvider from "./context/CompanyContext"
import Pagination from "./components/Pagination"

function App() {

  return (
    <>
    <CompanyProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/sirketler" element={<Companies />} />
            <Route path="/sirketler/detail/:id" element={<Detail />} />
            <Route path="/sirket-ekle" element={<AddCompany />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Pagination />
        </BrowserRouter>
    </CompanyProvider>
    </>
  )
}

export default App
