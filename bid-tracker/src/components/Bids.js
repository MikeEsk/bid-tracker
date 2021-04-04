import Bid from './Bid'

const Bids = ({bids, onDelete, onToggle}) => {

    return (
        <>
            {bids.map((bid) => (
                <Bid key={bid.id} bid = {bid} onDelete ={onDelete} onToggle={onToggle}/>
                )
            )}
        </>
    )
}

export default Bids
