
function ErrorMessage({message, onClose}){
    return(
        <div>
          <span>{message}</span>
          <button onClick={onClose}></button>
        </div>
    );
}

export default ErrorMessage