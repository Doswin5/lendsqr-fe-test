import { useNavigate } from "react-router-dom";
import type { UserStatus } from "../../types/user";
import "./UsersActions.scss";

type Props = {
  userId: string;
  status: UserStatus;
  onActivate: () => void;
  onBlacklist: () => void;
  onClose: () => void;
};

const UsersActions = ({ userId, onActivate, onBlacklist, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="usersActions" onMouseDown={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => {
          navigate(`/users/${userId}`);
          onClose();
        }}
      >
        <img src="/action-icon.svg" alt="" />
        View Details
      </button>

      <button
        type="button"
        onClick={() => {
          onBlacklist();
          onClose();
        }}
      >
        <img src="/action2-icon.svg" alt="" />
        Blacklist User
      </button>

      <button
        type="button"
        onClick={() => {
          onActivate();
          onClose();
        }}
      >
        <img src="/action3-icon.svg" alt="" />
        Activate User
      </button>
    </div>
  );
};

export default UsersActions;
