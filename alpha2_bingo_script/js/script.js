$(document).ready(function(){

   var benutzteKarten = new Array(48);
   var gewinnArray = new Array(48);
   var matrixArray1 = ["0","1","2","3","4","5","6"];
   var matrixArray2 = [true,true,true,true,true,true,true];
   var nummer = 0;
      
   init();
	  function vergleicheArray(arr1, arr2) {
	      return $(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0
	  }

	  function pruefeTeilmenge(arr1, arr2) {
	      arr2.every(function (val) { return arr1.indexOf(val) >= 0; })
	  }
   	  
	  function init(){
	      for(var i = 0; i<48; i++){
		  karte_fuellen(i);
	      }
	  }
	  	 
	  function karte_fuellen(i){
	      nummer = (Math.floor(Math.random()*52)+1);	
		 
	      if(benutzteKarten[nummer] != true){
		  $('#zelle'+i).html('<img src="images/'+ nummer +'.svg">');
		      benutzteKarten[nummer] = true;
	      }else{
		  karte_fuellen(i);
	      }
	  }
	 
	  function benutzteKartenZuruecksetzen(){
	      for(var j = 0; j < benutzteKarten.length; j++){
	      benutzteKarten[j] = false;
	      }	
	  }
	 
	  $('#neueKarte').click(function(){
	      benutzteKartenZuruecksetzen();
	      init();
	  });
	 
	  $('td').click(function(){
	      this.style.backgroundColor = this.style.backgroundColor? "":"#00ff00";
	      gewinnArray[this.id.slice(5)] = true;
	      console.log(gewinnArray);
	      console.log(matrixArray2);
	      console.log(vergleicheArray(matrixArray2, matrixArray1));
	      $('#result1').html(vergleicheArray(matrixArray2, matrixArray1) ? 'true' : 'false');
	      $('#result2').html(pruefeTeilmenge(matrixArray1, matrixArray2) ? 'true' : 'false');

		  if(vergleicheArray(matrixArray2, gewinnArray)){
		      alert('bingo');
		  }
	  });
 });

