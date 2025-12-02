import HeaderImage from "../components/authentication/HeaderImage";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";

import SubmitButton from "../components/authentication/SubmitButton";
import ViewPassword from "../components/authentication/ViewPassword";
import Input from "../components/authentication/Input";
import { nameSchema, passwordSchema, emailSchema } from "../utils/FormValidation";
import OtpOverlay from "../components/authentication/OtpOverlay";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function SignUp(){
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConfirmPassword, setConfirmViewPassword] = useState(false);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({"name":null,"email":null, "password":null});
    const [showOtpPage, setShowOtpPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const isCorrect = formErrorHandler();
        if(!isCorrect){
          return;
        }
        setIsLoading(true);

        const response = await fetch(`${import.meta.env.VITE_API_URI}auth/signup`,{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({name:user,email,password})
        });

        const jsonResponse = await response.json();
        setIsLoading(false);
        if(jsonResponse.success){
          setShowOtpPage(true);
        }
        else{
          toast.error(jsonResponse.message)
        }
        
    }

    const formErrorHandler = () => {
      // Reset errors first
      let newErrors = { name: null, email: null, password: null };

      const nameValidation = nameSchema.safeParse(user.trim());
      const emailValidation = emailSchema.safeParse(email);
      const passwordValidation = passwordSchema.safeParse(password);

      let isValid = true;

      if (!nameValidation.success) {
        // zod returns issues array, take first message
        newErrors.name = nameValidation.error.issues[0]?.message || "Invalid name";
        isValid = false;
      }

      if (!emailValidation.success) {
        newErrors.email = emailValidation.error.issues[0]?.message || "Invalid email";
        isValid = false;
      }

      if (!passwordValidation.success) {
        newErrors.password = passwordValidation.error.issues[0]?.message || "Invalid password";
        isValid = false;
      }

      // confirm password match
      if (password && confirmPassword && password !== confirmPassword) {
        newErrors.password = "Passwords do not match";
        isValid = false;
      }

      setError(newErrors);

      return isValid;
    }

    return (
      <>
      {showOtpPage && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-20" />

          <div className="w-4/5 absolute top-1/2 z-30 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl rounded-2xl">
            <OtpOverlay showOtpPage={showOtpPage} setShowOtpPage={setShowOtpPage} email={email} isReset={false} />
          </div>
        </>
      )}

      <div className={showOtpPage ? "pointer-events-none select-none" : ""}>
        <HeaderImage />
        <div className="bg-[#f8f8f8] pt-6 px-6 py-4 relative -top-5 rounded-t-3xl z-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold"> Sign Up </h1>

            <form
              className="w-full max-w-sm flex flex-col"
              onSubmit={handleFormSubmit}
            >
              <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
                <Mail className="mr-3 text-[#7b86ff]" width={24} height={24} />
                <Input
                  type={"text"}
                  placeholder={"Enter Your Name"}
                  name={"name"}
                  value={user}
                  valueSetter={setUser}
                />
              </div>
              {error.name !== null && (
                <div className="text-red-500 ml-4">{error.name}</div>
              )}

              <div className="mt-4 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
                <Mail className="mr-3 text-[#7b86ff]" width={24} height={24} />
                <Input
                  type={"email"}
                  placeholder={"Enter Your Email"}
                  name={"email"}
                  value={email}
                  valueSetter={setEmail}
                />
              </div>
              {error.email !== null && (
                <div className="text-red-500 ml-4">{error.email}</div>
              )}

              <div className="mt-4 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
                <Lock className="mr-3 text-[#7b86ff]" width={24} height={24} />
                <Input
                  type={viewPassword ? "text" : "password"}
                  placeholder={"Password"}
                  name={"password"}
                  value={password}
                  valueSetter={setPassword}
                />
                <ViewPassword
                  viewPassword={viewPassword}
                  setViewPassword={setViewPassword}
                />
              </div>

              <div className="mt-2 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
                <Lock className="mr-3 text-[#7b86ff]" width={24} height={24} />
                <Input
                  type={viewConfirmPassword ? "text" : "password"}
                  placeholder={"Confirm Password"}
                  name={"password"}
                  value={confirmPassword}
                  valueSetter={setConfirmPassword}
                />

                <ViewPassword
                  viewPassword={viewConfirmPassword}
                  setViewPassword={setConfirmViewPassword}
                />
              </div>
              {error.password !== null && (
                <div className="text-red-500 ml-4">{error.password}</div>
              )}

              <SubmitButton text={isLoading? <Loader /> :"Sign Up"} label={"SignUp"} />
            </form>

            <div className="h-[1px] w-1/3 bg-black"></div>

            <div className="">
              Already have an account?{" "}
              <Link className="text-[#7b86ff]" to={"/signin"}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}

export default SignUp;