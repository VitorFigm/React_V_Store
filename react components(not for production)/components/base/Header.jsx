import React from 'react'
import change_appearance_to from '../../general_functions'
import { request_products_with_search_bar } from '../../general_functions'

export default (props) => {
    const { product_list_change_to, saved_form_change_to,
        query_change_to, page_change_to, total_pages_change_to } = props

    return (
        <>
            <Header></Header>
            <Search></Search>
        </>

    )
    function onQuery() {
        const query = document.getElementById('search_input').value
        if (query != "") {
            close_search_bar()
            document.getElementById('recommendation').scrollIntoView()
            saved_form_change_to(undefined)
            query_change_to(query)
            product_list_change_to('loading')
            page_change_to(1)
            request_products_with_search_bar((worked, response) => {
                if (worked) {
                    const { products, pages_number } = response
                    product_list_change_to(products)
                    total_pages_change_to(pages_number)
                } else {

                }
            }, query)
        }
        function close_search_bar() {
            change_appearance_to.initial('search')
            change_appearance_to.initial('search_translucid_screen')
        }
    }

    function Header() {
        return (<header id="header" className="initial_appearance">
            <a href="/" id="logo"> </a>

            <div id="options_bellow_search">
                <a href="mailto:vitorfigmarques@hotmail.com" id="contact">Contact me</a>
            </div>

            <div id="header_btns">
                <button id="search_mobile_btn"
                    onClick={() => {
                        change_appearance_to.final('search')
                        change_appearance_to.final('search_translucid_screen')
                    }}></button>

                <button id="hamb"
                    onClick={() => {
                        change_appearance_to.final('menu_screen')
                        change_appearance_to.final('menu')
                    }}></button>
            </div>
        </header>)
    }

    function Search() {
        return (<>
            <div id="search_translucid_screen" className="initial_appearance"
                onClick={() => {
                    change_appearance_to.initial('search')
                    change_appearance_to.initial('search_translucid_screen')
                }}>
                <button id="search_close_btn"></button>
            </div>
            <div id="search" className="initial_appearance">
                <input type="text" id="search_input"
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') onQuery()
                    }}
                ></input>
                <button id="query_btn"
                    onClick={() => onQuery()}
                > <img /> </button>
            </div>
        </>)
    }


}