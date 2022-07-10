import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Styles from './backButton.module.scss';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      onClick={() => router.back()}
      className={Styles.btn}
    >
      Go Back
    </Button>
  );
};

export default BackButton;
