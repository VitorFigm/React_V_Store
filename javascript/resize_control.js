window.higher_resolution = window.innerWidth > 700

window.addEventListener('resize',()=>{
    const changed_resolution = this.innerWidth > 700 !== window.higher_resolution 
    if(changed_resolution){
        close_search_and_header()
        close_translucid_screen()
    }
    
    function close_search_and_header(){
        change_appearance_to_initial('search');
        change_appearance_to_initial('header');
    }
    function close_translucid_screen(){
        change_appearance_to_initial('search_translucid_screen')
    }
    ///save screeen state
    window.higher_resolution = window.innerWidth > 700
})