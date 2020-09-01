import React, { Component } from 'react';
import AddEntry from './AddEntry';
import ListEntries from './ListEntries';
import ListEntriesContainer from './ListEntriesContainer';
import { Entries } from "../api/entries";

import HookAddEntry from './HookAddEntry';
import HookListEntries from './HookListEntries';

// Create a new React Component `App`
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      entry: {},
      entryId: ""
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit = (entryId) => {
    const entry = Entries.findOne({_id: entryId});

    this.setState({
      entry,
      isUpdating: true,
      entryId: entryId
    })
    console.log('Editing in App.js');
    console.log(this.state.isUpdating);
  }

  handleDelete = (entryId) => {
    Entries.remove({_id: entryId});
    console.log('Successfuly deleted entry');
  }

  render() {
    return (
      <div>
        {/* <AddEntry entry={this.state.entry} isUpdating={this.state.isUpdating} /> */}
        <HookAddEntry entry={this.state.entry} isUpdating={this.state.isUpdating} 
        resetState={(entryReset = {}, isUpdatingReset = false, entryIdReset = "") => this.setState({entry: entryReset,
         isUpdating: isUpdatingReset, entryId: entryIdReset})}/>
        {/* <pre>DB Stuff: {JSON.stringify(this.props, null, ' ')} </pre> */}
        {/* <ListEntries handleEdit={this.handleEdit} handleDelete={this.handleDelete}/> */}
        {/* <ListEntriesContainer handleEdit={this.handleEdit} handleDelete={this.handleDelete}/> */}
        <HookListEntries handleEdit={this.handleEdit} handleDelete={this.handleDelete}/>
      </div>
    );
  }
}

// export the component `App`
export default App;