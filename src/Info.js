import React from 'react'
import styled from 'styled-components'

function Info({Place,Day,Active,Total,Resolved,Deaths}) {
    return (
       <Container>
          <span style={{alignSelf: 'center'}}>{Place}</span> 
           <span>Cases Today: {Day}</span> 
           <span>Active: {Active}</span> 
           <span>Total Cases: {Total}</span> 
           <span>Resolved: {Resolved}</span> 
           <span>Deaths: {Deaths}</span> 
           



       </Container>
    )
}
const Container = styled.div`
display:flex;
flex-direction: column;
border-radius: 20px;
background-color: white;
border: 3px solid red;
margin: 20px;

&>span{
    padding:20px;
    font-weight: 600;
    font-size: 1.7rem;
}
`

const Province = styled.span`
align-self: center;

`
export default Info
