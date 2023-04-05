import { useState} from "react";
import { signInWithGooglePopup, 
        signInAuthUserWithEmailAndpasssword, 
    } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-Input/form-Input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";


const defaultformFields = {
    email:"",
    password: "",
}
const SignInForm = () => {
    const [formFields, setforrmFields] = useState(defaultformFields);
    const {email, password} = formFields;

   

    const handleChange = (event) => {
        const {name, value} = event.target
        setforrmFields({...formFields, [name]: value})
    }
    console.log(formFields)

    const resetFormFields = () => {
        setforrmFields()
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
       
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

           await signInAuthUserWithEmailAndpasssword(email,password);
          
            resetFormFields();
        } catch (error) {
            switch(error.code) {
               case 'auth/wrong-password':
                alert('Wrong password for email');
                break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                break;
                default:
                    console.log(error)
            }
        }
    }

    return (

        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

            
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

            
            <div className="buttons-container">
                <Button type="submit">sign in</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle} >Google sign in</Button>
            </div>
            </form>
        </div>
    )
}

export default SignInForm;