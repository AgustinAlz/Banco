import { BrowserRouter, Routes, Route } from "react-router-dom";

//import HomePage from "./pages/HomePage";
import { Navigation } from "./pages/Navigation.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RolesPage } from "./pages/RoleListPage.jsx";
import { UserListPage } from "./pages/UserListPage.jsx";
import { UserCreatePage } from "./pages/UserCreatePage.jsx";
//import { FormUserPage } from "./pages/FormUserPage.jsx";
import { UserProvider } from "./context/usersContext.jsx";
import { RoleProvider } from "./context/rolesContext.jsx";
import { UserCRUPage } from "./pages/UserCRUPage.jsx";
import { AuthProvider } from "./context/authContext.jsx";


function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <UserProvider>
          <BrowserRouter>
            <main>
              <Navigation />
              <Routes>
                {/*<Route path="/" element={<HomePage />} />*/}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/users/create" element={<UserCRUPage />} />
                <Route path="/users/:id" element={<UserCRUPage />} />
              </Routes>
            </main>
          </BrowserRouter >
        </UserProvider>
      </RoleProvider>
    </AuthProvider>
  )
}

export default App
