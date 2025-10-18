import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import HeaderImage from "../components/authentication/HeaderImage";
import SubmitButton from "../components/authentication/SubmitButton";
import ViewPassword from "../components/authentication/ViewPassword";
import Input from "../components/authentication/Input";

function SignIn() {
    const [viewPassword, setViewPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        console.log(email, password);
    }

  return (
    <div>
      <HeaderImage />
      <div className="bg-[#f8f8f8] pt-6 px-6 py-4 relative -top-5 rounded-t-3xl z-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold"> Sign In </h1>

          <form
            className="w-full max-w-sm flex flex-col"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-4 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-green-700">
              <Mail className="mr-3 text-[#7b86ff]" width={24} height={24} />
              <Input
               type={"email"}
               placeholder={"Enter Your Email"} 
               name={"email"} 
               value={email} 
               valueSetter={setEmail}
              />
            </div>

            <div className="mb-2 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-green-700">
              <Lock className="mr-3 text-[#7b86ff]" width={24} height={24} />
              <Input
               type={viewPassword ? "text" : "password"} 
               placeholder={"Enter Your Password"} 
               name={"password"}
               value={password}
               valueSetter={setPassword}
              />
              <ViewPassword viewPassword={viewPassword} setViewPassword={setViewPassword} />
            </div>

            <Link className="text-sm text-right text-[#7b86ff] mb-4" to={'/reset-password'}>
              Forgot Password?
            </Link>

            <SubmitButton text={"Sign In"} label={"SignIn"} />
          </form>

          <div className="h-[1px] w-1/3 bg-black"></div>

          <div className="">
            Don't have an account?{" "}
            <Link className="text-[#7b86ff]" to={'/signup'}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
