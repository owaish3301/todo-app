function Input({type, placeholder, name, value, valueSetter}){
    return (
        <input
         className="w-full outline-none placeholder-gray-500" 
         type={type} 
         placeholder={placeholder} 
         name={name} 
         value={value}
         onChange={(e)=>{valueSetter(e.target.value)}}
         autoComplete="on"
        />
    )
}

export default Input;