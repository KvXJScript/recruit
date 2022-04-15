import {FormDetails} from "./Misc";
import {Observer} from "mobx-react";
import {Item} from "../Store/stores/ExchangeStore";
import React from "react";
import SimpleButton, {ButtonType} from "./Buttons/ActionButton";
import {useRootStore} from "../Store/StoreContext";

const capitalize = (str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const TableHeaders = {
    title: "Title",
    amountEUR: "Amount(PLN)",
    amountPLN: "Amount(EUR)",
    options: "Options"
}


const SumFooter = ()=>{

    const dataStore = useRootStore();

    return (
        <>
            <div className="grid grid-cols-5 gap-6">
                {Object.values(TableHeaders).map((i: string | FormDetails)=>(
                    <p key={i} className={i === capitalize(FormDetails.Title) ? 'col-span-2': ""}>{i}</p>
                ))}
                <Observer>
                    {() => (
                    <>
                        {dataStore.exchange.current.map(({title, amountPLN, amountEUR, id }: Item)=>(
                            <React.Fragment key={id}>
                                <p className={'col-span-2'}  >{title}</p>
                                <p>{amountPLN}</p>
                                <p>{amountEUR}</p>
                                <SimpleButton  text={"Delete" } type={ButtonType.danger} onClick={()=>dataStore.exchange.removeItem(id)}/>
                            </React.Fragment>
                        ))}
                     </>
                    )}
                </Observer>
            </div>
            <Observer>
                {() => (
                    <>
                        {dataStore.exchange.euroSum  > 0 &&  <div>Sum: {(dataStore.exchange.euroSum * dataStore.exchange.euroValue).toFixed(2)} PLN ({dataStore.exchange.euroSum} EUR)</div>}
                    </>
                )}
            </Observer>
        </>
    )
}

export default SumFooter