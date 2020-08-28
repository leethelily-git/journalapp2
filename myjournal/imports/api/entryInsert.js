import SimpleSchema from 'simpl-schema';
import entries, { Entries } from './entries';
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const entryInsert = new ValidatedMethod({
    name: 'Entries.methods.entryInsert',
    validate: new SimpleSchema({
      title: { type: String, label: "title", max: 5},
      description: { type: String, label: "description", optional: true},
      date: { type: Date, label: "date"},
    }).validator({clean: true, filter: false}),
    run(entryObj) {
      console.log("Passed entry validation")
      const { title, description, date } = entryObj;
      console.log(title)
      console.log(description)
      console.log(date)
      Entries.insert({
        title,
        description,
        date
      });
      console.log("Successful insert")
    }
})

