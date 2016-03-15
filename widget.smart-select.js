(function(module){
  // smartSelectIndex
  var smartSelectIndex = 0;
  var smartSelectItemIndex = 0;
  // langs
  var defaultLang = 'en';
  var langs = ['en', 'ru', 'ua'];
  // translations
  var translations = {
    'en': {
      'filterPlaceholder': 'Filter',
      'allItemsButtonClear': 'Clear All',
      'allItemsButtonSelectAll': 'Select All',
      'invertSelectionButton': 'Invert',
      'buttonShowAll': 'Show all',
      'buttonShowSelected': 'Show selected',
      'clearFilterButton': 'x'
    },
    'ru': {
      'filterPlaceholder': 'Фильтр',
      'allItemsButtonClear': 'Очистить',
      'allItemsButtonSelectAll': 'Все',
      'invertSelectionButton': 'Инвертировать',
      'buttonShowAll': 'Показать все',
      'buttonShowSelected': 'Показать выделенные',
      'clearFilterButton': 'x'
    },
    'ua': {
      'filterPlaceholder': 'Фільтр',
      'allItemsButtonClear': 'Очистити',
      'allItemsButtonSelectAll': 'Всі',
      'invertSelectionButton': 'Інвертувати',
      'buttonShowAll': 'Показати всі',
      'buttonShowSelected': 'Показати виділені',
      'clearFilterButton': 'x'
    }
  };
  // current translations
  var currentTranslations = translations[defaultLang];


  // create container
  var draw = function(){
      var result = {};
      // container
      result.container = document.createElement('div');
      result.container.className = 'ggp-smart-select';
      // actions
      result.actions = document.createElement('div');
      result.actions.className = 'ggp-smart-select-actions';
      result.container.appendChild(result.actions);
      // actions clear all items
      result.actionsClearAllItems = document.createElement('button');
      result.actionsClearAllItems.className = 'ggp-smart-select-actionsClearAllItems';
      result.actions.appendChild(result.actionsClearAllItems);
      // actions select all items
      result.actionsSelectAllItems = document.createElement('button');
      result.actionsSelectAllItems.className = 'ggp-smart-select-actionsSelectAllItems';
      result.actions.appendChild(result.actionsSelectAllItems);
      // actions invert selection
      result.actionsInvertSelection = document.createElement('button');
      result.actionsInvertSelection.className = 'ggp-smart-select-actionsInvertSelection';
      result.actions.appendChild(result.actionsInvertSelection);

      // actions show all
      result.actionsShowAll = document.createElement('button');
      result.actionsShowAll.className = 'ggp-smart-select-actionsShowAll';
      result.actions.appendChild(result.actionsShowAll);
      // actions show selected
      result.actionsShowSelected = document.createElement('button');
      result.actionsShowSelected.className = 'ggp-smart-select-actionsShowSelected';
      result.actions.appendChild(result.actionsShowSelected);

      // info
      result.info = document.createElement('div');
      result.info.className = 'ggp-smart-select-info';
      result.container.appendChild(result.info);
      // info selected items
      result.statusInfoSelected = document.createElement('span');
      result.statusInfoSelected.className = 'ggp-smart-select-infoSelected';
      result.info.appendChild(result.statusInfoSelected);
      // info all items
      result.statusInfoTotal = document.createElement('span');
      result.statusInfoTotal.className = 'ggp-smart-select-infoTotal';
      result.info.appendChild(result.statusInfoTotal);

      // select
      result.select = document.createElement('ul');
      result.select.className = 'ggp-smart-select-itemsContainer';
      result.container.appendChild(result.select);
      // filter
      result.filter = document.createElement('div');
      result.filter.className = 'ggp-smart-select-filter';
      result.container.appendChild(result.filter);
      // filter-input
      result.filterInput = document.createElement('input');
      result.filterInput.setAttribute('type', 'text');
      result.filterInput.className = 'ggp-smart-select-filter-input';
      result.filter.appendChild(result.filterInput);
      // clear filter button
      result.clearFilter = document.createElement('button');
      result.clearFilter.className = 'ggp-smart-select-clearFilter';
      result.filter.appendChild(result.clearFilter);
      return result;
  };
  // insert text
  var applyTranslations = function(container, translations){
    if(typeof translations == 'undefined'){
      translations = currentTranslations;
    }
    container.filterInput.setAttribute('placeholder', translations.filterPlaceholder);
    container.actionsInvertSelection.innerHTML =  translations.invertSelectionButton;
    container.actionsClearAllItems.innerHTML = translations.allItemsButtonClear;
    container.actionsSelectAllItems.innerHTML = translations.allItemsButtonSelectAll;
    container.actionsShowAll.innerHTML = translations.buttonShowAll;
    container.actionsShowSelected.innerHTML = translations.buttonShowSelected;
    container.clearFilter.innerHTML = translations.clearFilterButton;
  };
  //hide or show widget buttons after onChange event
  var checkSmartSelectActionButtons = function(widget){
    var size = widget.items.length;
    var selected_values = widget.getValue();
    var selected_size = selected_values.length;
    if(selected_size == 0){
      addClass(widget.container.actionsClearAllItems, 'ggp-smart-select-actions-button-hidden');
      removeClass(widget.container.actionsSelectAllItems, 'ggp-smart-select-actions-button-hidden');
    }else{
      addClass(widget.container.actionsSelectAllItems, 'ggp-smart-select-actions-button-hidden');
      removeClass(widget.container.actionsClearAllItems, 'ggp-smart-select-actions-button-hidden');
    }
    widget.container.actionsInvertSelection.disabled = (selected_size == 0 || selected_size == size);
  };
  var updateSmartSelectStatusInfo = function(widget){
    var size = widget.items.length;
    var selected_size = widget.getValue().length;
    widget.container.statusInfoSelected.innerHTML = selected_size;
    widget.container.statusInfoTotal.innerHTML = size;
  };
  // create option
  var selectItem = function(name){
    var self = this;
    // set smartSelectItemIndex
    smartSelectItemIndex++;

    // draw item
    var li = document.createElement('li');
    li.className = 'ggp-smart-select-item';
    // label
    var label = document.createElement('label');
    label.className = 'ggp-smart-select-item-label';
    label.setAttribute('for', 'smartSelectItem'+smartSelectItemIndex);
    li.appendChild(label);
    // input
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', name+'[]');
    input.className = 'ggp-smart-select-hiddenInput';
    input.setAttribute('id', 'smartSelectItem'+smartSelectItemIndex);
    li.appendChild(input);

    // init events
    input.onchange = function(e){
      try{
        if(typeof self.beforeChange == 'function'){
          self.beforeChange.apply(self);
        }
        if(this.checked){
          addClass(li, 'ggp-smart-select-item-selected');
        }else{
          removeClass(li, 'ggp-smart-select-item-selected');
        }
        if(typeof self.onChange == 'function'){
          self.onChange.apply(self);
        }
      }catch(e){
        this.checked = !this.checked;
        console.log(e);
        return false;
      }
    };

    // set container
    this.container = {
      'container': li,
      'label': label,
      'input': input,
      'onSelect': null
    };
  };
  selectItem.prototype = {
    container: null,
    onChange: null,
    beforeChange: null,
    setValue: function(v){
      this.container.input.value = v;
    },
    getValue: function(){
      return this.container.input.value;
    },
    setLabel: function(v){
      this.container.label.innerHTML = v;
    },
    getLabel: function(){
      return this.container.label.innerHTML;
    },
    isSelected: function(){
      return this.container.input.checked;
    },
    setSelected: function(v){
      if(this.container.input.checked === v){
        return;
      }
      this.container.input.checked = !!v;
      this.container.input.onchange();
    },
    isHidden: function(){
      return hasClass(this.container.container, 'ggp-smart-select-item-hidden');
    },
    setHidden: function(v){
      if(v){
        addClass(this.container.container, 'ggp-smart-select-item-hidden');
      }else{
        removeClass(this.container.container, 'ggp-smart-select-item-hidden');
      }
    }
  };

  // smartSelect Object
  var smartSelect = function(params){
    var self = this;
     // set new index
     smartSelectIndex++;
     // container
     this.container = draw();
     this.container.container.setAttribute('id', 'smartSelect'+smartSelectIndex);
     // apply langs
     var current_translation;
     if(typeof params['lang'] != 'undefined' && langs.indexOf(params['lang']) > -1){
        current_translation = translations[params['lang']];
     }else{
        current_translation = currentTranslations;
     }
     applyTranslations(this.container, current_translation);
     // target
     if(params['target'] instanceof HTMLElement){
         params['target'].appendChild(this.container.container);
     }
     // name
    if(typeof params['name'] == 'undefined'){
      this.name = 'smartSelect';
     }else{
      this.name = params['name'];
     }
     // init
     this.items = [];
     // init events
     this.container.actionsInvertSelection.onclick = function(){
        self.invertSelection();
     };
     this.container.actionsClearAllItems.onclick = function(){
        self.clearAll();
        self.showSelected(false);
     };
     this.container.actionsSelectAllItems.onclick = function(){
        self.selectAll();
     };
     this.container.filterInput.onkeyup = function(){
        self.applyFilter();
     };
     this.container.clearFilter.onclick = function(){
        self.clearFilter();
     };
     this.container.actionsShowSelected.onclick = function(){
        self.showSelected(true);
     };
     this.container.actionsShowAll.onclick = function(){
        self.showSelected(false);
     };

     // init source
     if(params['source'] instanceof Array){
      for(var i=0,l=params['source'].length;i<l;i++){
        this.addItem(null, params['source'][i]['value'], params['source'][i]['label']);
      }
     }
     checkSmartSelectActionButtons(this);
     updateSmartSelectStatusInfo(this);
  };
  smartSelect.prototype = {
  	container: null,
    name: null,
    items: null,
    onChange: null,
    addItem: function(index, value, label){
      var self = this;
      var item = new selectItem(this.name);
      item.setValue(value);
      item.setLabel(label);
      if(typeof index != 'number' || (index+1) > this.items.length){
        this.items.push(item);
        this.container.select.appendChild(item.container.container);
      }else{
        this.items.splice(index, 0, item);
        this.container.select.insertBefore(item.container.container, this.items[index].container.container);
      }
      item.beforeChange = function(){
        if(self.isDisabled()){
          throw 'widget disabled';
        }
      };
      item.onChange = function(){
        checkSmartSelectActionButtons(self);
        updateSmartSelectStatusInfo(self);
        if(typeof self.onChange == 'function'){
          self.onChange.apply(self);
        }
      }
      this.applyFilter();
    },
    removeItem: function(position){
      if(this.items.length-1<position){
        return;
      }
      var item = this.items[position];
      this.container.select.removeChild(item.container.container);
      this.items.splice(position, 1);
      this.applyFilter();
    },
    invertSelection: function(){
      for(var i=0,l=this.items.length;i<l;i++){
        this.items[i].setSelected(!this.items[i].isSelected());
      }
    },
    selectAll: function(){
      for(var i=0,l=this.items.length;i<l;i++){
        this.items[i].setSelected(true);
      }
    },
    clearAll: function(){
      for(var i=0,l=this.items.length;i<l;i++){
        this.items[i].setSelected(false);
      }
    },
    getValue: function(){
      var result = [];
      for(var i=0,l=this.items.length;i<l;i++){
        if(this.items[i].isSelected()){
          result.push(this.items[i].getValue());
        }
      }
      return result;
    },
    getSelectedLabels: function(){
      var result = [];
      for(var i=0,l=this.items.length;i<l;i++){
        if(this.items[i].isSelected()){
          result.push(this.items[i].getLabel());
        }
      }
      return result;
    },
    exportValues: function(){
      var result = [];
      for(var i=0,l=this.items.length;i<l;i++){
          result.push({'value': this.items[i].getValue(), 'label': this.items[i].getLabel()});
      }
      return result;
    },
    isDisabled: function(){
      return hasClass(this.container.container, 'ggp-smart-select-disabled');
    },
    setDisabled: function(v){
      if(v){
        addClass(this.container.container, 'ggp-smart-select-disabled');
      }else{
        removeClass(this.container.container, 'ggp-smart-select-disabled');
      }
    },
    clearFilter: function(){
      this.container.filterInput.value = '';
      this.applyFilter();
    },
    applyFilter: function(){
      var fv = this.container.filterInput.value;
      var value, label;
      for(var i=0,l=this.items.length;i<l;i++){
          value = this.items[i].getValue();
          label = this.items[i].getLabel();
          if(fv == '' || String(value).indexOf(fv)>-1 || label.indexOf(fv)>-1){
            this.items[i].setHidden(false);
          }else{
            this.items[i].setHidden(true);
          }
      }
    },
    showSelected: function(v){
      if(v){
        addClass(this.container.container, 'ggp-smart-select-showSelected');
      }else{
        removeClass(this.container.container, 'ggp-smart-select-showSelected');
      }
    }
  };
  module.smartSelect = smartSelect;

  // change lang
  var setSmartSelectDefaultLang = function(lang){
      if(langs.indexOf(lang) == -1){
        return;
      }
      defaultLang = lang;
      currentTranslations = translations[defaultLang];
  };
  module.setSmartSelectDefaultLang = setSmartSelectDefaultLang;
})(typeof module == 'object'?module:window);
