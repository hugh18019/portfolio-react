import { useState } from 'react';
import { useRouter } from 'next/router';

function Login() {

    const [formState, setFormState] = useState({ email: '', password: ''});
    
    const [login, { error }] = useMutation(LOGIN);

    var handleChange = event => {
        const { name, value } = event.target;

        setFormState({ 
            ...formState,
            [name]: value
        })
    }

    var handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const loginRes = await login({
                variables: {email: formState.email, password: formState.password }
            });
            
            console.log("loginRes", loginRes);
        }
        catch (error) {
            console.log("Could not log in");
            console.log(error);
        }

    }

    useEffect(() => {
        console.log('formState', formState);
    }, [formState])

    return (
        <div>
            <div className="form-container">
                <form className="form">
                    <label>
                        email
                        <input className="form-input" type="text" name="email" value={formState.email} onChange={handleChange}/>
                    </label>
                    <label>
                        password
                        <input className="form-input" type="password" name="password" value={formState.password} onChange={handleChange}/>
                    </label>
                    <button type="submit" className="custom-button" onSubmit={handleSubmit} >login</button>
                </form>
            </div>

            <Link to = '/signup' className="sign-up-text">
                Signup Instead
            </Link>
        </div>
    );

}

export default Login;