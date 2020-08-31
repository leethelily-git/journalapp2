import React, { Component, useState, useEffect } from 'react';
import { Entries } from '../api/entries';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ListEntries from './ListEntries';

const ListEntriesContainer = withTracker(() => {
  const entriesSub = Meteor.subscribe('entries.list');
  const isSubReady = entriesSub.ready();
  if (isSubReady) {
    console.log("IM THE TRACKER");
    console.log(isSubReady)
    return {
      isSubReady
    }
  }
})(ListEntries);

export default ListEntriesContainer;