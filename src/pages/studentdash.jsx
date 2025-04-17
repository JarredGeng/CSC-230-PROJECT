import Sidebar from '../Components/sidebar';

const StudentDashboard = () => {
  return (
    <div style={{ marginLeft: '220px', padding: '20px' }}>
      <Sidebar role="student" />
      <h1>Welcome to the Student Dashboard 🎓</h1>
      <p>You can submit your posters and view others.</p>
    </div>
  );
};

export default StudentDashboard;
