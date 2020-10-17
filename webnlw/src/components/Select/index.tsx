import React, {SelectHTMLAttributes} from 'react';
//{InputHTMLAttributes} = informa o React para inportar os atributos de tags HTML
//para que o usuário não tenha que incluir elas no InputProps

import './style.css';


//<HTMLInputElement> = informa quais elementos html vão ser informados nessa interface
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

//const = tipo
//Select = Nome da function component
// : React.FC = indica o tipo da function que no caso é Funcion Component
// <SelectProps> = Indica os parâmetros que ele poderá receber
// ({parametros}) = indica os parametros da interface que a FC vai receber
// ...rest = rest operator indica que todo o resto das propriedades não informadas podem ser inseridas ali

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })};
            </select>
        </div>
        )
    }
    

    /*-- percorre o option e adciona uma tag para cada item percorrido
    O "option.value" é necessário para que o map possa identificar os itens de maneira
    única.
    {options.map(option => {
        return <option key={option.value} value={option.value}>{option.label}</option>
    })};
    */
export default Select;