import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { StudioProvider } from "./context/StudioContext.jsx";
import ClassDetails from "./pages/ClassDetails.jsx";
import Classes from "./pages/Classes.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <StudioProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StudioProvider>
  );
}

export default App;
