import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Container, CardContent, Card, CardMedia } from '@material-ui/core';
import images from 'src/assets/images/mainImage';
import { AuthLogo } from 'src/assets/icons/Icons';
import LoginForm from './LoginForm';
import Copyright from './Copyright';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { MIconButton } from 'src/components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router-dom';

const randomNum = Math.floor(Math.random() * 6) + 1;

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column'
  },
  con: {
    padding: 0,
    height: '100%',
    width: '100%'
  },
  card: {
    height: '100%',
    width: '100%',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(8),
      maxWidth: '30%',
      flexBasis: '30%',
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    }
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    maxWidth: '70%',
    flexBasis: '70%',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  typo: {
    fontWeight: '1000',
    marginTop: theme.spacing(7),
    fontSize: '40px'
  }
}));

export default function Login() {
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    employeeId: Yup.string().required('사원번호는 필수입니다.'),
    password: Yup.string().required('비밀번호는 필수입니다.')
  });

  const formik = useFormik({
    initialValues: {
      employeeId: localStorage.getItem('remember_Id') ? localStorage.getItem('remember_Id') : '',
      password: '',
      remember: localStorage.getItem('remember_Id') ? true : false
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        navigate('/upload');
      } catch (error) {
        resetForm();
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.response.data.message });
        }
      }
    }
  });

  const saveRememberMe = (employeeId) => {
    localStorage.setItem('remember_Id', employeeId);
  };
  return (
    <Container className={classes.con} maxWidth={false}>
      <Card className={classes.card}>
        <CardMedia className={classes.image} image={images[randomNum]} />
        <CardContent className={classes.content}>
          <AuthLogo />
          <Typography className={classes.typo} variant="h4">
            Sign in
          </Typography>
          <LoginForm formik={formik} />
          <Box mt={5}>
            <Copyright />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
