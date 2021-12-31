import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import Ota from "./pages/ota";
// import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
export default function App(){
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ota" element={<Ota />}>
        <Route path=":ota" element={<Ota />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)
    }