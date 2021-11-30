const calculate = (n1, operator, n2) => {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
    return result          
} 


const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType
  
    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }
    
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'
    }
      
  

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
       const firstValue = calculator.dataset.firstValue
       const operator = calculator.dataset.operator
       const secondValue = displayedNum

       
       if (
         firstValue && 
         operator &&
         previousKeyType !== 'operator' &&
         previousKeyType != 'calculate'
         ) {
           const calcValue = calculate (firstValue, operator, secondValue)
        
           display.textContent = calcValue
          
           
           //update calculated value as firstValue
           calculator.dataset.firstValue = calcValue
       } else {

          //if there are no calculations, set displayedNum as the firstValue
          calculator.dataset.firstValue = displayedNum
       }

      key.classList.add('is-depressed')
 //add a data-previous-key-type custom attribute to help us know if the previous key clicked was an operator
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action
    }

//remove the .is-depressed class from all keys, when the user clicks on a number key after clicking on an operator
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
   
    
    if (action === 'calculate') {
      let secondValue = displayedNum
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator

     if (firstValue) {
      if (previousKeyType === 'calculate') {
        firstValue = displayedNum
        secondValue = calculator.dataset.modValue
      }

      display.textContent = calculate(firstValue, operator, secondValue)
     }

       calculator.dataset.modValue = secondValue
       calculator.dataset.previousKeyType = 'calculate'
    }

    if (action != 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }
  
    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }

      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }
     
    
  }
})



