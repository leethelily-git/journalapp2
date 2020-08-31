import React, { Component, useState, useEffect } from 'react';
import { Entries } from '../api/entries';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export class ListEntries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myEntries: [],
      isSubReady: false
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props)
    if (prevProps.isSubReady !== this.props.isSubReady) {
      this.setState({
        isSubReady: this.props.isSubReady
      });
      console.log(this.props.isSubReady)
      if (this.props.isSubReady) {
        console.log("Sub is ready and currently fetching collections from publication")
        this.setState({
          myEntries: Entries.find({}).fetch()
        })
        console.log('Collecting entries from publication');
      }
      console.log(this.myEntries)
      console.log(Entries.find({}).fetch())
    }
  }

  renderEntries = () => {
    let elements = [];
    console.log('Rendering entries')
    console.log(this.state.myEntries)
    this.state.myEntries.forEach((entry, i) => {
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
              <button onClick={this.props.handleEdit(entry._id)} className="btn btn-outline-warning" style={{margin: "10px"}}>Edit</button>
              <button onClick={this.props.handleDelete(entry._id)} className="btn btn-outline-danger">Delete</button>
            </div>
        </div>
      </div>
      );
    });
    return elements;
  }

  render() {
    console.log(this.state.isSubReady)
    let result = <div>hello</div>
    if (this.state.isSubReady) {
      result = <div>{this.renderEntries()}</div>
    } else {
      result = <div>Loading...</div>
    }
    return (
      result
    );
  };
}

export default ListEntries;

// export default withTracker(() => {
//   const entriesSub = Meteor.subscribe('entries.list');
//   const isSubReady = entriesSub.ready();
//   if (isSubReady) {
//     console.log("IM THE TRACKER");
//     return {
//       isSubReady
//     }
//   }
// })(ListEntries);