import { toast } from 'react-toastify';

const InfoNotify =(config)=> {
        toast.info(config)
}

const EditNotify =(config)=> {
    toast.success(config)
}

const RemoveNotify =(config)=> {
    toast.error(config)
}

const NoFoundNotify =(config)=> {
    toast.warning(config)
}

const DefaultNotify =(config)=>{
    toast(config)
}

export default {
    InfoNotify,
    EditNotify,
    RemoveNotify,
    NoFoundNotify,
    DefaultNotify
}