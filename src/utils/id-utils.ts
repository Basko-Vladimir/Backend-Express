export function mapObjectIdToId<T>(item: any): T {
	const newObject = {...item, id: item._id};
	delete newObject._id;
	
	return newObject;
}