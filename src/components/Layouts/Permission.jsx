import rules from '../Commons/rules'

const check = (rules, role, action) => {
    const permissions = rules[role]
    if(!permissions){
        return false
    }

    const staticPermission = permissions.static

    if(staticPermission && staticPermission.includes(action)) {
        return true
    }

    return false
}

const Permission = ({role, perform, yes, no}) => {

    if(check(rules, role, perform)){
        return yes
    } else {
        return no
    }
}


Permission.defaultProps = {
    yes:() => null,
    no:() => null
}

export default Permission