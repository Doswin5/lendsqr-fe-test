import { useNavigate } from "react-router-dom";
import "./UsersActions.scss";

type Props = {
  userId: string;
  onClose: () => void;
};

const UsersActions = ({ userId, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="usersActions" onMouseDown={(e) => e.stopPropagation()}>
      <button
        type="button"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          navigate(`/users/${userId}`);
          onClose();
        }}
      >
        <img src="/action-icon.svg" alt="" />
        View Details
      </button>

      <button type="button" onMouseDown={(e) => e.stopPropagation()}>
        <img src="/action2-icon.svg" alt="" />
        Blacklist User
      </button>

      <button type="button" onMouseDown={(e) => e.stopPropagation()}>
        <img src="/action3-icon.svg" alt="" />
        Activate User
      </button>
    </div>
  );
};

export default UsersActions;
