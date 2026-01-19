import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  return <div>User Details Page - {id}</div>;
};

export default UserDetails;
