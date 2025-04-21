import {createStore} from 'zustand/vanilla'
import { StoreApi, useStore } from 'zustand'
import React, { useContext } from 'react'
import {persist, createJSONStorage} from 'zustand/middleware'



const createZustandContext = <TInitial, Tstore extends StoreApi<any>>(
    getStore:(initial: TInitial) =>Tstore
) =>{
    const Context = React.createContext(null as any as Tstore)

    const Provider = (props: {
        children?: React.ReactNode
        initialValue:TInitial
    }) => {
        const [store] = React.useState(getStore(props.initialValue))

        return <Context.Provider value={store}>
            {props.children}
        </Context.Provider>
    }


    return {
        useContext: () => React.useContext(Context),
        Context,
        Provider
    }
}


export type Layer ={
    publicId?:string
    width?:number
    height?:number
    url?:string
    id: string
    name?:string
    format?:string
    poster?: string
    resourceType?:string
    transcriptionURL?:string
}


