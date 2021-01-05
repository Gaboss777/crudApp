import rules from '../Commons/rules'

const check = (rules, role, action, data) => {
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

const Permission = ({role, perform, data, yes, no}) =>
    check(rules, role, perform, data)
    ? yes()
    : no()

Permission.defaultProps = {
    yes:() => null,
    no:() => null
}

export default Permission