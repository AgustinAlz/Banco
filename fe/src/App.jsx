import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Navigation } from "./pages/Navigation.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RolesPage } from "./pages/RoleListPage.jsx";
import { UserListPage } from "./pages/UserListPage.jsx";
import { UserCRUPage } from "./pages/UserCRUPage.jsx";
import { AccountListPage } from "./pages/AccountListPage.jsx";
import { AccountCRUPage } from "./pages/AccountCRUPage.jsx";
import { TransactionListPage } from "./pages/TransactionListPage.jsx";
import { TransactionCRUPage } from "./pages/TransactionCRUPage.jsx";

import { UserProvider } from "./context/usersContext.jsx";
import { RoleProvider } from "./context/rolesContext.jsx";

import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute, ProtectedAdminRoute } from "./routes"


function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <UserProvider>
          <BrowserRouter>
            <main>
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedAdminRoute />}>
                  <Route path="/users" element={<UserListPage />} />
                  <Route path="/roles" element={<RolesPage />} />
                  <Route path="/users/create" element={<UserCRUPage />} />
                  <Route path="/users/:id" element={<UserCRUPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/owner/:ownerId/accounts/" element={<AccountListPage />} />
                  <Route path="/owner/:ownerId/accounts/create" element={<AccountCRUPage />} />
                  <Route path="/owner/:ownerId/accounts/:id" element={<AccountCRUPage />} />
                  <Route path="/owner/:ownerId/accounts/:accountId/transactions/" element={<TransactionListPage />} />
                  <Route path="/owner/:ownerId/accounts/:accountId/transactions/create" element={<TransactionCRUPage />} />
                  <Route path="/owner/:ownerId/accounts/:accountId/transactions/:id" element={<TransactionCRUPage />} />
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
