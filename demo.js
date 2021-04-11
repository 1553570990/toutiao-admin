const { gzip } = require("zlib");

let ARR = [1, 1, 'true', 'true', 15, 15, false, false, undefined, undefined, null, null, 'NaN', 'NaN', 0, 0, 'a', 'a', {}, {}]

function quchong1(arr) {
	var arr1 = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr1.indexOf(arr[i]) == -1) {
			arr1.push(arr[i])
		}
	}
	return arr1;
}

function quchong2(arr) {
	var arr1 = [];
	for (var i = 0; i < arr.length; i++) {
		if (!arr1.includes(arr[i])) {
			arr1.push(arr[i]);
		}
	}
	return arr1
}

function quchong3(arr) {
	var arr1 = [];
	let newArr = new Set(arr)
	return newArr
}
// console.log(quchong1(ARR));
// console.log(quchong2(ARR));
// console.log(quchong3(ARR));
var stringArray = ['this', 'is', 'baidu', 'name', 'is', 'sk'];
var result = stringArray.join(' ');
// console.log(result);
var daoxu = [1, 2, 3, 4, 5, 6];
// console.log(daoxu.reverse());
var shuzu = [3, 43, 2, 1, 13, 23, 124, 5, 9, 53];
shuzu.sort(function (a, b) {
	return b - a;
})
// console.log(shuzu);

var a = [1, 3, 4, 2, 2, 3, 4, 5, 5, 8, 8, 7, 75, 5, 8, 9, 1]

function quchong4(arr) {
	let newArr = [];
	for (var i = 1; i < arr.length;i++){
		if(arr.indexOf(arr[i]) == i){
			newArr.push(arr[i]);
		}
	}
	return newArr
}
// console.log(quchong4(a));
var b = [1,2,3,4,5,6,7]
var newArr = b.splice(1,2,'a','b');
// console.log(newArr,b);
// console.log(1,"1");
// console.log("1","1");
// console.log(1+"1");
// console.log("1"+1);
// var a = 1+"1";
// var b = "1"+1;
// var c = "1" + "1"
// console.log(a,b,c);
// console.log("1"+NaN);
// console.log("1"+undefined);0
// console.log("1",NaN);
// console.log(parseInt(NaN));
// console.log(parseInt("2afc11"));
// console.log(Number("123c"));
// var a = 11;
// var b = undefined;
// var c = null.toString()
// var b = NaN;
// console.log(a.toString(),b.toString());
// console.log(null === undefined);
// console.log( 0 == null);
// console.log(Array.isArray);
var obj = {
	id:1,
	name:"zhangsan",
	age:16
}
// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// var a = '1';
// var b = null;
// var c = undefined;
// var d = NaN;
// console.log(typeof(a));
// console.log(typeof(b));
// console.log(typeof(c));
// console.log(typeof(d));
// var foo = '11' + 2 -"1";
// var foo1 = '11' + 2;
// console.log(foo1);
// console.log(foo);
// var foo3 = 2-'1';
// console.log(foo3);
// var obj = ();
// console.log(obj);
var p1 = {
	"id":"007",
	"name":"刘德华",
	"books":new Array("三国演义","红楼梦","水浒传") //引用类型
}
// 浅拷贝
var p2 = {};
for(let key in p1){
	p2[key] = p1[key]
}
p2.books[0] = '西游记'
// console.log(p1);
// console.log(p2);
// 深拷贝
var p3 = {};
for(let key in p1){
	if(typeof p1[key] == 'object'){
		p3[key] = [];
		for(let i in p1[key]){
			p3[key][i] = p1[key][i]
		}
	}else{
		p3[key] = p1[key];
	}
}
p3.books[0] = "五至东"
// console.log(p3);
// console.log(p1);
var obj = [];
// console.log(undefined+NaN);
// var a = undefined;

// var b = NaN;
// console.log(a+b);

// var a = "123";
// var b = NaN;
// var a= NaN;
// var b = "undefined"
// console.log(a+b);
// console.log(null instanceof Object);
// console.log(typeof(null));
// console.log(typeof(Number));
// console.log(typeof(Object));
// function setN(obj){
// 	obj.name = "1";
// 	console.log(obj);
// 	obj = new Object();
// 	console.log(obj);
// 	obj.name = "2";
// }
// var per  = new Object();
// setN(per);
// console.log(per.name);

var c = {
	"id":"007",
	"name":"刘德华",
	"books":new Array("三国演义","红楼梦","水浒传")//这是引用类型
}
var c2 = {};
for(let key in c){
	c2[key] = c[key]
}
// console.log(p2);
// c2.books[0] = "盗墓笔记"
// console.log(c,'---',c2);

// 深拷贝
var c3 = {};
for(let key in c){
	if(typeof c[key] == "object"){
		c3[key] = [];
		for(let i in c[key]){
			c3[key][i] = c[key][i]
		}
	}else{
		c3[key] = c[key]
	}
}
c3.books[0] = "盗墓笔记";
// console.log(c);
// console.log(c3);

var g = {
	"id":"007",
	"name":"刘德华",
	"wife":{
		"id":"008",
		"name":"刘德的妻子",
		"address":{
			"city":"北京",
			"area":"海淀区"
		}
	}
}
function copyObj(obj){
	let newObj = {};
	for(let key in obj){
		if(typeof obj[key] == 'object'){
			newObj[key] = copyObj(obj[key]);
		}else{
			newObj[key] = obj[key];
		}
	}
	return newObj;
}
let g1 = copyObj(g);
g1.wife.name = "刘德华的父亲";
g1.wife.address.city = "上海"
// console.log(g);
// console.log(g1);
//数组的深拷贝
Array.prototype.copyself = function(){
	let arr = new Array();
	for(let i in this){
		arr[i] = this[i];

	}
	return arr;
}
function copyObj(obj){
	let newObj = {};
	for(var key in obj){
		if(obj[key] == 'object'){
			newObj[key] = obj[key].copyself();
		}else{
			newObj[key] = obj[key]
		}
	}
	return newObj;
}
var cNew = copyObj(c);
// console.log(cNew);
// var str = '12345678';
// str = str.split('').reverse().join("");
// console.log(str);?

// str = str.split("");
// str.splice(5,1);
// console.log(str.join(","));
// str = str.split(',')
// console.log(str);
var str = 'hello,world';
str = str.replace(/,/g,"");
console.log(str.split("").join(","));
