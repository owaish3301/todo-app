function SubmitButton({text, label}){
    return (
      <button
        type="submit"
        aria-label={label}
        className="mt-4 bg-[#7b86ff] py-2 rounded-xl text-white font-bold shadow-xl w-full"
      >
        {text}
      </button>
    );
}

export default SubmitButton;