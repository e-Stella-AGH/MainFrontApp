import {jwtUtils} from "../../utils/jwt/jwtUtils";
import {UnauthenticatedPage} from "./UnauthenticatedPage";
import PropTypes from 'prop-types';

export const withUserAuth = (WrappedComponent, permittedTypes, wrappedProps) => {
    let user = jwtUtils.getUser()

    return (
        <>
            {
                permittedTypes.includes(user?.userType) ? <WrappedComponent {...wrappedProps} /> : <UnauthenticatedPage />
            }
        </>
    )
}

withUserAuth.propTypes = {
    permittedTypes: PropTypes.array.isRequired,
    WrappedComponent: PropTypes.any
}

withUserAuth.defaultProps = {
    wrappedProps: {}
}