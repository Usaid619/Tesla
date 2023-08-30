// Declaring Variables
const body = document.querySelector("body")
const overlay = document.querySelector(".overlay")
const dropdown = document.querySelector(".drop-down")
const header = document.querySelector("header")
const logo = document.querySelector(".logo")
const navs = Array.from(document.querySelectorAll(".nav-link"))
const sideMenuBtn = document.querySelector("#ham-menu-btn")
// Flags
let check = 0

// Making Functions
    function stopScrolling(){
    body.style.overflow = "hidden"
    }
    function startScrolling(){
    body.style.overflow = "visible"
    }
    function adjustHeight(childHeight){
    dropdown.style.height = `${childHeight + 140}px`
    }
    function showContent(){
        const target = this.textContent.toLowerCase()
    
        const menuElem = Array.from(document.querySelectorAll(".menu-elem"))
        menuElem.forEach(elem =>{
            elem.style.visibility = "hidden"
            elem.style.opacity = "0"
        } )
        
        const activeMenuElem = document.querySelector(`.${target}`) 
        adjustHeight(activeMenuElem.offsetHeight)
        activeMenuElem.style.visibility = "visible"
        activeMenuElem.style.opacity = "1"
        overlay.style.visibility = "visible"
        overlay.style.opacity = "1"

        dropdown.classList.add("visible")

        if(dropdown.classList.contains("visible")){
            stopScrolling()
            logo.style.fill = "black"
            header.style.color = "black"

            dropdown.addEventListener("mouseleave",()=>{
                startScrolling()
                dropdown.classList.remove("visible")
                logo.style.fill = "white"
                header.style.color = "white"
                activeMenuElem.style.visibility = "hidden"
                activeMenuElem.style.opacity = "0"
                overlay.style.visibility = "hidden"
                overlay.style.opacity = "0"

            })

            logo.addEventListener("mouseenter",()=>{
               startScrolling()
                dropdown.classList.remove("visible")
                logo.style.fill = "white"
                header.style.color = "white"
                activeMenuElem.style.visibility = "hidden"
                activeMenuElem.style.opacity = "0"
                overlay.style.visibility = "hidden"
                overlay.style.opacity = "0"
            })
                
            
        } else{
            logo.style.fill = "white"
            header.style.color = "white"
        }
    }
    function addEventListeners(){
        console.log("added")
        navs.forEach((nav)=>{
            nav.addEventListener("mouseenter",showContent)
        }) 
    }
    function removeEventListeners(){
        console.log("removed Master")
        navs.forEach((nav)=>{
            nav.removeEventListener("mouseenter",showContent)
        }) 
    }
    function checkWidth(){
        if(window.innerWidth > 1200){
            header.style.visibility = "visible"
            header.style.opacity = "1"
            addEventListeners()
        } else{
            removeEventListeners()  
        }
    }
    
    function toggleMenu(){
    if(check == 0){
        stopScrolling()
        logo.style.fill = "black"
        header.style.visibility = "visible"
        header.style.opacity = "1"
        sideMenuBtn.textContent = "Close"
        
        check = 1
    }
    
    else{
        startScrolling()
        logo.style.fill = "white"
        header.style.visibility = "hidden"
        header.style.opacity = "0"
        sideMenuBtn.textContent = "Menu"
        
        check = 0
    }
    
    }

    sideMenuBtn.addEventListener("click",toggleMenu)

    checkWidth()
    window.addEventListener("resize",checkWidth)

// Gsap Animations
const tl = gsap.timeline()

function startAnimating(){
    tl
    .from(".item-name",{
        y: "40",
        opacity:0,
        duration: .6,
    })
    .from(".item-description",{
        y: "20",
        opacity:0,
        duration: .4,
    })
    .from(".btn:nth-child(1)",{
        x:-20,
        duration:.8,
        opacity:0
    },"a")
    .from(".btn:nth-child(2)",{
        x:20,
        duration:.8,
        opacity:0
    },"a")
}

window.addEventListener("load",startAnimating)

let stucks = gsap.utils.toArray(".stuck")

stucks.forEach(stuck=>{
    gsap.to(stuck,{
        opacity:0,
        scrollTrigger:{
            trigger: stuck,
            scroller: ".main",
            scrub:1,
            // markers:true,
            start: "top top",
            end: "40% top",
            pin:true
        }
    })
})

