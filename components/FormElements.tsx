import {FormDetails, FormId, isDecimal, LifeCycle} from "./Misc";
import React, {useState} from "react";
import {toast} from "react-toastify";
import SimpleButton, {ButtonType} from "./Buttons/ActionButton";
import {Item} from "../Store/stores/ExchangeStore";
import {useRootStore} from "../Store/StoreContext";
import {v4 as uuidv4} from 'uuid';
import Heading from "./Heading";


export const hydrateType = (event)=>{
    const target = event.target as HTMLInputElement
    return target
}


const FormElements = ()=>{

    const dataStore = useRootStore()

    const [transactionTitle, setTransactionTitle] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [lifeCycle, setLifeCycle] = useState<LifeCycle>(LifeCycle.Init)
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true)



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void=>{
        e.preventDefault()
        setLifeCycle(LifeCycle.Submitting)

        if(!transactionTitle || amount === 0){
            toast("Please provide your title and amount ")
            setLifeCycle(LifeCycle.Init)
            return;
        }

        const item: Item = {
            amountEUR: undefined,
            title: undefined,
            amountPLN: undefined,
            id: undefined,
        }

        item[FormDetails.Title] = transactionTitle
        item[FormDetails.AmountPLN] = amount
        item[FormDetails.AmountEUR] = Number((amount / dataStore.exchange.euroValue ?? 4.382).toFixed(2))
        item[FormDetails.Id] = uuidv4()

        dataStore.exchange.addItem(item)
        setTransactionTitle("")
        setAmount(0)

        setLifeCycle(LifeCycle.Init)
    }
    return (
        <div className="flex flex-col gap-6 pb-6">
            <Heading/>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 gap-x-2 items-center mb-4">
                        <label htmlFor={FormId.Transaction}>Title of transaction</label>
                        <input type="text"
                               minLength={5}
                               maxLength={30}
                               className="border-2 border-gray-900 col-span-2 px-2 py-1"
                               id={FormId.Transaction}
                               placeholder={'Enter your title...'}
                               value={transactionTitle}
                               onChange={((e: React.FormEvent<HTMLInputElement>)=> {
                                   const target = hydrateType(e)
                                   setTransactionTitle(target.value)
                               })}/>
                    </div>
                    <div className="grid grid-cols-4 gap-x-2 items-center">
                        <label htmlFor={FormId.Amount}> Amount (in PLN)</label>
                        <input type="number"
                               className="border-2 border-gray-900 col-span-2 px-2 py-1"
                               id={FormId.Amount}
                               maxLength={20}
                               value={amount}
                               onChange={((e: React.FormEvent<HTMLInputElement>)=> {
                                   const target = hydrateType(e)
                                   const validate = isDecimal(target.value)
                                   if(!validate){
                                       setIsAmountValid(false)
                                       toast("Max numbers in decimal space is 2 numbers");
                                   }  else{
                                       setIsAmountValid(true)
                                   }
                                   setAmount(Number(target.value))
                               })}/>
                        <SimpleButton text="Add" submitType={'submit'} type={!isAmountValid ? ButtonType.disabled: ButtonType.hollowWhite}  className="w-40 justify-self-end" loading={lifeCycle === LifeCycle.Submitting}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormElements