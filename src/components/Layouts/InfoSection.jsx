import React from 'react'

const Info = ({children, classHeader, classBody, classContainer}) => {
    const header = React.Children.map(children, child => child.type.displayName === 'Header' ? child : null)
    const body = React.Children.map(children, child => child.type.displayName === 'Body' ? child : null)

    return (
        <div className={`border border-dark h-100 ${classContainer}`}>
            {header}
            {body}
        </div>
    )
}

const Header = ({children, className}) => {
    return(
        <div className='bg-dark py-3'>
            <h5 className={`text-center text-white mb-0 ${className}`}>
                {children}
            </h5>
        </div>
    )
};
Header.displayName = 'Header';
Info.Header = Header;

const Body = ({children, className}) => {
    return(
        <div className={`p-3 ${className}`}>
            {children}
        </div>
    )
};
Body.displayName = 'Body';
Info.Body = Body;

export default Info