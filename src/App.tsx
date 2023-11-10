import { AuthProvider } from "react-auth-kit";
import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider 
        authType={"cookie"} 
        authName={"_auth"}
        >
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
