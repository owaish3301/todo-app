import { useState } from "react";
import HeaderImage from "../components/authentication/HeaderImage";
import { Mail } from "lucide-react";
import Input from "../components/authentication/Input";
import SubmitButton from "../components/authentication/SubmitButton";
import { emailSchema } from "../utils/FormValidation";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import OtpOverlay from "../components/authentication/OtpOverlay";
import NewPasswordOverlay from "../components/authentication/NewPasswordOverlay";

function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [showOtpPage, setShowOtpPage] = useState(false);
    const [showNewPasswordPage, setShowNewPasswordPage] = useState(false);
    const [resetToken, setResetToken] = useState(null);

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setError(null);
        const emailValidation = emailSchema.safeParse(email);
        if(!emailValidation.success){
          setError(emailValidation.error.issues[0]?.message || "Invalid email");
          return;
        }

        setIsLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URI}auth/forgotPassword`,
          {
            method: "POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const jsonResponse = await response.json();
        
        if(jsonResponse.success){
          setShowOtpPage(true);
        }
        else{
          toast.error(jsonResponse.message);
        }

        setIsLoading(false);

    }
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
                isReset={true}
                setShowNewPasswordPage={setShowNewPasswordPage}
                setResetToken={setResetToken}
              />
            </div>
          </>
        )}
        {showNewPasswordPage && (
          <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-20" />

            <div className="w-4/5 absolute top-1/2 z-30 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-2xl rounded-2xl">
              <NewPasswordOverlay
                setShowNewPasswordPage={setShowNewPasswordPage}
                showNewPasswordPage={showNewPasswordPage}
                email={email}
                resetToken={resetToken}
              />
            </div>
          </>
        )}
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
                  <Mail
                    className="mr-3 text-[#7b86ff]"
                    width={24}
                    height={24}
                  />
                  <Input
                    type={"email"}
                    placeholder={"Enter Your Email"}
                    name={"email"}
                    value={email}
                    valueSetter={setEmail}
                  />
                </div>
                {error !== null && (
                  <div className="text-red-500 ml-4">{error}</div>
                )}

                <SubmitButton
                  text={isLoading ? <Loader /> : "Reset Password"}
                  label={"reset-password"}
                />
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default ForgotPassword;