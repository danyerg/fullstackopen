import {useState} from "react"

const Button=(props)=>{
    return(
    <button onClick={props.onClick}>{props.text}</button>
)
}

const Statisticsline=({text,value})=>{   
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics=({total_votos,promedio,positivo,bueno,medio,malo})=>{
    if(total_votos!=0){
        return(
            <div>
                <table>
                    <tbody>
    <Statisticsline text={"bueno"} value={bueno}></Statisticsline>
    <Statisticsline text={"malo"} value={malo}></Statisticsline>
    <Statisticsline text={"medio"} value={medio}></Statisticsline>
    <Statisticsline text={"promedio"} value={promedio}></Statisticsline>
    <Statisticsline text={"total"} value={total_votos}></Statisticsline>
    <Statisticsline text={"positivo"} value={positivo+'%'}></Statisticsline>
    </tbody>
                </table>
    </div>    
        )
    }
    return(
        <div>
            <p>no hay votos</p>
        </div>
    )
}

const App=()=>{
const[bueno,contador_bu]=useState(0)
const[medio,contador_me]=useState(0)
const[malo,contador_ma]=useState(0)

//total votos
const total_votos=bueno+malo+medio
const promedio=((bueno*1)+(medio*0)+(malo*-1))/total_votos
const positivo=(bueno/total_votos)*100

const cambiar_bu=()=>{
    contador_bu(bueno+1)
}

const cambiar_me=()=>{
    contador_me(medio+1)
}

const cambiar_ma=()=>{
    contador_ma(malo+1)
}

    return(
        <div>
            <h1>dejar comentarios</h1>
            <Button onClick={cambiar_bu} text={'bueno'} ></Button>
            <Button onClick={cambiar_me} text={'medio'} ></Button>
            <Button onClick={cambiar_ma} text={'malo'} ></Button>

            <h1>estadisticas</h1>
            <Statistics total_votos={total_votos}
            promedio={promedio}
            positivo={positivo}
            bueno={bueno}
            malo={malo}
            medio={medio}>
            </Statistics>
        </div>
    )
}

export default App