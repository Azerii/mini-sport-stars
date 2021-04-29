import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddChild from "./pages/AddChild";
import TermsAndConditions from "./pages/TermsAndConditions";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/sign-in" component={SignIn} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/add-child" component={AddChild} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
      </div>
    </Router>
  );
}

export default App;
