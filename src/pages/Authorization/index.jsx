import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import axios from "axios";
import { login } from '../../store/authorizationSlice';


const theme = createTheme();

export default function LogInPage() {
    const dispatch = useDispatch()

    const { isAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        axios.post(`http://10.224.49.81:30100/api-token-auth/`, {
            "username": data.get('username'),
            "password": data.get('password')
        }).then(res => {
            dispatch(login(res.data.token))
            navigate('/')
        })

    };

    return (
        <div> {isAuth ?
            <Navigate to="/" />
            :
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        }
        </div>
    );
}


// axios.post(url, {
    //     //...data
    //   }, {
    //     headers: {
    //       ...
    //     }
    //   })

    // axios.get('http://10.224.49.81:30100/code', {
    // headers: {
    //     'Authorization': `token ca5c29290e45d36eda54cb8df54e26e99f69636b`
    // }
    // })
    // .then((res) => {
    // console.log(res.data)
    // })
    // .catch((error) => {
    // console.error(error)
    // })

    // const username = 'admin'
    // const password = 'admin'

    // const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    // const url = 'https://...'
    // const data = {
    // ...
    // }

    // axios.post(url, {
    // headers: {
    //     'Authorization': `Basic ${token}`
    // },
    // })