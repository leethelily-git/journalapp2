
import React, { Component, useState, useEffect } from 'react';
import { Entries } from '../api/entries';
import { entryInsert } from '../api/entryInsert';
import { entryUpdate } from '../api/entryUpdate';
import Meteor from 'meteor/meteor';

//HookAddEntry functional component that takes in props from App.js
const HookAddEntry = (props) => {

  //Set the state for entry and isUpdating
  const [entry, setEntry]  = useState({title: '', description: '', date: new Date()});
  const [isUpdating, setUpdating] = useState(false);
  
  //useEffect for the change in props
  useEffect(() => {
    setEntry(props.entry);
  }, [props.entry]);

  useEffect(() => {
    setUpdating(props.isUpdating);
  }, [props.isUpdating]);

  console.log(props.entry)
  console.log(props.isUpdating)

  console.log('-------')
  console.log(entry)
  console.log(isUpdating)

  handleSubmit = (entry) =>  {
    // entry.preventDefault();
    const entryObj = entry;
    let clientSideValidation = true;

    console.log('Handling submit');

    if (entryObj) {
      if (entryObj.title == "") {
        console.log('Title is empty');
        alert('Title is empty');
        clientSideValidation = false;
      }
      if (entryObj.description == "") {
        console.log('Description is empty');
        alert('Description is empty');
        clientSideValidation = false;
      }
      if (entryObj.date == "") {
        console.log('Date is empty');
        alert('Date is empty');
        clientSideValidation = false;
      }
      
      if (clientSideValidation && !isUpdating) {
        entryInsert.call(entryObj, (err, res) => {
          console.log({entryObj})
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        });
      } else if (clientSideValidation && isUpdating) {
        console.log('UPDATE VALIDATION METHOD');
        console.log({entryObj});
        entryUpdate.call(entryObj, (err, res) => {
          if (err) {
            console.log(err)
          } else {
            console.log(res)
          }
        });

        setUpdating(false);
      }

      const newEntry = {
        title: "",
        description: "",
        date: new Date()
      }
  
      //Clear input fields on submit
      setEntry(newEntry)
      console.log('Cleared input fields on submit')
    }
  }

  renderSubmitButton = () => {
    if(isUpdating) {
      return ( <button type="submit" className="btn btn-primary">Update This Entry</button>)
    } else {
      return ( <button type="submit" className="btn btn-primary">Add Entry</button>)
    }
  }

  return (
    <div>
        <div className="text-center">
          <h4>My Journal</h4>
        </div>
        <hr />

        <div className="jumbotron" style={{ margin: "0 500px" }}>
          <form onSubmit={() => handleSubmit(entry)}>

            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter journal title"
                name="title"
                value={entry.title ? entry.title : ""}
                onChange={e => setEntry({ ...entry, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter journal description"
                name="description"
                value={entry.description ? entry.description : ""}
                onChange={e => setEntry({ ...entry, description: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Entry Date:</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter date in the format mm.dd.yyyy"
                name="date"
                value={entry.date ? entry.date: ""}
                onChange={e => setEntry({ ...entry, date: e.target.value})}
              />
            </div>

            {renderSubmitButton()}
          </form>
        </div>
      </div>
  );
}

export default HookAddEntry;