import { toast } from 'react-toastify';

const InfoNotify =(textAlert)=> {
        toast.info(textAlert)
}

const EditNotify =(textAlert)=> {
    toast.success(textAlert)
}

const RemoveNotify =(textAlert)=> {
    toast.error(textAlert)
}

const NoFoundNotify =(textAlert)=> {
    toast.warning(textAlert)
}

export default {
    InfoNotify,
    EditNotify,
    RemoveNotify,
    NoFoundNotify
}