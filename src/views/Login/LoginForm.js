import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/styles';
import { FormControlLabel, InputAdornment, IconButton, TextField, Checkbox, Link, Grid, Box } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(5, 0, 2),
    marginTop: '30'
  },
  divLoading: {
    marginTop: theme.spacing(16)
  }
}));

export default function LoginForm({ formik }) {
  const classes = useStyles();
  const { errors, touched, values, isSubmitting, handleSubmit, handleChange, getFieldProps } = formik;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} className={classes.form}>
        <TextField
          required
          fullWidth
          label="사번(AD)"
          autoFocus
          {...getFieldProps('employeeId')}
          error={Boolean(touched.employeeId && errors.employeeId)}
          helperText={touched.employeeId && errors.employeeId}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          required
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="Password(AD)"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={Boolean(touched.password && errors.password) || errors.afterSubmit === 'auth/wrong-password'}
          helperText={
            (touched.password && errors.password) ||
            (errors.afterSubmit === 'auth/wrong-password' && '사번 또는 패스워드를 확인하세요.')
          }
        />
        <Box sx={{ mb: 3 }} />
        <FormControlLabel
          control={
            <Checkbox
              {...getFieldProps('remember')}
              checked={values.remember}
              onChange={(e) => {
                handleChange(e);
                if (values.remember) {
                  localStorage.removeItem('remember_Id');
                }
              }}
            />
          }
          label="Remember me"
        />
        <LoadingButton className={classes.submit} type="submit" fullWidth variant="contained" pending={isSubmitting}>
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Don&apos;t have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

/*
export default function LoginForm() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(
    !!localStorage.getItem('remember_Id')
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleChangeRemeber = (event) => {
    setIsRememberMe(event.target.checked);
    if (isRememberMe) localStorage.removeItem('remember_Id');
  };

  if (loading) {
    return (
      <div className={classes.divLoading}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        id: localStorage.getItem('remember_Id')
          ? localStorage.getItem('remember_Id')
          : '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().required('Id is required'),
        password: Yup.string().required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmittion }) => {
        try {
          setLoading(true);
          //await dispatch(login(values.id, values.password));
          if (isRememberMe) {
            localStorage.setItem('remember_Id', values.id);
          }
          history.push('/home');
          //toast.success('환영합니다.');
        } catch (error) {
          const message =
            (error.response && error.response.data.message) ||
            '알수없는 오류 발생 (BackendServer Down?)';
          //toast.error(message);
          setLoading(false); // todo memory leak

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmittion(false);
        }
      }}
    >
      {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            spellCheck="false"
            required
            fullWidth
            id="id"
            label="사번(AD)"
            onBlur={handleBlur}
            value={values.id}
            onChange={handleChange}
            name="id"
            autoComplete="id"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password(AD)"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRememberMe}
                onChange={handleChangeRemeber}
                color="primary"
                name="isRememberMe"
              />
            }
            label="Remember me"
          />
          <LoadingButton
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            pending={isSubmitting}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
*/
