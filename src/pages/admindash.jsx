import Sidebar from '../Components/sidebar';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role="admin" />
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
        <h1>Welcome to the Admin Dashboard 🛠️</h1>
        <p>You can manage users, review posters, and more.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
