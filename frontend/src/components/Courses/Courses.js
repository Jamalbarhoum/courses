import React from 'react'
import Cord from '../Cord/Cord'
import { Container } from 'react-bootstrap'

function Courses() {
  return (
 <Container>
 <div style={{display:"flex",width:"100%" ,justifyContent:"center",alignItems:"center" ,gap:"10px",marginTop:"20px",flexWrap:"wrap"}}>
 <Cord/>
 </div>

 </Container>
  )
}

export default Courses