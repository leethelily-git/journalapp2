import SimpleSchema from 'simpl-schema';
import entries, { Entries } from './entries';
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const entryValidation = new ValidatedMethod({
    name: 'Entries.methods.entryValidation',
    validate: new SimpleSchema({
      title: { type: String, label: "title", max: 5},
      description: { type: String, label: "description", optional: true},
      date: { type: Date, label: "date"},
    }).validator({clean: true, filter: false}),
    run(entryObj) {
      console.log("Passed entry validation")
      Entries.insert({
        entryObj
      });
      console.log("Successful insert")
    }
})

