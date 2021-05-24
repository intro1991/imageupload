import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="http://code.ktl.re.kr:3100">
        KTL LAS TEAM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
