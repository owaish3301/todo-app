import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import HeaderImage from "../components/authentication/HeaderImage";
import SubmitButton from "../components/authentication/SubmitButton";
import ViewPassword from "../components/authentication/ViewPassword";
import Input from "../components/authentication/Input";
import {
  passwordSchema,
  emailSchema,
} from "../utils/FormValidation";
import OtpOverlay from "../components/authentication/OtpOverlay";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function SignIn() {
    const [viewPassword, setViewPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState({email:null, password:null})
    const [showOtpPage, setShowOtpPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        const isCorrect = formErrorHandler();
        if (!isCorrect) {
          return;
        }

        setIsLoading(true);
        try{
          const response = await fetch(`${import.meta.env.VITE_API_URI}auth/signin`,{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email,password})
          });

          const jsonResponse = await response.json();

          setIsLoading(false);

          if (jsonResponse.success) {
            if(!jsonResponse.user.verified){
              toast.error(jsonResponse.message);
              setShowOtpPage(true);
            }
            else{
              toast.success(jsonResponse.message);
              navigate("/home");
            }
          } else {
            toast.error(jsonResponse.message);
          }
        }
        catch{
          toast.error("An internal error occured")
          setIsLoading(false)
        }
    }

    const formErrorHandler = () => {
      // Reset errors first
      let newErrors = { email: null, password: null };

      const emailValidation = emailSchema.safeParse(email);
      const passwordValidation = passwordSchema.safeParse(password);

      let isValid = true;

      if (!emailValidation.success) {
        newErrors.email =
          emailValidation.error.issues[0]?.message || "Invalid email";
        isValid = false;
      }

      if (!passwordValidation.success) {
        newErrors.password =
          passwordValidation.error.issues[0]?.message || "Invalid password";
        isValid = false;
      }

      setError(newErrors);

      return isValid;
    };


  return (
    <>
      {showOtpPage && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-20" />

          <div className="w-4/5 absolute top-1/2 z-30 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl rounded-2xl">
            <OtpOverlay
              showOtpPage={showOtpPage}
              setShowOtpPage={setShowOtpPage}
              email={email}
            />
          </div>
        </>
      )}
      <div>
        <HeaderImage />
        <div className="bg-[#f8f8f8] pt-6 px-6 py-4 relative -top-5 rounded-t-3xl z-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold"> Sign In </h1>

            <form
              className="w-full max-w-sm flex flex-col"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-2 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
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
                <div className="text-red-500 ml-4 mb-2">{error.email}</div>
              )}

              <div className="mb-2 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
                <Lock className="mr-3 text-[#7b86ff]" width={24} height={24} />
                <Input
                  type={viewPassword ? "text" : "password"}
                  placeholder={"Enter Your Password"}
                  name={"password"}
                  value={password}
                  valueSetter={setPassword}
                />
                <ViewPassword
                  viewPassword={viewPassword}
                  setViewPassword={setViewPassword}
                />
              </div>
              {error.password !== null && (
                <div className="text-red-500 ml-4">{error.password}</div>
              )}

              <Link
                className="text-sm text-right text-[#7b86ff] mb-4 w-max ml-auto"
                to={"/reset-password"}
              >
                Forgot Password?
              </Link>

              <SubmitButton text={isLoading? <Loader /> :"Sign In"} label={"SignIn"} />
            </form>

            <div className="h-[1px] w-1/3 bg-black"></div>

            <div className="">
              Don't have an account?{" "}
              <Link className="text-[#7b86ff]" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
