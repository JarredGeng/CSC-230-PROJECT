import { Link } from 'react-router-dom';
// import './Sidebar.css';

const Sidebar = ({ role }) => { 
  return (
    <div className="sidebar">
      <h2>{role === 'admin' ? 'Admin' : 'Student'} Panel</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posters">Posters</Link></li>
          {role === 'admin' && <li><Link to="/manage-users">Manage Users</Link></li>}
          {role === 'student' && <li><Link to="/posterform">Submit Poster</Link></li>}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
