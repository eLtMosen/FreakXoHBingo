 $(document).ready(function(){
   
   var usedArray = new Array(48);
   var baseArray = new Array(0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6);
   var number = 0;
   var base = 0;
   
   init();
   
	function init(){
		 for(var i = 0; i<48; i++){
			fillCard(i);
		 }
	 }
	  	 
	 function fillCard(i){
		 base = baseArray[i] * 1;
		 number = base + Math.floor(Math.random()*46);	
		 
		 if(usedArray[number] != true){
			$('#cell'+i).html('<img src="assets/images/'+ number +'.svg" width="75" height="75" border="0">');
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
		
		var toggle = this.style;
		toggle.backgroundColor = toggle.backgroundColor? "":"#00ff00";
		toggle.color = toggle.color? "":"#fff";
	 });

 });

