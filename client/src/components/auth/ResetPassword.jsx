import React, { useEffect, useState } from 'react' 
import { useResetPasswordMutation } from '../../redux/api/userApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const [resetPassword, { isLoading, error, isSuccess }] = useResetPasswordMutation();
   

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); 
        }
    
        if (error) {
            toast.error(error?.data.message);
        }
        
        if (isSuccess) {
            toast.success("Password reset successfully");
            navigate(0); 
        }
    }, [error, isSuccess, isAuthenticated]); 

    const submitDetails = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const data = { password, confirmPassword };
        resetPassword({ token: params?.token, body: data });
    };

    return (
        <form method="post" className="loginForm" onSubmit={submitDetails}>
            <h5>Reset Password</h5>
            <div className="loginFields">
                <div className="userInput">
                    <input
                        type="password"
                        className="username"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="passwordWrapper">
                    <input
                        type="password"
                        className="username"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Resetting password... please wait" : "Reset Password"}
                </button>
            </div>
        </form>
    );
}
