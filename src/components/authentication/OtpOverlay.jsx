import { useState } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function OtpOverlay({ showOtpPage, setShowOtpPage, email }) {
  //TODO: loading
  const [otpVal, setOtpVal] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    //TODO: error handling
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URI}auth/verifyOtp`,{
      method:"POST",
      credentials:"include",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email,otp:otpVal})
    });
    const jsonResponse = await response.json();
    if(jsonResponse.success){
      toast.success(jsonResponse.message);
      navigate("/home");
    }
    else{
      toast.error(jsonResponse.message);
    }
  };



  return (
    <div className="bg-[#f8f8f8] p-8 h-full w-full rounded-2xl">
      <button className="fixed right-4 top-4" onClick={()=>setShowOtpPage(!showOtpPage)}>
        <CircleX color={"#7b86ff"} size={30} />
      </button>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold"> Verification Code </h1>
        <p className="text-sm">
          We sent a 6 digit code to your email address please check & enter your
          code.
        </p>
        <form
          className="w-full max-w-sm flex flex-col"
          onSubmit={handleFormSubmit}
        >
          <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <Input
              type={"number"}
              placeholder={"Enter Otp"}
              name={"otp"}
              value={otpVal}
              valueSetter={setOtpVal}
            />
          </div>
          <SubmitButton text={"Verify OTP"} label={"verify-otp"} />
        </form>
        <p>
          Didn't receive the code?{" "}
          <button
            className="text-[#7b86ff] font-semibold"
            onClick={() => {
              console.log("hit resend button");
            }}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}

export default OtpOverlay;