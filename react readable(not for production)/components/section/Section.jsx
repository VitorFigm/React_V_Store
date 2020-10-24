import React, { useState, useEffect } from 'react'
import change_appearance_to, { request_products_with_filters, request_home_page } from '../../general_functions'

export default (props) => {
    const { page, total_pages, total_pages_change_to,
        query,query_change_to, product_list_change_to,
        saved_form, new_request_of_home_page, saved_form_change_to, page_change_to } = props

    const tag_to_go_to_previous_page = () => {
        if (page === 1) return (<button className="inactivated"> {'<'} </button>)
        else return (<button className="prev_page" onClick={() => go_to_page(page - 1)}> {'<'} </button>)
    }
    const tag_to_go_to_next_page = () => {
        if (page === total_pages) return (<button className="inactivated"> {'>'} </button>)
        else return (<button className="next_page" onClick={() => go_to_page(page + 1)}> {'>'} </button>)
    }

    function go_to_page(go_to) {
        document.getElementById('recommendation').scrollIntoView();
        product_list_change_to('loading')
        page_change_to(go_to)
        if (query === "" && saved_form == undefined) {
            request_home_page(
                (worked, response = {}) => {
                    if (worked) {
                        const { products, pages_number } = response
                        product_list_change_to(products)
                        total_pages_change_to(pages_number)
                    } else {

                    }
                }, go_to)
        } else {
            request_products_with_filters(
                (worked, response = {}) => {
                    if (worked) {
                        const { products, pages_number } = response
                        product_list_change_to(products)
                        total_pages_change_to(pages_number)
                    } else {
                    }
                }, go_to, query, saved_form)
        }
    }
    const [recommend_message, recommend_message_change_to] = useState(get_new_recommend_message())
    useEffect(
        () => {
            recommend_message_change_to(get_new_recommend_message())
        }
        , [saved_form, query])

    function get_new_recommend_message() {
        let message = []
        if (query !== "") message.push(<h1 id="results_title" key='1'>Results for"{query}"</h1>)
        if (saved_form !== undefined) {
            translate_form_value_to_the_message()
        }
        if (message.length !== 0) {
            message.push(<a key="6" id="clear_filters_btn" onClick={() => {
                new_request_of_home_page()
                saved_form_change_to(undefined)
                query_change_to("")
            }}>Clear</a>)
            return message
        } else
            return (<h1 id="results_title">{'Highest Rated'}</h1>)

        function translate_form_value_to_the_message() {
            const sort_by = saved_form.elements['sort_by'].value
            if (sort_by != "Better ratings") message.push(<h2 key='2'> sorted by {sort_by} </h2>)
            const brand = saved_form.elements['brand'].value
            if (brand !== 'All') message.push(<p key='3'> only {brand} phones </p>)
            const minimum_price = saved_form.elements['minimum_price'].value
            if (minimum_price !== "") message.push(<p key='4'>minimum price is {minimum_price}</p>)
            const maximum_price = saved_form.elements['maximum_price'].value
            if (maximum_price !== "") message.push(<p key='5'>maximum price is {maximum_price}</p>)
        }
    }
    return (
        <section>
            <div className="container" id="intro">
                <h1>Hi, welcome to the V store, </h1>
                <p>A cellphone shop simulator</p>
            </div>
            <div className="blank_interval"></div>
            <div id="recommendation" className="container">
                <div className="blank_interval"></div>
                {recommend_message}
                {props.children}
                <div id="page">
                    {tag_to_go_to_previous_page()}
                    <div>Page {page} of {total_pages} </div>
                    {tag_to_go_to_next_page()}
                </div>
                <h1>Help to find a cellphone</h1>
                <div id="find_a_cell"
                    onClick={() => {
                        change_appearance_to.final('menu_filter_screen')
                        change_appearance_to.final('menu_filter')
                    }}>find with filters</div>
                <div className="blank_interval"></div>
            </div>
        </section>

    )
}