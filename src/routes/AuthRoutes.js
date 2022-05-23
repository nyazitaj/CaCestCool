<Routes>
    <Route
        path="/admin"
        element={
            isAuthenticated ? (
                <Navigate to="/admin/dashboard" />
            ) : (
                <Navigate to="/auth/login" />
            )
        }
    />

    <Route
        exact
        path="/admin"
        element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/auth/login" />
        }
    >
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/property-management" element={<AdminPropManagement />} />
        <Route exact path="/new-property" element={<NewProperty />} />
    </Route>

</Routes>