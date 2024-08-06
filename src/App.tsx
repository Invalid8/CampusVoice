import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import {
  About,
  Contact,
  Home as HomePage,
  NotFound,
  Policy,
  Profile,
  Settings,
  Suggestions,
  SuggestionsDetails,
  Terms,
  Users,
} from "@/page";
import RootLayout from "@/layout/RootLayout";
import { Suspense } from "react";
import ProtectedRoute from "./auth/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/suggestions"
              element={
                <Suspense>
                  <Suggestions />
                </Suspense>
              }
            />
            <Route path="/suggestions/:id" element={<SuggestionsDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/about" element={<About />} />

            {/* Protected routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
