import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Layout from "./components/Layout/Layout";
import Tabs from "./pages/tabs";
import Deshboard from "./pages/deshboard";
import Auth from "./pages/Authorization";
import PageNotFound from "./pages/404 Page"


function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Deshboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />

        <Route element={<Layout />} >
          <Route path="/tabs" element={<Tabs />} />
        </Route>
        
      </Routes>
    </>
  );


}

export default App;
