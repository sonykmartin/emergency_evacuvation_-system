import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebase_config";
import { uploadDP } from "./authFunctions";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const [selectedDp, setSelectedDp] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] =
    useState(false);
  const storage = getStorage();
  
  // New loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userInfo = {
      email: newEmail,
      employID: getValues("employID"),
     
      name: getValues("name")
    };
  
  }, [newEmail, getValues("employID"), getValues("name")]);

  const showToast = (message, type) => {
    type === "success" ? toast.success(message) : toast.error(message);
  };

  const LoadingDialog = () => (
    <div className="loading-dialog">
      <p>Please wait while registering...</p>
    </div>
  );

  const onSubmit = async (data) => {
    if (!selectedDp) {
      showToast('Please upload a profile picture', 'error');
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      const dpUrl = await uploadDP(data.name, selectedDp);

    
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        phone: data.mobNo,
        department: data.department,
      employID: data.employID,
       
        dpUrl: dpUrl,
      
        isAdmin: false
      });

      //showToast(Registration Successful! Name: ${data.name}, Mess No: ${data.messNo}, Department: ${data.department}, Role: ${selectedRole}, 'success');

      reset();

      // Navigate to the profile page
      navigate('/profile');

    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.code === 'auth/email-already-in-use'
        ? 'Email is already in use.'
        : error.message || 'An unknown error occurred';
      //showToast(Registration Failed: ${errorMessage}, 'error');
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  };

  const selectProfilePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          setSelectedDp(canvas.toDataURL("image/jpeg"));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="register-page">
      {isLoading && <LoadingDialog />}
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="avatar-container">
          {selectedDp ? (
            <img src={selectedDp} alt="👤" className="avatar" />
          ) : (
            <div className="empty-avatar-container">
              <span>Upload DP</span>
            </div>
          )}
        </div>

        <div className="avatar-container">
          <input
            type="file"
            accept="image/*"
            onChange={selectProfilePicture}
            className="file-input"
          />
        </div>

        <input
          {...register("name", {
            required: "Please enter your name",
            pattern: /^[a-zA-Z\s]+$/,
          })}
          placeholder="Name"
          className="input-field"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <input
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="Email"
          className="input-field"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <div className="input-wrapper">
          <input
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="input-field"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            
          </button>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            {...register("rePassword", {
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            type={isReEnterPasswordVisible ? "text" : "password"}
            placeholder="Re-enter Password"
            className="input-field"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setIsReEnterPasswordVisible(!isReEnterPasswordVisible)}
          >
           
          </button>
          {errors.rePassword && (
            <span className="error">{errors.rePassword.message}</span>
          )}
        </div>

        <input
          {...register("department", {
            required: "Please enter your department",
          })}
          placeholder="Department"
          className="input-field"
        />
        {errors.department && (
          <span className="error">{errors.department.message}</span>
        )}

        <input
          {...register("mobNo", {
            required: "Please enter your mobile number",
            minLength: {
              value: 10,
              message: "Mobile number must be 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Mobile number must be 10 digits",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Mobile number must be numeric",
            },
          })}
          placeholder="Mob No"
          className="input-field"
        />
        {errors.mobNo && <span className="error">{errors.mobNo.message}</span>}

        <input
          {...register("employID", {
            required: "Please enter your mess no",
          })}
          type="text"
          placeholder="Employee ID"
          className="input-field"
        />
        {errors.employID && (
          <span className="error">{errors.employID.message}</span>
        )}

       
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>

     
    </div>
  );
};

export default RegisterPage;
