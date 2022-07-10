import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const accessToken = localStorage.getItem('authToken');

      if (!accessToken) {
        Router.replace('/login');
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;
