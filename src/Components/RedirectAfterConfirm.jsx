import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function RedirectAfterConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('confirmation_token');

    if (token) {
      // Automatically login using confirmation token
      axios.post("http://localhost:5000/api/confirm", { token })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
          // TODO: role logic if needed
          navigate("/student-dashboard"); // or check if they are admin
        })
        .catch((err) => {
          console.error("Confirmation login failed:", err);
          navigate("/auth");
        });
    }
  }, [location, navigate]);

  return null;
}
