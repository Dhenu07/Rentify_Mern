import React, { useState,useEffect } from 'react';
import '../Styles/LoginSignUp.css';
import { RiUserFill } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
function LoginSignUp() {
    const navigate = useNavigate();
    const [data,setData]=useState({firstName:"",lastName:"",email:"",password:"",mobile:"",role:""})
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('');
    const [emailValidation, setEmailValidation] = useState({ isValid: null, message: '' });
    const [passwordValidation, setPasswordValidation] = useState({ isValid: null, message: '' });
    const [FirstNameValidation, setFirstNameValidation] = useState({ isValid: null, message: '' });
    const [LastNameValidation, setLastNameValidation] = useState({ isValid: null, message: '' });
    const [mobileValidation, setMobileValidation] = useState({ isValid: null, message: '' });
    const [roleValidation, setRoleValidation] = useState({ isValid: null, message: '' });
    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);
        setEmailValidation({ isValid: null, message: '' });
        setPasswordValidation({ isValid: null, message: '' });
        setFirstNameValidation({ isValid: null, message: '' });
        setLastNameValidation({ isValid: null, message: '' });
        setMobileValidation({ isValid: null, message: '' });
        setRoleValidation({ isValid: null, message: '' });
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setMobile('');
        setRole('');
    };
    useEffect(() => {
        const tokenExpiration = setTimeout(() => {
        localStorage.removeItem('JWT');
        }, 3600000);

        return () => clearTimeout(tokenExpiration);
    }, []);
    const validateEmail = (value) => {
        const isValid = /^[^\s@]+@[^\s@]+\.(com|in|ac\.in)$/.test(value);
        const message = isValid ? 'Correct' : 'Invalid email address';
        setEmailValidation({ isValid, message });
    };

    const validatePassword = (value) => {
        const isValid = value.length >= 6;
        const message = isValid ? 'Correct' : 'Password should be at least 6 characters';
        setPasswordValidation({ isValid, message });
    };

    const validateFirstName = (value) => {
        const isValid = /^[a-zA-Z]+$/.test(value);
        const message = isValid ? 'Correct' : 'Username should contain only letters';
        setFirstNameValidation({ isValid, message });
    };
    
    const validateLastName = (value) => {
        const isValid = /^[a-zA-Z]+$/.test(value);
        const message = isValid ? 'Correct' : 'Username should contain only letters';
        setLastNameValidation({ isValid, message });
    };

    const validateMobile = (value) => {
        const isValid = /^\d{10}$/.test(value);
        const message = isValid ? 'Correct' : 'Invalid mobile number';
        setMobileValidation({ isValid, message });
    };
    const validateRole = (value) => {
        const isValid = value.trim() !== '';
        const message = isValid ? 'Correct' : 'Please select a role';
        setRoleValidation({ isValid, message });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(isLoginForm){
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:4000/auth/login',data)
        .then((res)=>{
            if(res.status===200){
                console.log(res.data)
                alert("Login Successful");
                const {_id,email,role}=res.data.user;
                console.log(email);
                localStorage.setItem('userId',_id);
                if(role==='User'){
                    navigate('/');
                }
                else if(role==='Seller'){
                    navigate('/');
                }
            }
        })
        .catch(err=>console.log(err))
        setEmail('');
        setEmailValidation({ isValid: null, message: '' });
        setPassword('');
        setPasswordValidation({ isValid: null, message: '' });
        }
        else{
            if (role.trim() === '') {
                setRoleValidation({ isValid: false, message: 'Please select a role' });
                return;
            }
            axios.post('http://localhost:4000/auth/signup',data)
            .then((res)=>{
                if(res.status===201){
                    alert(`Hi ${firstName}! Registration successful! Redirecting to Login...`)
                    window.location.reload();
                    // navigate('/loginRegister')
                }
                else{
                    alert("Unexpected error: " + res.status);
                }
            })
            .catch(err=>console.log(err))
            setEmail('');
            setEmailValidation({ isValid: null, message: '' });
            setPassword('');
            setPasswordValidation({ isValid: null, message: '' });
            setFirstName('');
            setLastName('');
            setFirstNameValidation({ isValid: null, message: '' });
            setLastNameValidation({ isValid: null, message: '' });
            setMobile('');
            setMobileValidation({ isValid: null, message: '' });
            setRole('');
            setRoleValidation({ isValid: null, message: '' });
        }

    };

    
    return (
        <div>
        <style>{`
            body {
            overflow-y: hidden;
            }
        `}</style>
        {isLoginForm ? (
            <div>
            <div className='login-container'>
                <div className='login-inputs'>
                <form onSubmit={handleSubmit}>
                    <h2 className='login-header'>Sign In</h2>
                    <input type='text' placeholder='Email' className='login-email' value={email} onChange={(e) => {setEmail(e.target.value);validateEmail(e.target.value);setData({...data,email:e.target.value})}}/><MdEmail size={22} className='login-register-icon1'/>
                    <span className={`validation-message ${emailValidation.isValid === true ? 'valid' : emailValidation.isValid === false ? 'invalid' : ''}`}>{emailValidation.message}</span>
                    <input type='password' placeholder='Password' className='login-password' value={password} onChange={(e) => {setPassword(e.target.value); validatePassword(e.target.value);setData({...data,password:e.target.value})}} /><IoMdLock size={22} className='login-register-icon2'/>
                    <span className={`validation-message ${passwordValidation.isValid === true ? 'valid' : passwordValidation.isValid === false ? 'invalid' : ''}`}>{passwordValidation.message}</span>
                    <input type='submit' className='login-submit' value='Login'/>
                </form>
                </div>
                <div className='login-optionals'>
                <div className='forget-password'>Forget Password</div>
                <div className='no-account'>Don't have an account?<p className='login-to-register' onClick={handleToggleForm}>Register</p>
                </div>
                </div>
            </div>
            </div>
        ) : (
            <div>
            <div className='register-container'>
            <div className='register-inputs'>
                <form onSubmit={handleSubmit}>
                <h2 className='register-header'>Sign Up</h2>
                <input type='text' placeholder='FirstName' className='register-username' value={firstName} onChange={(e) => { setFirstName(e.target.value);validateFirstName(e.target.value);setData({...data,firstName:e.target.value})}}/><RiUserFill size={22} className='login-register-icon3'/>
                <span className={`validation-message ${FirstNameValidation.isValid === true ? 'valid' : FirstNameValidation.isValid === false ? 'invalid' : ''}`}>{FirstNameValidation.message}</span>
                <input type='text' placeholder='LastName' className='register-username' value={lastName} onChange={(e) => { setLastName(e.target.value);validateLastName(e.target.value);setData({...data,lastName:e.target.value})}}/><RiUserFill size={22} className='login-register-icon4'/>
                <span className={`validation-message ${LastNameValidation.isValid === true ? 'valid' : LastNameValidation.isValid === false ? 'invalid' : ''}`}>{LastNameValidation.message}</span>
                <input type='text' placeholder='Email' className='register-email' value={email} onChange={(e) => {setEmail(e.target.value);validateEmail(e.target.value);setData({...data,email:e.target.value})}}/><MdEmail size={22} className='login-register-icon5'/>
                <span className={`validation-message ${emailValidation.isValid === true ? 'valid' : emailValidation.isValid === false ? 'invalid' : ''}`}>{emailValidation.message}</span>
                <input type='password' placeholder='Password' className='register-password' value={password}onChange={(e) => {setPassword(e.target.value);validatePassword(e.target.value);setData({...data,password:e.target.value})}}/><IoMdLock size={22} className='login-register-icon6'/>
                <span className={`validation-message ${passwordValidation.isValid === true ? 'valid' : passwordValidation.isValid === false ? 'invalid' : ''}`}>{passwordValidation.message}</span>
                <input type='tel'placeholder='Mobile'className='register-mobile'value={mobile}onChange={(e) => {setMobile(e.target.value);validateMobile(e.target.value);setData({...data,mobile:e.target.value})}}/><MdLocalPhone size={22} className='login-register-icon7'/>
                <span className={`validation-message ${mobileValidation.isValid === true ? 'valid' : mobileValidation.isValid === false ? 'invalid' : ''}`}>{mobileValidation.message}</span>
                <select name="role" id="role" className='register-role' value={role} onChange={(e) => { setRole(e.target.value); validateRole(e.target.value);setData({...data,role:e.target.value})}}>
                    <option value="">Select Role</option>
                    <option value="Seller">Seller</option>
                    <option value="User">User</option>
                </select>
                <span className={`validation-message ${roleValidation.isValid === true ? 'valid' : roleValidation.isValid === false ? 'invalid' : ''}`}>{roleValidation.message}</span>
                <input type='submit' className='register-submit' value='Register'/>
                </form>
            </div>
            <div className='register-optionals'>
                <div className='have-account'>Already have an account?<p className='register-to-login' onClick={handleToggleForm}>Login</p>
                </div>
            </div>
            </div>
            </div>
        )}
        </div>
    );
}

export default LoginSignUp;
