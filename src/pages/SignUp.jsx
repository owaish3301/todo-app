import HeaderImage from "../components/authentication/HeaderImage";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import SubmitButton from "../components/authentication/SubmitButton";
import ViewPassword from "../components/authentication/ViewPassword";
import Input from "../components/authentication/Input";
import { Link } from "react-router";

function SignUp(){
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConfirmPassword, setConfirmViewPassword] = useState(false);
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({"name":null,"email":null, "password":null});

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        const isCorrect = formErrorHandler();
        if(!isCorrect){
          return;
        }

    }

    const formErrorHandler = () => {
      if ( user.trim().length === 0 ){
        setError(prev => ({...prev, name : "Name can't be empty"}))
        return false;
      }
      else{
        setError(prev=>({...prev, name:null}))
      }
      
    }

    return (
      <div>
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
                  name={"confirmPassword"}
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

              <SubmitButton text={"Sign Up"} label={"SignUp"} />
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
    );
}

export default SignUp;