import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./Components/Project/Project.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Screen from "./Components/Screen/Screen.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Project />} />
          <Route path="/screen" element={<Screen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
