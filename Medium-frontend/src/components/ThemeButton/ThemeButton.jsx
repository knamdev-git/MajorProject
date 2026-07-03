import React from 'react'
import { useState } from 'react'
const ThemeButton = ({buttonValue="Light", theme, setTheme}) => {

    const [value, setValue] = useState(buttonValue ? 'Light' : 'Dark')

    const changeTheme = () => {

        if(theme === "bg-light text-black"){
            setTheme("bg-black text-white")
            setValue("Dark")
        }
        else{
            setTheme("bg-light text-black")
            setValue("Light")
        }
        // debugger;
        //     console.log("Changing theme");
        //     setTheme(!buttonValue);
        //     let button = document.getElementsByClassName('themebutton');

        //     if (buttonValue === true) {
        //         console.log("Inside true function");    
        //         button[0].classList.remove('bg-white', 'text-black');
        //         button[0].classList.add('bg-black', 'text-white');
        //         setTheme('bg-dark', 'text-white'); // This is the value that will be sent to the parent component (Header.jsx) and then to App.jsx
        //         setValue('Dark');
        //         console.log("Your current theme value is : ", value);
        //     } else {
        //         console.log("Inside false function");
        //         button[0].classList.remove('bg-black', 'text-white');
        //         button[0].classList.add('bg-white', 'text-black');
        //     setTheme('bg-light', 'text-black'); // This is the value that will be sent to the parent component (Header.jsx) and then to App.jsx
        //     setValue('Light');
        //     console.log("Your current theme value is : ", value);
        // }
    }

    return (
        <div>
            <button onClick={changeTheme} className='themebutton active:scale-95 hover:cursor-pointer rounded-full px-2'>{value}</button>
        </div>
    )
}

export default ThemeButton
