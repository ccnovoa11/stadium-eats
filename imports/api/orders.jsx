import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Orders = new Mongo.Collection("orders");

if(Meteor.isServer) {
  Meteor.publish("orders", function ordersPublication() {
    return Orders.find();
  });
}

Meteor.methods({
  "orders.insert"(prods, total, resName) {
    if(!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Orders.insert({
      items: prods,
      price: total,
      clientId: this.userId,
      restaurantName: resName,
      state: "order received"
    });
  },
  "orders.changeState"(idOrder, stateOr) {
    Orders.update({ _id: idOrder },
      {
        $set: {
          state: stateOr
        }
      });
  }
});