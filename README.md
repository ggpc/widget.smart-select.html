# widget.smart-select.js
Advanced UI control with  multiple selection and filter tools. Has own controller.

> Widget can be used in standard html form. Native submit wil send all selected items properly, because of using hidden native checkbox elements

# Dependency
[ggpc/system.dom.js](https://github.com/ggpc/system.dom.js) - dom utility. Using dom manipulations

# Requirements
Widget could be pretty with special css style only. Please don't forget to add this code in Your html document:
```html
<link href="widget.smart-select.css" type="text/css" rel="stylesheet">
```
> Each element in smartSelect widget has own className, so You could customize widget for any theme. 
> If CSS styles are too difficult, please contact me. 

# Methods

smartSelect(parameters);

setSmartSelectDefaultLang(lang);

## smartSelect object Methods and Properties
### Properties
- container: {}, // collection of widget parts - [HTMLElements]
- name: String,  
- items: [] // array of smart-select-items
- onChange: null || function // try to evaluate after every widget value changing
 
### Methods
- addItem(position, value, label)
- removeItem(position)
- applyFilter()
- clearAll()
- clearFilter()
- exportValues()
- getSelectedLabels()
- getValue()
- invertSelection()
- isDisabled()
- selectAll()
- setDisabled(bool)
- showSelected(bool)

# Usage

```javascript
  var params = {
  		target: document.getElementById('ss'),
  		name: 'users',
  		source: users,
      lang: 'ua'
  	};
    var c = new smartSelect(params);
```

## Parameters

>- 1. target: HTMLElement
- 2. name: String
- 3. source: Array
- 4. lang: string


# Example
```javascript
// create abstract list
var users = [];
var fillUsers = function(){
  for(var i=0,l=100;i<l;i++){
    users.push({'value': (i+1), 'label': 'user '+(i+1)});
  }
};
fillUsers();

// create smart selection widget
var params = {
  target: document.getElementById('ss'),
  name: 'users',
  source: users,
  lang: 'ua'
};
var c = new smartSelect(params);

// get selected values
var result = c.getValue();
```

# Live Demo
[live demo](http://gzone.org.ua/files/library/js/widget/SmartSelect/widget.smart-select.html)
