import SimpleSchema from 'simpl-schema';
import entries, { Entries } from './entries';
import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const entryUpdate = new ValidatedMethod({
    name: 'Entries.methods.entryUpdate',
    validate: new SimpleSchema({
      _id: { type: String, label: "id" },
      title: { type: String, label: "title", max: 5},
      description: { type: String, label: "description", optional: true},
      date: { type: Date, label: "date"},
    }).validator({clean: true, filter: false}),
    run(entryObj) {
      console.log("Passed entry validation")
      const { _id, title, description, date } = entryObj;
      console.log(_id)
      console.log(title)
      console.log(description)
      console.log(date)
      Entries.update(_id, {
        $set: {
            title,
            description,
            date
        }
      });
      console.log("Successful update")
    }
})