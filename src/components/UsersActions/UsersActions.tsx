import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UsersActions.scss";

type Props = {
  userId: string;
  onClose: () => void;
};

const UsersActions = ({ userId, onClose }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [onClose]);

  return (
    <div className="usersActions" ref={ref}>
      <button onClick={() => navigate(`/users/${userId}`)}>
        View Details
      </button>
      <button>Blacklist User</button>
      <button>Activate User</button>
    </div>
  );
};

export default UsersActions;
