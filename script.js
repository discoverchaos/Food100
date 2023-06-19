const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 800,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 9000,
        kcall: 600
    },
    lettuce: {
        name: 'Салатный лист',
        price: 3000,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 5000,
        kcall: 30
    }
}
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
      checkExtraProd = document.querySelectorAll('.main__product-checkbox'),
      addCart        = document.querySelector('.addCart'),
      receipt        = document.querySelector('.receipt'),
      receiptOut     = receipt.querySelector('.receipt__window-out'),
      receiptWindow  = receipt.querySelector('.receipt__window'),
      btnReceipt     = receipt.querySelector('.receipt__window-btn');
      
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}
function plusOrMinus(POM) {
   const parent   = POM.closest('.main__product'),
         parentId = parent.getAttribute('id'),
         out      = parent.querySelector('.main__product-num'),
         price    = parent.querySelector('.main__product-price span'),
         kcall    = parent.querySelector('.main__product-kcall span'),
         POMType  = POM.getAttribute('data-symbol')
         if (POMType == '+' && product[parentId].amount < 10) {
            product[parentId].amount++
         }else if(POMType == '-' && product[parentId].amount > 0){
            product[parentId].amount--
         }
         out.innerHTML = product[parentId].amount
         price.innerHTML = product[parentId].Summ
         kcall.innerHTML = product[parentId].Kcall
}
for (let i = 0; i < checkExtraProd.length; i++) {
    checkExtraProd[i].addEventListener('click', function () {
        addExtraProd(this)
    })
}    
function addExtraProd(EP) {
    const parent   = EP.closest('.main__product'),
    parentId = parent.getAttribute('id'),
    price    = parent.querySelector('.main__product-price span'),
    kcall    = parent.querySelector('.main__product-kcall span'),
    EPType  = EP.getAttribute('data-extra')
    product[parentId][EPType] = EP.checked
    if (product[parentId][EPType]) {
        product[parentId].kcall += extraProduct[EPType].kcall
        product[parentId].price += extraProduct[EPType].price
    }else{
        product[parentId].kcall -= extraProduct[EPType].kcall
        product[parentId].price -= extraProduct[EPType].price
    }
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall
}

let arrayProduct = [],
    totalName    = '',
    totalPrice    = 0,
    totalKcall    = 0
    addCart.addEventListener('click', function () {
        for (const key in product) {
           const po = product[key]
            if (po.amount > 0) {
                po.name += ` X${po.amount}`
                arrayProduct.push(po)
                for (const infoKey in po) {
                    if(po[infoKey] === true){
                        po.name += '\n' + extraProduct[infoKey].name
                    }
                }
            }
            po.price = po.Summ
            po.kcall = po.Kcall
        }
        for (let i = 0; i < arrayProduct.length; i++) {
            const el = arrayProduct[i]
            totalPrice += el.price
            totalKcall += el.kcall
            totalName += '\n' + el.name + '\n'
        }
        receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость заказа ${totalPrice} сум`
        receipt.style.display = 'flex'
        setTimeout(() => {
            receipt.style.opacity = '1'
        }, 100);
        setTimeout(() => {
            receiptWindow.style.top = '0'
        }, 200);
        document.body.style.overflow = 'hidden'
})
btnReceipt.addEventListener('click', function () {
    location.reload()
})

const view      = document.querySelector('.view'),
      viewClose = document.querySelector('.view__close'),
      viewImage = document.querySelector('.view img'),
      prodImage = document.querySelectorAll('.main__product-info');
for (let i = 0; i < prodImage.length; i++) {
      prodImage[i].addEventListener('click', function (e) {
          img(this)  
          
      })  
}
function img(image) {
    view.classList.add('active')
    const img = image.querySelector('img').getAttribute('src')
    console.log(img);
    viewImage.setAttribute('src', img)
}
viewClose.addEventListener('click', function () {
    this.closest('.view').classList.remove('active')
})