 $(document).ready(function(){
   
   var usedArray = new Array(48);
   var winArray = new Array(48);
   var baseArray = new Array(0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6);
   var matrixArray1 = ["0","1","2","3","4","5","6"];
   var matrixArray2 = ["0","1","2","3","4","5","6"];
   var number = 0;
   var base = 0;
      
   init();
	function compareArrays(arr1, arr2) {
		  return $(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0
	}

	function checkSubset(arr1, arr2) {
		  arr2.every(function (val) { return arr1.indexOf(val) >= 0; })
	}
   	
    
	function init(){
		 for(var i = 0; i<48; i++){
			fillCard(i);
		 }
	 }
	  	 
	 function fillCard(i){
		 base = baseArray[i] * 1;
		 number = base + Math.floor(Math.random()*47);	
		 
		 if(usedArray[number] != true){
			$('#cell'+i).html('<img src="assets/images/'+ number +'.svg" width="100" height="100" border="0">');
				usedArray[number] = true;
			}else{
				fillCard(i);
			}
	 }
	 
	 function resetUsedNumbersArray(){
		for(var j = 0; j < usedArray.length; j++){
		usedArray[j] = false;
		}	
	 }
	 
	 $('#newCard').click(function(){
		resetUsedNumbersArray();
		init();
	 });
	 
	 $('td').click(function(){
		this.style.backgroundColor = this.style.backgroundColor? "":"#00ff00";
		winArray[this.id.slice(4)] = this.id.slice(4);
		console.log(winArray);
		console.log(matrixArray2);
		console.log(compareArrays(matrixArray2, matrixArray1));
		$('#result1').html(compareArrays(matrixArray2, matrixArray1) ? 'true' : 'false');
		$('#result2').html(checkSubset(matrixArray1, matrixArray2) ? 'true' : 'false');

		  if(compareArrays(matrixArray2, winArray)){
		  alert('bingo');
		  }
	 });
 


 });

