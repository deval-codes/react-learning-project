import PropTypes from 'prop-types'
import { useAppContext } from '../context/context'











const Header = (props:any) => {
    const appContext = useAppContext()
    return (
        <div>        
            <h2>{appContext.companyName} - {appContext.userName}</h2>
            <h1>  Company name :{props.companyName}</h1>
            <h1>  Company name :{props.members}</h1>
        </div>
    )
}

Header.propTypes = {
    companyName : PropTypes.string,
    members : PropTypes.number
} 

// Header.defaultProps = {
//     companyName : "DefaultCompany"
// }

export default Header;
