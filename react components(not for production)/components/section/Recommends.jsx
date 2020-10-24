import React, { useState, useEffect } from 'react'

export default (props) => {
    const { product_list, product_list_change_to } = props
    ///loading
    let [loading_message, change_loading_message] = useState()
    let [product_boxes, show_product_boxes] = useState()
    useEffect(show_loading_if_needed, [product_list])
    useEffect(show_new_product_boxes, [product_list])
    return (<div className="product_container">
        {loading_message}
        {product_boxes}
    </div>
    )

    function show_loading_if_needed() {
        if (product_list !== 'loading')
            change_loading_message(undefined)  ///clear loading message
        else
            change_loading_message(<div id="loading_products">
                <h1>Loading...</h1>
            </div>)
    }

    function show_new_product_boxes() {
        if (product_list !== "loading") {
            const new_product_boxes = product_list.map((product, index) => (
                <span key={"span " + index}>
                    <a key={'product ' + index} className="product" href={product.url} target="_blank" rel="noopener noreferrer">
                        <img key={'img ' + index} src={product.image} id={product.image} alt={product.title} />
                        <div key={'product_content ' + index} id="product_content">
                            <div key={'name ' + index} className="name"
                                id={product.img + "_name"}>{
                                    product.title.slice(0, 60) + "..."}</div>
                            <div key={'price ' + index} className="price" id={product.img + "_price"}>${product.price}</div>
                        </div>
                    </a>
                </span>
            ))
            show_product_boxes(new_product_boxes)
        } else {
            show_product_boxes([])
        }
    }

}