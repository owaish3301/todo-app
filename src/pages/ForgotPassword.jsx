import { useState } from "react";
import HeaderImage from "../components/authentication/HeaderImage";
import { Mail } from "lucide-react";
import Input from "../components/authentication/Input";
import SubmitButton from "../components/authentication/SubmitButton";

function ForgotPassword(){
    const [email, setEmail] = useState("");
    const handleFormSubmit = (e)=>{
        e.preventDefault();
    }
    return (
      <div>
        <HeaderImage />
        <div className="bg-[#f8f8f8] pt-6 px-6 py-4 relative -top-5 rounded-t-3xl z-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold"> Reset Password </h1>
            <form
              className="w-full max-w-sm flex flex-col"
              onSubmit={handleFormSubmit}
            >
              <div className="mb-4 flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
                <Mail className="mr-3 text-[#7b86ff]" width={24} height={24} />
                <Input
                  type={"email"}
                  placeholder={"Enter Your Email"}
                  name={"email"}
                  value={email}
                  valueSetter={setEmail}
                />
              </div>
              <SubmitButton text={"Reset Password"} label={"reset-password"} />
            </form>
          </div>
        </div>
      </div>
    );
}

export default ForgotPassword;