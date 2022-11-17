import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../components";
import RequireAuth from "../hoc/RequireAuth";
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
          <Route path="/login" element={<Authorization/>} />
          <Route path="/" element={
            <RequireAuth >
                <MainPage/>
            </RequireAuth>
          } />
          <Route path="/code/:code" element={
            <RequireAuth >
                <SingleCodePage/>
            </RequireAuth>
          } />
          <Route path="/edit/:code" element={
            <RequireAuth >
                <EditCodePage/>
            </RequireAuth>
          } />
          <Route path="/viewNewCode/:code" element={
            <RequireAuth >
                <NewCodePage/>
            </RequireAuth>
          } />
          <Route path="/newCodes" element={
            <RequireAuth >
                <NewCodesPage/>
            </RequireAuth>
          } />
          <Route path="/categories" element={
            <RequireAuth >
                <Categories/>
            </RequireAuth>
          } />
          {/* <Route path="/code/:code" element={<SingleCodePage />} />
          <Route path="/edit/:code" element={<EditCodePage />} />
          <Route path="/viewNewCode/:code" element={<NewCodePage />} />
          <Route path="/newCodes" element={<NewCodesPage />} />
          <Route path="/categories" element={<Categories />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
