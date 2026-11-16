import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { StudioProvider } from "./context/StudioContext.jsx";
import ClassDetails from "./pages/ClassDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import Classes from "./pages/Classes.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Plan from "./pages/Plan.jsx";

function App() {
  return (
    <StudioProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StudioProvider>
  );
}

export default App;
