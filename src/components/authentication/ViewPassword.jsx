import { EyeOff, Eye } from "lucide-react";

function ViewPassword({viewPassword,setViewPassword}) {
  return (
    <button
      type="button"
      aria-label={viewPassword ? "Hide password" : "Show password"}
      onClick={() => setViewPassword((v) => !v)}
    >
      {viewPassword ? <Eye /> : <EyeOff />}
    </button>
  );
}

export default ViewPassword;