import React, { Component } from 'react';
import AddEntry from './AddEntry';
import ListEntries from './ListEntries';
import { Entries } from "../api/entries";

// Create a new React Component `App`
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      entry: {}
    }
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit = (entryId) => {
    const entry = Entries.findOne({_id: entryId});

    this.setState({
      entry,
      isUpdating: true
    })
    console.log('Editing in App.js')
  }

  render() {
    return (
      <div>
        <AddEntry entry={this.state.entry} isUpdating={this.state.isUpdating}/>
        {/* <pre>DB Stuff: {JSON.stringify(this.props, null, ' ')} </pre> */}
        <ListEntries handleEdit={this.handleEdit}/>
        {/* <ListEntries /> */}
      </div>
    );
  }
}

// export the component `App`
export default App;