import { useState } from "react";
import { createAuthUserWithEmailAndpasssword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-Input/form-Input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultformFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}
const SignUpForm = () => {
    const [formFields, setformFields] = useState(defaultformFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target
        setformFields({...formFields, [name]: value})
    }
    

    const resetFormFields = () => {
        setformFields()
    }

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndpasssword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code !== 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {

                console.log('user creation encountered an error', error)
            }
        }
    }

    return (

        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
           
            <FormInput
                label='Display Name'
                type="text" 
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName} 
            />

            
            <FormInput
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}
            />

           
            <FormInput
                label='Password' 
                type="password" 
                required onChange={handleChange} 
                name="password" 
                value={password}
            />

    
            <FormInput
                label="Confirm Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
             />
            

            <Button type="submit">sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;