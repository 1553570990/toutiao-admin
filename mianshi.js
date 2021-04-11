//删除数组中的虚值, 虚值有false, 0, "", null, NaN, undefined
// var arr = [0, "hello", "", NaN, 9, true, undefined, "world", false]; 
// let newArr = [];
// arr.forEach(item=>{
//     if(item){
//         newArr.push(item);
//     }
// })
// console.log(newArr);
let  fruits = ["banana", "apple", "orange", "watermelon", "apple", "orange", "grape", "apple"]
let quchong1 = Array.from(new Set(fruits));
let quchong2 = [...new Set(fruits)]
// console.log(quchong1);
// console.log(quchong2);
// console.log({}.valueOf);
var a = {}.valueOf();
var a2 = {}.toString();
var b = [].valueOf();
var b2 = [].toString();
// console.log(a,b);
// console.log(a2,'------',b2);
//删除数组中的虚值, 虚值有false, 0, "", null, NaN, undefined
var arr = [0, "hello", "", NaN, 9, true, undefined, "world", false]; 
var newArr = [];
arr.forEach(item =>{
    if(item){
        newArr.push(item);
    }
})
// console.log(newArr);
// 获取数组中唯一的值
var arr1 = [1, 2, 3, 3,3,"school","school",'ball',false,false,true,true]
let arr1_1 = [...new Set(arr1)];
// console.log(arr1_1);
var arr2 = [0, "hello", "", NaN, 9, true, undefined, "world", false]; 
// let arr2_2 = arr2.map(item=>{}).filter(Boolean);
let arr2_3 = arr2.filter(Boolean);
// console.log(arr2_3);




// 1.去除数组中的假值
var arr2 = [0, "hello", "", NaN, 9, true, undefined, "world", false]; 
var arr2_1 = [];
arr2.forEach(item=>{
    if(item){
        arr2_1.push(item);
    }
})
let arr2_2 = arr2.filter(Boolean);
// console.log(arr2_1,'----------',arr2_2);

//2.拿去数组中唯一的值
var arr3 = [1, 2, 3, 3,3,"school","school",'ball',false,false,true,true]
let arr3_1 = [... new Set(arr3)];
// console.log(arr3_1);

// 3.深拷贝
let obj1 = {
    name: '李四',
    age: 20,
    sex: null,
    flag: true,
    school: {
        name: '野鸡大学',
        grade: 2020,
        stuNo: 2020123456,
        colleges: '野鸡烧烤工程系',
    },
    say: () => {
        console.log('哇塞')
    }
}
// function deepClone(obj){
//     let objClone = Array.isArray(obj) ? []:{};
//     if(obj && typeof(obj) === 'object'){
//         for( key in obj){
//            if(obj[key] && typeof(obj[key]) === 'object'){
//                 objClone[key] = deepClone(obj[key])
//            }else{
//                 objClone[key] = obj[key];
//            }
//         }
//     }
//     return objClone;
// }
// let obj1_1 = deepClone(obj1);
// obj1_1.age = 30;
// obj1_1.school.grade = 2022;
// console.log(obj1_1);
// console.log(obj1);

// function deepClone(obj){
//     let obj_arr = Array.isArray(obj) ? [] : {};
//     if(obj && typeof obj === 'object'){
//         for(let key in obj){
//             if(obj[key] && typeof obj[key] === 'object'){
//                 obj_arr[key] = deepClone(obj[key]); 
//             }else{
//                 obj_arr[key] = obj[key];
//             }
//         }
//     }
//     return obj_arr;
// }
// let obj1_1 = deepClone(obj1);
// obj1_1.age = 30;
// obj1_1.school.grade = 2022;
// console.log(obj1_1);
// console.log(obj1);
// console.log(Object.prototype === ({}).__proto__); 
// console.log(Object.prototype);   //{}
// console.log(([]).__proto__);    //[]
// console.log(Function.prototype );
// console.log(new Function );

function fn(){
    let c = 2;
    console.log(c);
    {
        let c =3;
        console.log(c);
    }
    console.log(c);
}
fn();

// var b = function(){
//     console.log(2);
// }
// b();
//  console.log(c);
