import {Nav, Navbar, NavbarBrand,NavLink} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavDropdown } from "react-bootstrap";
import logo from "./logo.svg";
import {Link} from "react-router-dom";
import './App.css';

import $ from "jquery";
import { matchRoutes, useLocation } from "react-router-dom"



const routes = [{path:"/drilldownjqgrid"},

{ path: "/indiacovidMap" },
 { path: "/maps" },
 { path: "/heatmap" },
 
{ path: "/reg" },{ path: "/" },{ path: "/reg/:id" },{ path: "/chart" },{path: "/wordCloud"},{path:"/countryPop"},{path:'/csvUpDown'},{path:'/dragNdrop'}]

const useCurrentPath = () => {
  const location = useLocation()
  const [{ route }] = matchRoutes(routes, location)

  return route.path
}

const displayElement=()=>{
  
  $(".sid").hide();
  
}
const removeElement=()=>{
  
  $(".sid").show();
  
}

const Header = () =>{

// var current = document.getElementsByClassName("active");
//   if (current.length > 0) {
//     current[0].className = current[0].className.replace("active", "");
//   }



  const currentPath = useCurrentPath();
if(currentPath.match("^.*(csvUpDown).*$")){

  removeElement();
}
else{
  displayElement();
}
  
  return(
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
<NavbarBrand className="p-3" >

<img src={logo} width="40px" height="40px" alt="Logo" />Admin
</NavbarBrand>

<NavbarToggle></NavbarToggle>
<NavbarCollapse>
<Nav activeKey={currentPath}>
  {/* <Link to ="/users">Users</Link>
  
  <NavLink><Link to ="/users">Users</Link></NavLink>
  */}

 {/* <NavLink

className={ currentPath==="/"? "active" : "inactive " }


 eventKey="2"

  as={Link}

 to="/"> Users</NavLink> */}
{/* 
 <NavLink
 
 className={ currentPath==="/reg"? "active" : "inactive" }

 eventKey="1"


 as={Link}


to="/reg"> New User Registration</NavLink> */}
 {/* <NavLink
 
 className={ currentPath==="/chart"? "active" : "inactive" }

  eventKey="3"


 as={Link}


to="/chart">Charts</NavLink> */}
{/* 
<NavLink
 
  className={ currentPath==="/wordCloud"? "active" : "inactive" }
 
   eventKey="4"
 
 
  as={Link}
 
 
 to="/wordCloud">Word Cloud</NavLink> */}
{/*
    <Link to="/reg"> New User Registration</Link>
  */}
{/*   
<NavLink
 
 className={ currentPath==="/countryPop"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/countryPop">Country Population</NavLink> */}


{/* <NavLink
 
 className={ currentPath==="/csvUpDown"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/csvUpDown">Csv Upload Download</NavLink> */}


{/* <NavLink
 
 className={ currentPath==="/dragNdrop"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/dragNdrop">DragNDrop</NavLink> */}

{/* 
  <NavLink
 
 className={ currentPath==="/maps"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/maps">Map</NavLink>    */}

{/* <NavLink
 
 className={ currentPath==="/drilldownjqgrid"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/drilldownjqgrid">DDJQgrid</NavLink>
 */}

<NavDropdown title="Menu 1" id="basic-nav-dropdown">
              <NavDropdown.Item className={ currentPath==="/drilldownjqgrid"? "active" : "inactive" }

eventKey="1"


href="/drilldownjqgrid">DDJQgrid</NavDropdown.Item>
              
              <NavDropdown.Divider />
              
              <NavDropdown.Item  
 className={ currentPath==="/maps"? "active" : "inactive" }

  eventKey="2"


 as={Link}


to="/maps">Map</NavDropdown.Item>
<NavDropdown.Divider />
              
              <NavDropdown.Item  
 className={ currentPath==="/dragNdrop"? "active" : "inactive" }

 eventKey="3"


as={Link}


to="/dragNdrop">DragNDrop</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item  
 
 className={ currentPath==="/countryPop"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/countryPop">Country Population</NavDropdown.Item>

<NavDropdown.Divider />
<NavDropdown.Item  
 
 className={ currentPath==="/csvUpDown"? "active" : "inactive" }

  eventKey="4"


 as={Link}


to="/csvUpDown">Csv Upload Download</NavDropdown.Item>

<NavDropdown.Divider />
<NavDropdown.Item  
 
 className={ currentPath==="/wordCloud"? "active" : "inactive" }
 
 eventKey="4"


as={Link}


to="/wordCloud">Word Cloud</NavDropdown.Item>

<NavDropdown.Divider />
<NavDropdown.Item  
 
 className={ currentPath==="/chart"? "active" : "inactive" }

  eventKey="3"


 as={Link}


to="/chart">Charts</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item  
 
 className={ currentPath==="/reg"? "active" : "inactive" }

 eventKey="1"


 as={Link}


to="/reg"> New User Registration</NavDropdown.Item>

<NavDropdown.Divider />
<NavDropdown.Item  
 
className={ currentPath==="/"? "active" : "inactive " }


eventKey="2"

 as={Link}

to="/"> Users</NavDropdown.Item>




            </NavDropdown>

            
<NavDropdown title="Menu 2" id="basic-nav-dropdown">
              <NavDropdown.Item className={ currentPath==="/heatmap"? "active" : "inactive" }

eventKey="1"


as={Link}

to="/heatmap">HeatMap</NavDropdown.Item>
              
              <NavDropdown.Divider />
              
              <NavDropdown.Item className={ currentPath==="/indiacovidMap"? "active" : "inactive" }

eventKey="1"


as={Link}

to="/indiacovidMap">India Covid Heatmap</NavDropdown.Item>
              
              </NavDropdown>

</Nav>
</NavbarCollapse>




    </Navbar>
  )

}


export default Header;
