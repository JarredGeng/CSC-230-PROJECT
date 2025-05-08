import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <h2>{role === 'admin' ? 'Admin' : 'Student'} Panel</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {role === 'student' && <>
            <li><Link to="/studentdash/posterform">Submit Poster</Link></li>
            <li><Link to="/studentdash/inreview">In Review</Link></li>
          </>}
          {role === 'admin' && <>
            <li><Link to="/admindash/reviewqueue">Review Queue</Link></li>
            <li><Link to="/admindash/manage-users">Manage Users</Link></li>
          </>}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
