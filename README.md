# typed-storage.ts
Local storage made for TypeScript

## Description
Provides generic methods to work with the local storage in a document/collection manner.

## Usage

1. Create new class and extend the StorageBase.
  ```javascript
  class User extends TypedStorage.StorableBase {
    public name: string;
    constructor() {
      super();
    }
  }
  ```

2. Define new collection for your class.
  ```javascript
  var usersCollection = new TypedStorage.Collection<User>('users');
  ```
  
3. Perform CRUD operations.
  ```javascript
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
  ```

## License

[MIT](https://github.com/tsvetomirnik/typed-storage.ts/blob/master/LICENSE)
