import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return(
    <Typography>
      <Paper elevation={10}>
        <Box
          backgroundColor="#aefdd8"
          sx={{ flexGrow: 1, display: { xs: 'flex' }}}
          px={{ xs: 3, sm: 10}}
          py={{ xs: 5, sm: 10}}
          mt={{ xs: 5, sm: 10}}
        >
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>
                  Help
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Contact
                  </Link>
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Support
                  </Link>
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Privacy Policy
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>
                  Account
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Login
                  </Link>
                </Box>
                <Box>
                  <Link to={"/register"} style={{ textDecoration: 'none', color: 'black' }}>
                    Register
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>
                  About
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Blog
                  </Link>
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Careers
                  </Link>
                </Box>
                <Box>
                  <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>
                    Community Guidelines
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Box textAlign="Center" pt={{ xs: 5, sm: 10 }} pb={{ xs:5, sm:0 }}>
              NIFTYHEADS &reg; {new Date().getFullYear()}
            </Box>
          </Container>
        </Box>
      </Paper>
      </Typography>
  )
}
