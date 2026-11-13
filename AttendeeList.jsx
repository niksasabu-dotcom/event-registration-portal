import axios from 'axios';

function AttendeeList({ attendees, onDelete }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/registrations/${id}`);
      onDelete();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const getBadgeClass = (type) => {
    if (type === 'VIP') return 'badge badge-vip';
    if (type === 'Student Pass') return 'badge badge-student';
    return 'badge badge-standard';
  };

  return (
    <div className="box">
      <div className="box-header">
        <h2>Registered Attendees</h2>
        <span className="count-pill">{attendees.length} Total</span>
      </div>

      {attendees.length === 0 ? (
        <div className="empty-state">
          <p>No registrations yet. Be the first to reserve a pass!</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Event</th>
                <th>Pass</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="user-name">{item.participant_name}</div>
                    <div className="user-email">{item.email}</div>
                  </td>
                  <td>{item.event_name}</td>
                  <td>
                    <span className={getBadgeClass(item.ticket_type)}>
                      {item.ticket_type}
                    </span>
                  </td>
                  <td>
                    <button className="del-btn" onClick={() => handleDelete(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendeeList;