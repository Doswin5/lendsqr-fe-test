import "./UsersFilter.scss";

type Props = {
  onClose: () => void;
};

const UsersFilter = ({ onClose }: Props) => {
  return (
    <div className="usersFilter">
      <div className="usersFilter__field">
        <label>Organization</label>
        <select>
          <option>Select</option>
        </select>
      </div>

      <div className="usersFilter__field">
        <label>Username</label>
        <input placeholder="User" />
      </div>

      <div className="usersFilter__field">
        <label>Email</label>
        <input placeholder="Email" />
      </div>

      <div className="usersFilter__field">
        <label>Date</label>
        <input type="date" />
      </div>

      <div className="usersFilter__field">
        <label>Status</label>
        <select>
          <option>Select</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
          <option>Blacklisted</option>
        </select>
      </div>

      <div className="usersFilter__actions">
        <button className="usersFilter__reset" type="button">
          Reset
        </button>
        <button className="usersFilter__apply" type="button" onClick={onClose}>
          Filter
        </button>
      </div>
    </div>
  );
};

export default UsersFilter;
