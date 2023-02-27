import { create } from 'zustand'

interface WeatherStore{
    data : Array<object>,
    setData : (data : object) => void,
}

const weatherConfig = (config:any) => (set:any, get:any, api:any) =>
    config(
        (args:any)=>{
            // console.log(args)
            set(args)
            // console.log(get())
        },
        get,
        api
    )

const weatherStore = create<WeatherStore>(
    weatherConfig((set : Function)=>({
        data : [],
        setData : (input : any) => set({data : input})
    }))
)

interface LoadingStore {
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

const loadingstore = create<LoadingStore>(
    loadingConfig((set : Function)=>({
        isloading : false,
        loadInit : () => set({isLoading : true}),
        loadDone : () => set({isLoading : false}),
    }))
)

export {loadingstore, weatherStore}