import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";      
import { store } from "./store/store.js";  
import Layout from "./Layout.jsx";
import Main from "./components/Main/Main.jsx";
import "./index.css";
import LoginForm from "./components/ModalForm/LoginForm.jsx";
import SignupForm from "./components/ModalForm/SignupForm.jsx";
import Profile from "./components/Profile.jsx"; 
import AadharVerification from "./components/ModalForm/AadharVerification";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
// ✅ Create your router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/aadhaaverifying" element={<AadharVerification/>} />
      <Route path="/update-profile" element={<UpdateProfile/>} />
    </Route>
  )
);

// ✅ Wrap <RouterProvider> inside <Provider>
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
