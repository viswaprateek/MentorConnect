import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
          MentorConnect.vnrvjiet
        </Typography>
        <Link to="/login">
        <Button color="primary" variant="outlined">Login</Button>
        </Link>
        <Link to="/admin/login">
        <Button color="primary" variant="contained" sx={{ ml: 1 }}>Admin</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
