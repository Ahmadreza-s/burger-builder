import React from 'react';
import styles from './Input.module.css';

const input = props => {
    const inputClasses = [styles.InputElement];
    let errorMsg = null;
    if (!props.valid &&  props.touched) {
        inputClasses.push(styles.Invalid);
        errorMsg = <p className={styles.ValidationError}>{props.validation.errorMsg}</p>;
    }
    let inputElm = null;
    switch (props.elementType) {
    case ('input'):
        inputElm = <input onBlur={props.onBlur}
                          onChange={props.changed}
                          className={inputClasses.join(' ')}
                          {...props.elementConfig}
                          defaultValue={props.value}/>;
        break;
    case('textarea'):
        inputElm = <textarea onChange={props.changed}
                             onBlur={props.onBlur}
                             className={inputClasses.join(' ')}
                             {...props.elementConfig}
                             defaultValue={props.value}/>;
        break;
    case('select'):
        inputElm = (
            <select onChange={props.changed}
                    onBlur={props.onBlur}
                    className={inputClasses.join(' ')}
                    value={props.value}>
                {props.elementConfig.options.map(option => (<option key={option.value}
                                                                    value={option.value}>
                    {option.displayValue}</option>))}
            </select>
        );
        break;
    default:
        inputElm = <input onChange={props.changed}
                          className={inputClasses.join(' ')}
                          {...props.elementConfig}
                          defaultValue={props.value}/>;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElm}
            {errorMsg}
        </div>
    );
};

export default React.memo(input, shouldReRender);

function shouldReRender(prevProps, nextProps) {
    if (prevProps.touched !== nextProps.touched)
        return false;
    else if (prevProps.valid !== nextProps.valid)
        return false;
    else if (prevProps.value !== nextProps.value)
        return false;
    else
        return true;

}
