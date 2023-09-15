import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Main from "./layout/Main";
import Register from "./pages/Register";
import AccountPage from "./pages/AccountPage";
import PlaceCreateForm from "./pages/PlaceCreateForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/:subpage?" element={<AccountPage />} />
        <Route path="/account/:subpage/:action" element={<AccountPage />} />
        <Route path="/account/:subpage/new" element={<PlaceCreateForm />} />
      </Route>
    </Routes>
  );
}

export default App;
