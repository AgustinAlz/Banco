import { BrowserRouter, Routes, Route } from "react-router-dom";

//import HomePage from "./pages/HomePage";
import { Navigation } from "./pages/Navigation.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RolesPage } from "./pages/RoleListPage.jsx";
import { UserListPage } from "./pages/UserListPage.jsx";
import { UserCRUPage } from "./pages/UserCRUPage.jsx";
import { AccountListPage } from "./pages/AccountListPage.jsx";
import { AccountCRUPage } from "./pages/AccountCRUPage.jsx";
import { AccountCRUPageVnew } from "./pages/AccountCRUPageVnew.jsx";

//import { FormUserPage } from "./pages/FormUserPage.jsx";
import { UserProvider } from "./context/usersContext.jsx";
import { RoleProvider } from "./context/rolesContext.jsx";

import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes"


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
                <Route element={<ProtectedRoute />}>
                  <Route path="/users" element={<UserListPage />} />
                  <Route path="/roles" element={<RolesPage />} />
                  <Route path="/users/create" element={<UserCRUPage />} />
                  <Route path="/users/:id" element={<UserCRUPage />} />
                  <Route path="/owner/:ownerId/accounts/" element={<AccountListPage />} />
                  <Route path="/owner/:ownerId/accounts/create" element={<AccountCRUPage />} />
                  <Route path="/owner/:ownerId/accounts/:id" element={<AccountCRUPage />} />
                  <Route path="/owner/:ownerId/test/create" element={<AccountCRUPageVnew />} />
                  <Route path="/owner/:ownerId/test/:id" element={<AccountCRUPageVnew />} />
                  
                </Route>
              </Routes>
            </main>
          </BrowserRouter >
        </UserProvider>
      </RoleProvider>
    </AuthProvider>
  )
}

export default App
