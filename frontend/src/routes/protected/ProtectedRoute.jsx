import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element:Component, ...props }) {
  const { isLoggedIn } = props;

  return isLoggedIn ? Component : <Navigate to={'signin'} replace={true}/>;
}

export default ProtectedRoute;
