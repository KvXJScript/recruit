import {Observer} from "mobx-react";
import SimpleButton, {ButtonType} from "./Buttons/ActionButton";
import React, {useState} from "react";
import {useRootStore} from "../Store/StoreContext";
import {FormId} from "./Misc";
import {hydrateType} from "./FormElements";
import Modal from "./Modal/Modal";


const Heading = ()=>{

    const [newEuroValue, setNewEuroValue] = useState<number>(0)
    const [changingValue, setChangingValue] = useState<boolean>(false)

    const dataStore = useRootStore()

    const handleEuroChange = (e: React.FormEvent<HTMLFormElement>): void=>{
        e.preventDefault()
        dataStore.exchange.setNewEuroValue(newEuroValue)
        setChangingValue(false)
    }


    const ChangeConversionRate = ()=>{
        return (
            <Modal size={'w-2/5'}>
                <h1 className="text-center pb-6 text-2xl font-bold">Change Conversion rate</h1>
                <div className="flex justify-between items-center">
                <form onSubmit={handleEuroChange} className="flex gap-x-4 items-center">
                    <label htmlFor={FormId.EuroAmm}> New Euro Value </label>
                    <input type="number"
                           className="border-2 border-gray-900 col-span-2 px-2 py-1"
                           id={FormId.EuroAmm}
                           autoFocus
                           value={newEuroValue}
                           onChange={((e)=> {
                           const target = hydrateType(e)
                           setNewEuroValue(Number(target.value))
                       })}/>
                    <SimpleButton text={"submit"} submitType={'submit'}/>
                </form>
                <SimpleButton text={"cancel"} type={ButtonType.danger} onClick={()=> setChangingValue(false)}/>
                </div>
            </Modal>
        )
    }

    return (
        <>
        <div className="flex justify-between items-center">
            <h1 className="text-3xl">List of expenses</h1>
            <div className="flex items-center">
                <Observer>
                    {() => (
                        <p className="pr-2">1EUR = {dataStore.exchange.euroValue}  PLN</p>
                    )}
                </Observer>
                <SimpleButton text={'change'} className="bg-none" type={ButtonType.clear} onClick={()=> setChangingValue(true)}/>
            </div>
        </div>
        {changingValue && <ChangeConversionRate/>}
        </>
    )
}

export default Heading