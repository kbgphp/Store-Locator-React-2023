import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Layout from "./components/Layout/Layout";
import Tabs from "./pages/tabs";
import Deshboard from "./pages/deshboard";
import Auth from "./pages/Authorization";
import PageNotFound from "../src/components/404 Page"
import Test from "./components/Test";

function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Deshboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/test" element={< Test />} />

        <Route path="*" element={<PageNotFound/>} />

        <Route element={<Layout />} >
          <Route path="/tabs" element={<Tabs/>} />
        </Route>
      </Routes>
    </>
  );


}

export default App;
