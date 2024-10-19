import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/shared/layout";
import Overview from "./components/Overview";
import DataList from "./components/DataList";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="DataList" element={<DataList />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
