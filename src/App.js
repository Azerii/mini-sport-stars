import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddChild from "./pages/AddChild";
import TermsAndConditions from "./pages/TermsAndConditions";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            {/* Onboarding */}
            <Route path="/sign-in" component={SignIn} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/add-child" component={AddChild} />
            <Route
              path="/terms-and-conditions"
              component={TermsAndConditions}
            />

            {/* Dashboard */}
            <Route
              exact
              path="/"
              component={() => {
                return <Redirect to="/dashboard" />;
              }}
            />
            <Route path="/dashboard" component={DashboardLayout} />

            {/* Admin */}
            <Route path="/admin/sign-in" component={AdminLogin} />
            <Route exact path="/admin" component={AdminLayout} />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
