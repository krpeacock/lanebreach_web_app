import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layouts";
import Home from "./components/Home";
import ComplaintForm from "./components/ComplaintForm";
import Submissions from "./components/Submissions";
import UserForm from "./components/UserForm";

const LayoutWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  return <Layout navigate={navigate}>{children}</Layout>;
};

const App = () => (
  <BrowserRouter>
    <LayoutWithNavigate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<ComplaintForm />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/user" element={<UserForm />} />
      </Routes>
    </LayoutWithNavigate>
  </BrowserRouter>
);

export default App;
