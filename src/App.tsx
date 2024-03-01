import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Companies from "./pages/Companies"
import Detail from "./pages/Detail"
import AddCompany from "./pages/AddCompany"
import NotFound from "./pages/NotFound"

function App() {
  
  return (
    <>
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
      </BrowserRouter>
    </>
  )
}

export default App
