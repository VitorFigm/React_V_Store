import React, { useEffect, useState } from 'react'
import change_appearance_to from '../../general_functions'
import { request_products_with_filters } from '../../general_functions'


export default (props) => {
    const { query, brand_list,
        saved_form_change_to,
        product_list_change_to, page_change_to, total_pages_change_to } = props

    window.addEventListener('load',
        () => {
            const menu_filter = document.getElementById('menu_filter')
            menu_filter.onsubmit = function (e) {
                e.preventDefault()
                const form = this
                const { is_a_valid_form } = handles_form_incoherences()
                if (is_a_valid_form) {
                    close_form()
                    page_change_to(1)
                    saved_form_change_to(undefined)
                    document.getElementById('recommendation').scrollIntoView();
                    product_list_change_to('loading')
                    const go_to_page = 1
                    request_products_with_filters((worked, response) => {
                        if (worked) {
                            const { products, pages_number } = response
                            product_list_change_to(products)
                            saved_form_change_to(form)
                            total_pages_change_to(pages_number)
                        } else {
                        }
                    }, go_to_page, query, form)
                }

                function close_form() {
                    change_appearance_to.initial('menu_filter_screen')
                    change_appearance_to.initial('menu_filter')
                }

                function handles_form_incoherences() {
                    let is_a_valid_form = true;
                    const higher_price = form.elements['maximum_price'].value
                    const lower_price = form.elements['minimum_price'].value
                    if (lower_price > higher_price) {
                        document.getElementById('error_msg').innerHTML = "Price min needs to be lower than Price max"
                        change_appearance_to.final('error_msg_box')
                        is_a_valid_form = false
                    }
                    return { 'is_a_valid_form': is_a_valid_form }
                }
            }
        }
    )

    const [options_of_brand, options_of_brand_change_to] = useState(<option disabled>loading...</option>)

    useEffect(() => {
        if (brand_list.lenght !== 0) {
            options_of_brand_change_to(get_brand_option_tags())
        }

        function get_brand_option_tags() {
            return brand_list.map(
                (brand, index) => <option key={"brand" + index} value={brand}>{brand}</option>
            )
        }

    }, [brand_list])

    return (
        <div id="menu_filter_screen" className="initial_appearance">
            <div id="menu_filter_onclick"
                onClick={() => {
                    change_appearance_to.initial('menu_filter_screen')
                    change_appearance_to.initial('menu_filter')
                }}
            ></div>
            <button className="filter_close_btn"
                onClick={() => {
                    change_appearance_to.initial('menu_filter_screen')
                    change_appearance_to.initial('menu_filter')
                }} />
            <form id="menu_filter" className="initial_appearance">
                <label htmlFor="sort_by"> Filter for: </label>
                <select name="sort_by" className="menu_filter_spaces">
                    <option defaultValue="better ratings">
                        better ratings
                    </option>
                    <option defaultValue="lower prices">
                        lower prices
                    </option>
                    <option defaultValue="higher pricse">
                        higher prices
                     </option>
                </select>
                <label htmlFor="brand"> Brand: </label>
                <select name="brand" className="menu_filter_spaces" id="filter_brands">
                    <option defaultValue="all" >All</option>
                    {options_of_brand}
                </select>
                <label htmlFor="minimum_price">Price min</label>
                <input type="number" name="minimum_price" className="menu_filter_spaces" />
                <label htmlFor="maximum_price">Price max</label>
                <input type="number" name="maximum_price" className="menu_filter_spaces" />
                <input type="hidden" name="query" defaultValue={query} />
                <input type="submit" defaultValue="Filter" id="submit_btn" />
                <div id="error_msg_box" className="initial_appearance">
                    <div id="error_msg"></div>
                    <button type="button" className="filter_close_btn"
                        onClick={() => {
                            change_appearance_to.initial('error_msg_box')
                        }}
                    />
                </div>
            </form>
        </div>
    )
}