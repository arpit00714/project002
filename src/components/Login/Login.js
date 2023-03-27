import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val, isValid: action.val.includes('@')
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }

}

const passwordReducer = (state, action) => {

  if (action.type === 'USER_INPUT') {
    return {
      value: action.val, isValid: action.val.trim().length > 6
    }
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }

}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [collegeName, setCollegeName] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null })


  // useEffect(() => {
  //   console.log("Effect running");

  //   return () => {
  //     console.log("effect cleanup");
  //   };
  // }, []);

  useEffect(() => {
  //   setFormIsValid(
  //     enteredPassword.trim().length > 6 &&     enteredEmail.includes('@') && collegeName.trim().length > 6
  //   );
  // }, [enteredEmail, enteredPassword, collegeName])
    let timer = setTimeout(() => {
        console.log('Checking form validity')
      setFormIsValid(
        passwordState.isValid && emailState.isValid && collegeName.trim().length > 2
      );
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [emailState.isValid,passwordState.isValid, collegeName])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);

    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value
    })
// setFormIsValid(
//     event.target.value.trim().length > 6 && emailState.isValid && collegeName.trim().length > 6
//   )
  };

  const collegeNameHandler = (event) => {
    setCollegeName(event.target.value);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid.includes("@"));
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
   // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type: 'INPUT_BLUR'
    });
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(collegeName.trim().length > 2);
  };

  const submitHandler = (event) => {
    event.preventDefault();
     props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          </div>
          <div
            className={`${classes.control} ${
              collegeIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="college">College</label>
            <input
              type="text"
              id="college"
              value={collegeName}
              onChange={collegeNameHandler}
              onBlur={validateCollegeHandler}
            />
          </div>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
