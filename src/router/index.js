import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout } from "../components";
import {
  MainPage,
  SingleCodePage,
  EditCodePage,
  NewCodePage,
  NewCodesPage,
  Categories,
  Authorization
} from "../pages";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/code/:code" element={<SingleCodePage />} />
          <Route path="/edit/:code" element={<EditCodePage />} />
          <Route path="/viewNewCode/:code" element={<NewCodePage />} />
          <Route path="/newCodes" element={<NewCodesPage />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
