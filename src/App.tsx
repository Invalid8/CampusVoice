import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import {
  Contact,
  Home as HomePage,
  Login as LoginPage,
  Policy,
  Suggestions,
  SuggestionsDetails,
  Terms,
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/policy" element={<Policy />} />
            <Route
              path="*"
              element={
                <div>
                  <h1>Page Not Found</h1>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
