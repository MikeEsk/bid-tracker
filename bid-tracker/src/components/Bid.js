import {FaTimes} from 'react-icons/fa'

const Bid = ({bid, onDelete, onToggle}) => {
    return (
        <div className={`bid ${bid.reviewed ? 'reviewed': ''}`} onDoubleClick={() => onToggle(bid.id)}>
            <h3>{bid.company} <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick= {() => onDelete(bid.id)} /></h3>
            <p>{bid.price}</p>
            
        </div>
    )
}

export default Bid
