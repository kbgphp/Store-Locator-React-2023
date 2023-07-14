import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Layout from "./components/Layout/Layout";
import Tabs from "./pages/tabs/Tabs";
import Deshboard from "./pages/deshboard";


function App() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/deshboard" element={<Deshboard />} />
        <Route element={<Layout />} >
          <Route path="/tabs" element={<Tabs/>} />
        </Route>
      </Routes>
    </>
  );


}

export default App;
