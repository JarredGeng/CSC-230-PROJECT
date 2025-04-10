import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RedirectAfterConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('confirmation_token');

    if (token) {
      alert("Email confirmed! You can now log in.");
      navigate('/auth');
    }
  }, [location, navigate]);

  return null;
}
