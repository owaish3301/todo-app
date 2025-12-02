import Input from "./Input";
import ViewPassword from "./ViewPassword";
import { CircleX } from "lucide-react";
import SubmitButton from "./SubmitButton";
import { passwordSchema } from "../../utils/FormValidation";
import { useState } from "react";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function NewPasswordOverlay({ setShowNewPasswordPage, showNewPasswordPage, email, resetToken }) {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewNewConfirmPassword, setViewNewConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = formErrorHandler();
    if(!isValid) return;
    setIsLoading(true);

    const response = await fetch(
          `${import.meta.env.VITE_API_URI}auth/updatePassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password:newPassword, resetToken }),
          }
        );

        const jsonResponse = await response.json();
        
        if(jsonResponse.success){
          toast.success(jsonResponse.message);
          navigate("/home");
        }
        else{
          toast.error(jsonResponse.message);
        }

        setIsLoading(false);
  };

  const formErrorHandler = () => {
    setError(null);
    let isValid = true;
    const passwordValidation = passwordSchema.safeParse(newPassword);
    if (!passwordValidation.success) {
      setError(passwordValidation.error.issues[0]?.message || "Invalid password");
      isValid = false;
    }
    if (newPassword && newConfirmPassword && newPassword !== newConfirmPassword) {
      setError("Passwords do not match");
      isValid = false;
    }
    return isValid;
  }

  return (
    <div className="bg-[#f8f8f8] p-8 h-full w-full rounded-2xl">
      <button
        className="fixed right-4 top-4"
        onClick={() => setShowNewPasswordPage(!showNewPasswordPage)}
      >
        <CircleX color={"#7b86ff"} size={30} />
      </button>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold"> Reset Password </h1>

        <form
          className="w-full max-w-sm flex flex-col"
          onSubmit={handleFormSubmit}
        >
          <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <Input
              type={viewNewPassword ? "text" : "password"}
              placeholder={"New password"}
              name={"newPassword"}
              value={newPassword}
              valueSetter={setNewPassword}
            />
            <ViewPassword
              viewPassword={viewNewPassword}
              setViewPassword={setViewNewPassword}
            />
          </div>
          <div className="flex mt-2 items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm focus-within:border-[#7b86ff]">
            <Input
              type={viewNewConfirmPassword ? "text" : "password"}
              placeholder={"Confirm new password"}
              name={"newConfirmPassword"}
              value={newConfirmPassword}
              valueSetter={setNewConfirmPassword}
            />
            <ViewPassword
              viewPassword={viewNewConfirmPassword}
              setViewPassword={setViewNewConfirmPassword}
            />
          </div>
          {error !== null && <div className="text-red-500 ml-4">{error}</div>}
          <SubmitButton
            text={isLoading ? <Loader /> : "Update Password"}
            label={"verify-otp"}
          />
        </form>
      </div>
    </div>
  );
}

export default NewPasswordOverlay;
