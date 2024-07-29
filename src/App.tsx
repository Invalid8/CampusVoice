import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import {
  Home as HomePage,
  Login as LoginPage,
  Suggestions,
  SuggestionsDetails,
} from "@/page";
import RootLayout from "@/layout/RootLayout";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/suggestions/:id" element={<SuggestionsDetails />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
