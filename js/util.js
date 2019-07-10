/**
 * 工具类
 */

function hasClass(element, className){
	return element.className.match(new RegExp( "(\\s|^)" + className+"(\\s|$)"))
}

function addClass(element, className){
	if (!hasClass(element,className)){
		element.className += " "+className
	}
	trimLeft(element.className)
}

function removeClass(element, className){
	if (hasClass(element, className)){
		element.className = element.className.replace(new RegExp( "(\\s|^)"+className+"(\\s|$)")," ")
		console.log('after remove class = '+ element.className)
	}
}

/**
 * @description  移除字符串前面的空格
 */
function trimLeft(str){
	return str.replace(/(^\s*)/g,"")
}
/**
 * @description 移除字符串后面的空格
 * @param  {[type]} right [description]
 * @return {[type]}       [description]
 */
function trimRight(right){
	return str.replace(/(^\s*$)/g,"")
}