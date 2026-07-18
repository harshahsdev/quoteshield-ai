import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import Register from "./pages/Register";
import { ProtectedRoute } from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { Layout } from './components/layout/Layout';
import CreateJob from "./pages/jobs/CreateJob";
import UploadQuotation from "./pages/jobs/UploadQuotation";
import QuotationDetails from './pages/jobs/QuotationDetails';
import Profile from "./pages/profile";
import CompareQuotation from './pages/jobs/CompareMultiQuotation';


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          
          <Route path="/dashboard" element={<Dashboard />} />

      

        
          {/* <Route path="/jobs" element={<Jobs />} /> */}
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/jobs/upload/:jobId" element={<UploadQuotation />} />
          <Route path="/jobs/quotation/:jobId" element={<QuotationDetails />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/jobs/compare/:jobId" element={<CompareQuotation />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
