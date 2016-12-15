/**
 * @author lee seokjun
 */

Crow = {};

Crow.removeTag = function(data, tagName) {
	var result = data;
	while (result.indexOf('<' + tagName) >= 0) {
		var temp = result.slice(0, result.indexOf('<' + tagName));
		//console.log(temp);

		var temp2 = result.slice(result.indexOf(tagName + '>') + 7, result.length);
		//console.log(temp);

		result = (temp + temp2);

	}
	return result;
}

Crow.removeSingleTag = function(source,tagname) {
	var result = source;

	while (result.indexOf('<' + tagname) >= 0) {
		var temp = result.slice(0, result.indexOf('<' + tagname));

		var temp2 = result.slice(result.indexOf('<' + tagname), result.length);
		temp2 = temp2.slice(temp2.indexOf('>') + 2, temp2.length);

		result = temp + temp2;
	}
	return result;

}