import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home";
import Otk from "./pages/otk";
// import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
export default function App(){
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Otk />}>
        <Route path=":otk" element={<Otk />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)
    }