export default function slugify(str) {
	// new (20-11-2024) function from: https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
	str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
	str = str.toLowerCase(); // convert string to lowercase
	str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-'); // remove consecutive hyphens
	console.log("slugify: ", str)
	return str;
}