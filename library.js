// Main tasks
//Да се разработи библиотека за манипулиране на DOM дървото, която да включва следните функционалности:

var DOMlib = {

    //1. Взимане на съществуващ DOM елемент от страницата
    get : function(_elementId){
        return document.getElementById(_elementId);
    },

    getAll : function(_input){
        return document.querySelectorAll(_input);
    },
    
    //2. Добавяне на не съществуващ елемент към произволен елемент, вече съществуващ на HTML страницата.
    addChild : function(_parent,_childType, _childId, _content){
        var parent = this.get(_parent);
        var newChild = document.createElement(_childType);
        var newContent = document.createTextNode("");

        if(_content != undefined){
            newContent =  document.createTextNode(_content);
        }

        newChild.setAttribute("id", _childId);
        newChild.appendChild(newContent);
        parent.appendChild(newChild);

        return newChild;
    },

    //3. Изтриване на съществуващ елемент от HTML страницата
    removeElement : function(_elementId){
        var parent = document.getElementById(_elementId).parentNode;
        var element = document.getElementById(_elementId);
        parent.removeChild(element);
    },

    //4. Промяна на свойствата на избран елемент
    changeElementAttr : function(_elementId, _attrType, _attrValue){
        var element = document.getElementById(_elementId);

        if(typeof _attrValue == "object"){
            var styleString = "";

            for(var property in _attrValue){
                styleString += property + ": " + _attrValue[property] + "; ";
            }

            element.style = styleString;
        }
        else{
            element.setAttribute(_attrType, _attrValue);    
        }

        return element;
        
    },

    changeinnerHTML : function(_elementId, value){
        var element = document.getElementById(_elementId);
        element.innerHTML = value;

        return element;
    },

    changeInnerText : function(_elementId, value){
        var element = document.getElementById(_elementId);
        element.innerText = value;

        return element.innerText;
    },

    //5. Контрол на траверсирането спрямо селектираният елемент в това число
    getParent : function(_elementId){
        return document.getElementById(_elementId).parentElement;
    },

    getPreviousSibling : function(_elementId){
        return document.getElementById(_elementId).previousElementSibling;
    },

    getNextSibling : function(_elementId){
        return document.getElementById(_elementId).nextElementSibling;
    },

    getAllChildren : function(_elementId){
        return document.getElementById(_elementId).children;
    },

};





