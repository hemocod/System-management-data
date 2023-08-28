// function total 1
// function create product  
// function save localstorge
// function inputs
// function read
// function delete
// function count
// function update
// function search
// function clean data 

let title= document.getElementById('title');
let price= document.getElementById('price');
let taxes= document.getElementById('taxes');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let submit= document.getElementById('submit');


let mood='create';
 
let tmp; // جدا مهم يحل مشاكل متقدمه  جعلناه متغير قلوبال مرئي للجميع فانكشن  لامكانيه الوصول اليه

//1  getTotal
function getTotal(){

if(price.value !=''){

    let result = (+price.value   +   +taxes.value   +   +ads.value )
     -  +discount.value;

     total.innerHTML= result;
     total.style.background = '#040';
     }else{
        total.innerHTML = '';
        total.style.background ='#791d1d';
}
}


// function create product 2


let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro=[];
}


// هنا تفصيله مهمه تحويل الحروف عشان عند البحث يكون كل شي تمام toLowerCase()

submit.onclick = function(){
    let newPro= {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    
    }

  // function  clean 
if(title.value !='' 
&& price.value != ''  
&& category.value != ''
&& newPro.count < 100){

    if(mood === 'create'){
        if(newPro.count > 1){
            for( let i=0 ; i <newPro.count;i++){
                dataPro.push (newPro);
            }
            }else{
                dataPro.push(newPro);
            }
      }else{
        dataPro[   tmp   ] =newPro;
        mood = 'create';
        submit.innerHTML = 'اضافة';
        count.style.display ='block';
      }
      clearData()
}


    // function save localstorge 3


    localStorage.setItem('product'  ,    JSON.stringify(dataPro)      )


    console.log(dataPro)

    
    showData()
}


//  function clean data 4
function clearData(){
    title.value ='';
    price.value='';
    taxes.value=' ';
    ads.value='' ;
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value ='';

}


// function read 5
function showData(){
     getTotal()
     let table ='';
     for (let i =0 ; i< dataPro.length;i++){
        table +=  `
           <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"id="update">تعديل</button> </td>
        <td><button onclick="deleteData(${i})" id="delete">حذف</button> </td>
     
    </tr>`
}
document.getElementById('tbody').innerHTML = table;
let btnDelete =document.getElementById('deletAll')
if(dataPro.length > 0){
    btnDelete.innerHTML = `
   <button onclick ="deleteAll()"> حذف الكل  (${dataPro.length})</button>
    `
}else{
    btnDelete.innerHTML ='';
}
}


showData()


// function delete 6 حذف نصر مححدد i
function deleteData(i){
   
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData() // عشان لما يحذف يرجع ويحدث الصفحه 
}
 
function deleteAll(){      // delet alll 
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// function update 8
function updateData(i){
  title.value =dataPro[i].title;
  price.value=dataPro[i].price;
  taxes.value=dataPro[i].taxes;
  ads.value=dataPro[i].ads ;
  discount.value=dataPro[i].discount ;
getTotal()
  count.style.display= 'none';
  category.value=dataPro[i].category;
  submit.innerHTML = 'تعديل';
  mood = 'update';
  tmp =i;
  scroll({
    top:0,
    behavior:'smooth'
  })
}


// search 9 
let searchMod ='title';

function getSearchMode(id){
    let search = document.getElementById('search');

  if(id == 'searchTitle'){
    searchMod = 'title';
    search.placeholder='البحث بالاسم';
  }else{
    searchMod =' category';
    search.placeholder='البحث بالفئة';
  }
  search.focus()
  search.value = ''
 showData();
}
     
        
  // part 2   
function searchData(value){
  
     let table ='';
    if (searchMod == 'title'){

    for (let i =0; i<dataPro.length; i++){
        if(dataPro[i].title.includes(value.toLowerCase())){


            table +=  `
            <tr>
         <td>${i+1}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].taxes}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
         <td><button onclick="updateData(${i})"id="update">updet</button> </td>
         <td><button onclick="deleteData(${i})" id="delete">delete</button> </td>
      
     </tr>`
         
        }
    }
    
    }else{
    
        
        for (let i =0; i<dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
    
    
                table +=  `
                <tr>
             <td>${i+1}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateData(${i})"id="update">updet</button> </td>
             <td><button onclick="deleteData(${i})" id="delete">delete</button> </td>
          
         </tr>`
             
            }
        }
  
    }
    document.getElementById('tbody').innerHTML = table;
}