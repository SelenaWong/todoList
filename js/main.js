/**
 * @description  使用基础js完成todo-list操作
 *
 */

document.write("<script src='util.js' type='text/javascript' charset='utf-8'></script>")
var lastSelectedPage = 'All'
/**
 * @description 输入框点击回车后添加item
 */
function enterPress(event) {
	var event = event || window.event
	var content = document.getElementById('new-todos').value
	if(event.keyCode == 13 && content) {
		document.getElementById('new-todos').value=''
		addItem(content)
	}
}

function addItem(content){
	var itemCount = getItemCount()
	var id = new Date().getTime()
	var li_template = '<li id='
	+ id
	+' ondblclick="editItem('
	+ id
	+ ')"'
	+'><div class="view">'
						+'<input type="checkbox" class="toggle" onclick="toggleState('
						+ id
						+')"/>'
						+'<label>'
						+ content
						+'</label>'
						+'<button class="destroy" onclick="removeItem('
						+ id
						+')"></button>'
						+'</div>'
						+'<input class="edit"'
						+ ' onkeyup="itemEnterPress('
						+ id
						+')"'
						+'>'
						+'</li>'
	var ulElement = document.getElementById('todo-list')
	/***
	 * ulElement.innerHTML += li_template 
	 * 如果使用ulElement.innerHTML时,后面追加新li时,ul会重新刷新一次
	 **/
	var liElement = document.createElement('li')
	liElement.innerHTML = li_template
	/**
	 * ulElement.appendChild(liElement)
	 * liElement isn't a child of the player container.
	 * It's a child of the li I created as a wrapper for it 
	 *  (liElement in the first part of the code). 
	 *  Which is why it fails, removeChild only removes children, not descendants.*/
	ulElement.appendChild(liElement.firstChild)
	setElementLeft()
	if(lastSelectedPage == 'Completed'){//刷新界面
		selectCompletedItems()
	}
}

function editItem(id){
	var liElement = document.getElementById(id)
	addClass(liElement,'editing')
	var liElement = document.getElementById(id)
	var labelElement = liElement.getElementsByTagName('label')[0]
	var editElement = liElement.getElementsByTagName('input')[1]
	editElement.value= labelElement.innerHTML
}
function itemEnterPress(id){
	var event = event || window.event
	var liElement = document.getElementById(id)
	if(event.keyCode == 13) {
		var labelElement = liElement.getElementsByTagName('label')[0]
		var editElement = liElement.getElementsByTagName('input')[1]
		labelElement.innerHTML = editElement.value
		removeClass(liElement,'editing')
	}
}

/**
 * @description 移除item
 */
function removeItem(id) {
	console.log('removeItem id='+id)
	var ulElement = document.getElementById('todo-list')
	var liElement = document.getElementById(id)
	ulElement.removeChild(liElement)
	setElementLeft()
}

function changeSelectedLink (currentPage) {
	document.getElementById(lastSelectedPage).className=''
	document.getElementById(currentPage).className='selected'
	lastSelectedPage = currentPage
}

/**
 * @description 按All按键时，显示所有的item
 */
function selectAllItems() {
	if(lastSelectedPage == 'All'){
		return
	}
	changeSelectedLink('All')
	var liElements = document.getElementById('todo-list')
							.getElementsByTagName('li')
	for (var i=0;i<liElements.length;i++){
		le = liElements[i]
		inputElems = le.getElementsByTagName('input')
		le.style.display = 'block'
	}
}

/**
 * @description 获取todo item的总个数
 */
function getItemCount() {
	var itemCount = document.getElementById('todo-list')
							.getElementsByTagName("li").length
	console.log('itemCount= '+itemCount)
	return itemCount					
}

/**
 * @description 获取已完成的todo item
 */
function selectCompletedItems() {
	changeSelectedLink('Completed')
	var liElements = document.getElementById('todo-list')
							.getElementsByTagName('li')
	for(var i=0;i<liElements.length;i++){
		le = liElements[i]
		if(hasClass(le,'completed')){//le.getAttribute('class') =='completed'
			le.style.display = 'block'
		}else {
			le.style.display = 'none'
		}
	}
}

/**
 * @description 获取激活的todo item
 */
function selectActiveItems() {
	changeSelectedLink('Actived')
	var liElements = document.getElementById('todo-list')
							.getElementsByTagName('li')
	for (var i=0;i<liElements.length;i++){
		le = liElements[i]
		console.log('le.class='+le.getAttribute('class'))
		if(hasClass(le,'completed')){//le.getAttribute('class') =='completed'
			le.style.display = 'none'
		}else {
			le.style.display = 'block'
		}
	}
}
/**
 * @description 删除所有的todo item
 */
function clearItems(){
	var ulElement = document.getElementById('todo-list')
	while(ulElement.hasChildNodes()){
		ulElement.removeChild(ulElement.firstChild)
	}
	setElementLeft()
}
/**
 * @description 删除已完成的todo item
 */
function clearCompleted(){
	var ulElement = document.getElementById('todo-list')
	var liElements = document.getElementById('todo-list')
							.getElementsByTagName('li')
	var len = liElements.length					
	for(var i=len-1;i>=0;i--){
		le = liElements[i]
		if(hasClass(le,'completed')){
			ulElement.removeChild(liElements[i])
			len--
		}
	}
	setElementLeft()
}

/**
 * @description  todo item 点击checkbox 更改状态
 */
function toggleState(id){
	var liElement = document.getElementById(id)
	var divElement = liElement.getElementsByTagName('div')[0]
	var checkElement = divElement.firstElementChild
	if( checkElement.checked ){
		addClass(liElement,'completed')
	} else {
		removeClass(liElement,'completed')
	}
	setElementLeft()
	if(lastSelectedPage =='Actived'){
		selectActiveItems() //刷新界面
	}else if(lastSelectedPage =='Completed'){
		selectCompletedItems()  //刷新界面
	}
}

/**
 * @description 设置剩余todo item
 */
function setElementLeft() {
	var todoCount = document.getElementById('todo-count')
	todoCount.innerHTML = getElementLeft() +' item left'
}

/**
 * @description  计算剩余todo item的个数
 */
function getElementLeft(){
	var liElements = document.getElementById('todo-list')
							 .getElementsByTagName('li')
    var itemCompleted = 0
	for (var i=0;i<liElements.length;i++){
		if(hasClass(liElements[i],'completed')){//liElements[i].getAttribute('class')=='completed'
			itemCompleted++
		}
	}	
	return liElements.length - itemCompleted					 
}

