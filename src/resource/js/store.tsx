import { create } from 'zustand'

interface loadingStore {
    isLoading : boolean,
    loadInit : () => void,
    loadDone : () => void,
}

const loadingConfig = (config:any) => (set:any, get:any, api:any) =>
    config(
        (args:boolean)=>{
            console.log('loading state : ', args)
            set(args)
            // console.log('2', get())
        },
        get,
        api
    )

const loadingstore = create<loadingStore>(
    loadingConfig((set : Function)=>({
        isloading : false,
        loadInit : () => set({isLoading : true}),
        loadDone : () => set({isLoading : false}),
    }))
)

export {loadingstore}