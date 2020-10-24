//definitions
window.scroll_position_before = this.scrollY

//scroll function
window.onscroll = (e) => {  
    this.scrollY !==0? change_appearance_to_final('scroll'):change_appearance_to_initial('scroll')
    if(client_scrolled_up()||this.scrollY==0 ){
        if(client_window_is_big()){
            open_header_and_search_bar()
        }else{
            open_mobile_header()
        }
    }else{ ///scroll down
        if(client_window_is_big()){
            close_header_and_search_bar()
        }else{
            close_mobile_header()
        }
    }

    function close_header_and_search_bar(){
        change_appearance_to_final('search')
        change_appearance_to_final('header')
    }
    function close_mobile_header(){
        change_appearance_to_final('header')
    }
    function open_header_and_search_bar(){
        change_appearance_to_initial('search')
        change_appearance_to_initial('header')
    }
    function open_mobile_header(){
        change_appearance_to_initial('header')
    }
    function client_window_is_big(){
        return this.innerWidth >=700
    }
    function client_scrolled_up(){
        return this.scrollY<=this.scroll_position_before
    }
    //save position
    window.scroll_position_before = this.scrollY

}
