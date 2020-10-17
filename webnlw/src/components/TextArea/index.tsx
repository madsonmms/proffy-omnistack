import React, {TextareaHTMLAttributes} from 'react';
//{InputHTMLAttributes} = informa o React para inportar os atributos de tags HTML
//para que o usuário não tenha que incluir elas no InputProps

import './style.css';


//<HTMLInputElement> = informa quais elementos html vão ser informados nessa interface
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
}

//const = tipo
//Textarea = Nome da function component
// : React.FC = indica o tipo da function que no caso é Funcion Component
// <TextareaProps> = Indica os parâmetros que ele poderá receber
// ({parametros}) = indica os parametros da interface que a FC vai receber
// ...rest = rest operator indica que todo o resto das propriedades não informadas podem ser inseridas ali

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
        )
    }
    
export default Textarea;