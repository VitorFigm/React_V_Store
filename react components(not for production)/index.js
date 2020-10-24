import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './resources/style.css'
///componenents
import Header from './components/base/Header'
import Menu from './components/base/Menu'
import Menu_filter from './components/base/Menu_filter'
import Section from './components/section/Section'
import Recommends from './components/section/Recommends'

import { request_home_page, request_brand_list } from './general_functions'


ReactDOM.render(
  <Store></Store>
  , document.getElementById('root'))


function Store() {
  ///states
  const [query, query_change_to] = useState('')
  const [product_list, product_list_change_to] = useState('loading')
  const [brand_list, brand_list_change_to] = useState([])
  const [total_pages, total_pages_change_to] = useState(1)
  const [page, page_change_to] = useState(1)
  const [saved_form, saved_form_change_to] = useState()

  const new_request_of_home_page = () => {
    const page_to_show = 1
    request_home_page(
      (worked, response = {}) => {
        if (worked) {
          const { products, pages_number } = response
          product_list_change_to(products)
          total_pages_change_to(pages_number)
        } else {

        }
      }, page_to_show)
  }
  window.addEventListener('load',
    () => {
      new_request_of_home_page()
      request_brand_list(
        (worked, brands) => {
          if (worked) {
            brand_list_change_to(brands)
          } else {

          }
        })
    })
  return (
    <>
      <div id="scroll" className="initial_appearance">V</div>
      <Header
        page_change_to={page_change_to}
        total_pages_change_to={total_pages_change_to}
        product_list_change_to={product_list_change_to}
        query_change_to={query_change_to}
        saved_form_change_to={saved_form_change_to}
      ></Header>

      <Menu_filter
        page_change_to={page_change_to}
        total_pages_change_to={total_pages_change_to}
        product_list_change_to={product_list_change_to}
        query={query}
        brand_list={brand_list}
        saved_form_change_to={saved_form_change_to}
      ></Menu_filter>

      <Menu></Menu>

      <Section
        product_list_change_to={product_list_change_to}
        page={page}
        total_pages={total_pages}
        total_pages_change_to={total_pages_change_to}
        page_change_to={page_change_to}
        query={query}
        query_change_to={query_change_to}
        saved_form={saved_form}
        saved_form_change_to={saved_form_change_to}
        new_request_of_home_page={new_request_of_home_page}
      >
        <Recommends
          product_list={product_list}
          product_list_change_to={product_list_change_to}
        />
      </Section>
    </>
  )
}
