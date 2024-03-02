import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../Components/FormContainer';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo } = userLogin;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    useEffect(() => {
        if (userInfo && userInfo.is_active && (userInfo.is_instructor || userInfo.is_student)) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))  
        // ung una nag if statement ngayon need lang is dispatch den need ng e.preventDefault para hindi mag direct agad kahit mali
    }

    // Handle request password change
    const handleRequestPasswordChange = () => {
        navigate('/request-changepass');
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to='/register'>Register</Link>
                </Col>
                <Col>
                    <Button variant='link' onClick={handleRequestPasswordChange}>
                        Forgot password?
                    </Button>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
