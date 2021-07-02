import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Info from './Info'
function Home() {

const [info,updateInfo] = useState([])
const today = new Date();
const yesterday = new Date();
const CanadaInfo = {}
yesterday.setDate(yesterday.getDate() -3);

    useEffect(()=> {
        console.log(yesterday.toISOString().slice(8,10))
        fetch("https://api.covid19api.com/live/country/canada/status/confirmed/date/"+yesterday.toISOString().slice(0,10))
        .then(res => res.json())
        .then(data => {
            updateInfo(data)})
            console.log(info)
        },[])

        const checkDates = (d) =>{
            const z = d.Date.slice(0,10)
            return z===today.toISOString().slice(0,10);
        }
        
        const getCasesToday = (z)=>{
            const found = info.filter(a => a.Date.slice(8,10)!==today.getDate() && a.Date.slice(8,10)!==today.getDate()-1).find(lol => lol.Province===z.Province)
            return z.Confirmed-found.Confirmed;
        
        
        }

        const getCanadaInfo = (param) =>{
            let total =0
           
            if (param==='Day'){

                info.filter(i => i.Date.slice(0,10) === today.toISOString().slice(0,10)).forEach(a => total += getCasesToday(a))

            }
            else {            info.filter(i => i.Date.slice(0,10) === today.toISOString().slice(0,10)).forEach(a => total += a[param])}

            return total
        }
        


    return (
        <Container>
            <h1>Info is from: RIGHT NOW</h1>

            <Info 
             Place="Canada"
             Day = {getCanadaInfo(`Day`)}
             Active = {getCanadaInfo(`Active`)}
             Total= {getCanadaInfo(`Confirmed`)}
             Resolved= {getCanadaInfo(`Recovered`)}
             Deaths= {getCanadaInfo(`Deaths`)}
             
             />
            <Main>
          


        {info.filter(checkDates).
        sort((a,b) => {return b.Active - a.Active} ).
        map(z =>  

    <Info 
    Day = {getCasesToday(z)}
    Place={z.Province}
    Active ={z.Active}
    Total= {z.Confirmed}
    Resolved={z.Recovered}
    Deaths={ z.Deaths}
/>
        

        )}
        
           

            </Main>


        </Container>
    )
}





 









const Container = styled.div`
display:flex;
width:100vw;
min-height:100vh;
flex-direction: column;
justify-content: center;
align-items: center;
`




const Main = styled.div`
box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24);
display:grid;
grid-template-columns: repeat(4,1fr);
grid-auto-rows: minmax(300px,1fr);
border-radius: 10px;

@media (max-width:768px){
 grid-template-columns: 1fr;
}
`

export default Home
