import React, {InputHTMLAttributes} from 'react';
//{InputHTMLAttributes} = informa o React para inportar os atributos de tags HTML
//para que o usuário não tenha que incluir elas no InputProps

import './style.css';


//<HTMLInputElement> = informa quais elementos html vão ser informados nessa interface
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

//const = tipo
//Input = Nome da function component
// : React.FC = indica o tipo da function que no caso é Funcion Component
// <InputProps> = Indica os parâmetros que ele poderá receber
// ({parametros}) = indica os parametros da interface que a FC vai receber
// ...rest = rest operator indica que todo o resto das propriedades não informadas podem ser inseridas ali

const Input: React.FC<InputProps> = ({ label, name, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
        )
    }
    
export default Input;