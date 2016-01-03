module TypedStorage {

	/**
	 * Interface for Storable objects
	*/
	export interface IStorable {
		_id: string | number;
	}

	/**
	 * Base class for Storable objects
	*/
	export class StorableBase implements IStorable {
		public _id: string;
		
		constructor() {
			this._id = StorableBase.generateGuid();
		}
		
		private static generateGuid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
	}

	/**
	 * Creates a new storage collection for objects of IStorable interface
	*/
	export class Collection <T extends IStorable> {
	
		private storageKey: string;
	
		constructor (storageKey: string) {
			this.storageKey = storageKey;
		}
	
		getByID (id: string | number) : T  {
			let i = 0,
				result,
				items = this.getAll();
			for (i; i < items.length; i++) {
				if (items[i]._id === id) {
					result = items[i];
					break;
				}
			}
			return result;
		}
	
		getIndexByID (id: string | number) : number {
			let i = 0,
				index,
				items = this.getAll();
			for (i; i < items.length; i++) {
				if (items[i]._id === id) {
					index = i;
					break;
				}
			}
			return index;
		}
	
		getAll () : T[] {
			let value = localStorage.getItem(this.storageKey),
				items = [];
			if (value !== null) {
				items = JSON.parse(value);
			}
			
			// Order by ID
			items.sort(function(a: T, b: T) {
				if (a._id > b._id) { return 1; }
				if (a._id < b._id) { return -1; }
				return 0;
			});
			
			return items;
		}
	
		insert (item: T) : boolean {
			let isInserted = false,
				items = this.getAll(),
				storedItem = this.getByID(item._id);
			if (storedItem === undefined) {
				items.push(item);
				localStorage.setItem(this.storageKey, JSON.stringify(items));
				isInserted = true;
			}
			return isInserted;
		}
	
		removeByID (id: string | number) : boolean {
			let isRemoved = false,
				items = this.getAll(),
				index = this.getIndexByID(id);
			if (items.length > 0) {
				isRemoved = items.splice(index, 1).length > 0;
			}
			localStorage.setItem(this.storageKey, JSON.stringify(items));
			return isRemoved;
		}
	
		removeAll () : void {
			localStorage.removeItem(this.storageKey);
		}
	
		getCount() : number {
			return this.getAll().length;
		}
	}

}