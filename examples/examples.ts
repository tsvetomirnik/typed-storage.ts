/// <reference path="../lib/typed_storage.ts"/>

class User extends TypedStorage.StorableBase {
	public name: string;
	public age: string;
	
	constructor() {
		super();
	}
}

var usersCollection = new TypedStorage.Collection<User>('users');

var exampleUser = new User();
exampleUser.name = "User 1";

// Insert
usersCollection.insert(exampleUser);

// Select
usersCollection.getByID(exampleUser._id);

// Remove item
usersCollection.removeByID(exampleUser._id);

// Get Count
usersCollection.getCount();

// Remove All
usersCollection.removeAll();