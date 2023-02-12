const expContainer = document.getElementById('expContainer')
const answer = document.getElementById('answer')

let expList = []
let expListCopy = []
let first = true

var openBracketCount = 0
var closedBracketCount = 0



function allClear(from){
    child = expContainer.lastElementChild
    while (child){
        expContainer.removeChild(child)
        child = expContainer.lastElementChild
    }

    if(from == 'ac'){
        expList = []
        answer.innerHTML = '0'
        answer.style.color = 'transparent'
        first = true
    }
}



function backspace(){

    if(expList.length != 0 && expList[expList.length - 1].length > 3){
        expList[expList.length - 1] = removeComma(expList[expList.length - 1])
    }

    if(expList.length == 0){

    }
    else if(expList[expList.length - 1].length > 1){
        expList[expList.length - 1] = expList[expList.length - 1].slice(0, -1)
        if(expList[expList.length - 1].length > 3){
            expList[expList.length - 1] = addComma(expList[expList.length - 1])
        }
        expContainer.lastElementChild.innerHTML = expList[expList.length - 1]
    }
    else if(expList[expList.length - 1].length == 1){
        if(expList[expList.length - 1] == '('){
            openBracketCount -= 1
        }
        else if(expList[expList.length - 1] == ')'){
            closedBracketCount -= 1
        }
        expList.pop()
        expContainer.removeChild(expContainer.lastElementChild)
        first = true
        answer.style.color = 'transparent'  
    }
    expContainerscrollRight()

    if(expList.length > 1){
        equals('backspace')
    }
}



function addNum(num){
    if(expList.length != 0 && expList[expList.length - 1].length > 3){
        expList[expList.length - 1] = removeComma(expList[expList.length - 1])
    }
    
    if(first){

        if(expList.length > 0){
            if(expList[expList.length - 1] == ')' || expList[expList.length - 1] == '%'){
                expList.push('×')
                var newOpe = document.createElement('span')
                newOpe.classList = 'expression operation'
                newOpe.innerHTML = '×'
                expContainer.appendChild(newOpe)
                first = true
            }
        }
        expList.push(num)
        first = false
    }

    else{
        expList[expList.length - 1] += num
        expList[expList.length - 1] = addComma(expList[expList.length - 1])
    }

    allClear('addnum')

    var index = 0

    while(index < expList.length){
        var newNum = document.createElement('span')
        if(isNaN(expList[index].replaceAll(',', ''))){
            newNum.classList = 'expression operation'
        }

        else{
            newNum.classList = 'expression'
        }

        newNum.innerHTML = expList[index]
        expContainer.appendChild(newNum)
        index += 1
    }
    expContainerscrollRight()

    if(expList.length > 1){
        equals('addnum')
    }
}



function addDecimal(){
    if(first){
        var newDec = document.createElement('span')
        newDec.classList = 'expression'
        newDec.innerHTML = '.'
        expContainer.appendChild(newDec)
        first = false
        expList.push('.')
    }
    else{
        if(expList.length > 1 && expList[expList.length - 1].indexOf('.') == -1){
            expList[expList.length - 1] += '.'
            expContainer.lastElementChild.innerHTML = expList[expList.length - 1]
        }
        else if(expList.length == 1 && expList[0].indexOf('.') == -1){
            expList[0] += '.'
            expContainer.lastElementChild.innerHTML = expList[0]
        }
        
    }
    expContainerscrollRight()

    if(expList.length > 1){
        equals('addDecimal')
    }
}



function addComma(value){
    if(value.indexOf('.') != -1){

        var dec = value.slice(value.indexOf('.'), value.length)
        value = value.slice(0, value.indexOf('.'))
    }
    
    else{
        var dec = ''
    }

    let o = new Intl.NumberFormat('en-us')
    let commas = o.format(value);
    value = commas
    value += dec
    return value
}



function removeComma(value){
    let currExp = value
    value = currExp.replaceAll(',', '')

    return value
}



function addOpe(ope){
    if(expList.length != 0){
        if(expList[expList.length - 1] == '('){
            
        }

        else if(expList[expList.length - 1] != '÷' && expList[expList.length - 1] != '×' && expList[expList.length - 1] != '−' && expList[expList.length - 1] != '+'){

            var befNum = expList[expList.length - 1]
            if(befNum[befNum.length - 1] == '.'){
                befNum += '0'
                expList[expList.length - 1] = befNum
                expContainer.lastElementChild.innerHTML = befNum
            }
            expList.push(ope)

            var newOpe = document.createElement('span')
            newOpe.classList = 'expression operation'
            newOpe.innerHTML = ope
            expContainer.appendChild(newOpe)
            first = true
        }

        
        else{
            var befNum = expList[expList.length - 2]
            if(befNum[befNum.length - 1] == '.'){
                befNum += '0'
                expList[expList.length - 2] = befNum
            }
            expList[expList.length - 1] = ope
            expContainer.lastElementChild.innerHTML = ope
        }
    }
    expContainerscrollRight()

    if(expList.length > 1){
        equals('addOpe')
    }
}

function addBracket(type){
    var newBracket = ''
    if(type == 'open'){
        if(!isNaN(expList[expList.length - 1].replaceAll(',', '')) || expList[expList.length - 1] == ')'){
            expList.push('×')
            var newOpe = document.createElement('span')
            newOpe.classList = 'expression operation'
            newOpe.innerHTML = '×'
            expContainer.appendChild(newOpe)
            first = true
        }
        newBracket = '('
        openBracketCount += 1
    }
    else if(type == 'closed'){
        newBracket = ')'
        closedBracketCount += 1
    }
    
    expList.push(newBracket)
    var newOpe = document.createElement('span')
    newOpe.classList = 'expression operation'
    newOpe.innerHTML = newBracket
    expContainer.appendChild(newOpe)
    first = true
    
    

    expContainerscrollRight()

    if(expList.length > 1){
        equals('addBracket')
    }
}

function expContainerscrollRight(){
    expContainer.scrollLeft = expContainer.scrollWidth
}

function equals(from){
    let tempExpList = expList.slice()

    var solution = ''

    while(tempExpList.indexOf('%') != -1){
        for(i = tempExpList.indexOf('%') - 1; i >= 0; i--){
            if(tempExpList[i] != '(' && tempExpList[i] != '÷' && tempExpList[i] != '×' && tempExpList[i] != '−' && tempExpList[i] != '+' && tempExpList[i] != ''){
                if(!isNaN(removeComma(tempExpList[i]))){

                    tempExpList[i] = tempExpList[i].replaceAll(',', '') / 100
                    tempExpList[i] = tempExpList[i].toString()
                    tempExpList.pop(tempExpList.indexOf('%'))
                }
            }
            else{
                break
            }
        }
    }
    for(var i = 0; i < tempExpList.length; i++){
        solution += tempExpList[i]
    }

    if(solution[solution.length - 1] == '÷' || solution[solution.length - 1] == '×' || solution[solution.length - 1] == '−' || solution[solution.length - 1] == '+'){
        solution = solution.slice(0, -1)
    }

    if(openBracketCount > closedBracketCount){
        for(var i = 0; i < (openBracketCount - closedBracketCount); i++){
            solution += ')'
        }
    }
    else if(openBracketCount < closedBracketCount){
        for(var i = 0; i < (closedBracketCount - openBracketCount); i++){
            solution = '(' + solution
        }
    }

    solution = solution.replaceAll('÷', '/')
    solution = solution.replaceAll('×', '*')
    solution = solution.replaceAll('−', '-')
    solution = solution.replaceAll(',', '')

    if(from == 'equals'){
        if(tempExpList.length > 1){

            if(answer.innerHTML == 'Error!'){
                answer.style.color = '#999999'
            }
            else{
                allClear('equals')
            
                var newNum = document.createElement('span')
                newNum.classList = 'expression'
                newNum.innerHTML = answer.innerHTML
                expContainer.appendChild(newNum)
                first = true
                answer.style.color = 'transparent'
    
                expList = []
            }
        }
    }
    else{
        try{
            solution = addComma(eval(solution).toString())
            answer.innerHTML = solution
            answer.style.color = '#999999'
        }
        catch(e){
            answer.innerHTML = 'Error!'
            answer.style.color = 'transparent'
        }
    }
}