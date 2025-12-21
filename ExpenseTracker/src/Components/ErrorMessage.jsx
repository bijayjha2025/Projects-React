
function ErrorMessage({message, onClose}){
    return(
        <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slideIn z-50">
          <span className="font-medium">{message}</span>
          <button onClick={onClose} className="text-white hover:text-gray-200 font-bold text-xl">×</button>
        </div>
    );
}

export default ErrorMessage