import React from 'react'

//Import components
import BidTrackState from './context/trades/BidTrackState'
import BidTrack from './components/BidTrack'

function App() {

  return (
    <BidTrackState>
      <BidTrack/>
    </BidTrackState>
  );
}

export default App;

