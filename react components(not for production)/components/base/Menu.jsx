import React from 'react'
import change_appearance_to from '../../general_functions'


export default () => {
    function close_menu() {
        change_appearance_to.initial('menu_screen')
        change_appearance_to.initial('menu')
    }
    return (
        <>
            <div id="menu_screen" className="initial_appearance">
                <div id="screen_to_onclick_event"
                    onClick={() => {
                        close_menu()
                    }}
                ></div>
                <div id="menu" className="initial_appearance">
                    <button id="menu_close_btn"
                        onClick={() => {
                            close_menu()
                        }}
                    > <img /> </button>
                    <div id="menu_items">
                        <a href="#">Visit my Website</a>
                        <a href="https://github.com/VitorFigm" target="_blank" rel="noopener noreferrer">Visit my github</a>
                        <a href="mailto:vitorfigmarques@hotmail.com">Contact me</a>
                    </div>
                </div>
            </div>
        </>)
}