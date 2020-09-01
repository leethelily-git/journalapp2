import React, { useState, useEffect } from 'react';
import { Entries } from '../api/entries';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//useTracker implementation
const useEntries = () => useTracker(() => {
  const entriesSub = Meteor.subscribe('entries.list');
  const isSubReady = entriesSub.ready();
  const e = Entries.find({}).fetch()
  return {
      isSubReady, e
  }
}, [])

export const HookListEntries = ({handleEdit, handleDelete}) => {
  const [ready, setReady] = useState(false);
  const [myEntries, setMyEntries] = useState([]);
  const { isSubReady, e } = useEntries()

  useEffect(() => {
    setReady(isSubReady)
  }, [isSubReady])

  useEffect(() => {
    setMyEntries(e)
  }, [e])

  renderEntries = () => {
    let elements = [];
    console.log('Rendering entries')
    myEntries.forEach((entry, i) => {
      console.log('Pushing elements')
      elements.push(
        <div className="list-group" key={entry._id} style={{ margin: "20px 100px" }}>
        <div className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{entry.title}</h5>
            <p>{entry.date.toString()}</p>
          </div>
          <p className="mb-1">{entry.description}</p>
          <div className="float-right">
              <button onClick={() => handleEdit(entry._id)} className="btn btn-outline-warning" style={{margin: "10px"}}>Edit</button>
              <button onClick={() => handleDelete(entry._id)} className="btn btn-outline-danger">Delete</button>
            </div>
        </div>
      </div>
      );
    });
    return elements;
  }

  return (
    ready ?
    <div>
      { renderEntries() }
    </div>
    :
    <div>
      Loading...
    </div>
  )
};

//withTracker implementation

// export default withTracker(() => {
//   const entriesSub = Meteor.subscribe('entries.list');
//   const isSubReady = entriesSub.ready();
//   const myEntries = Entries.find({}).fetch()
//   if (isSubReady) {
//     console.log("IN THE TRACKER");
//     return {
//       isSubReady, myEntries
//     }
//   }
// })(HookListEntries);