$(document).ready(function(){

   var benutzteKarten = new Array(53);
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
	      
	      var l = 1;
	      for(var k = 1; k<57; k++){
		  if(benutzteKarten[k] != true){
		  $('#fehlt'+l).html('<img src="images/'+ k +'.svg">');
		  l++;
		  }
	      }
	  }
	  	 
	  function karte_fuellen(i){
	      nummer = (Math.floor(Math.random()*57)+1);	
		 
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
	      $('div.resize img').css({'width' : '100px'});
	      $('div.resize img').css({'height' : '100px'});
	      $('div.resize td').css({'width' : '100px'});
	      $('div.resize td').css({'height' : '100px'});
	      $('div.resize').css({'width' : '750px'});
	      benutzteKartenZuruecksetzen();
	      init();
	  });
	  	
	  $('#klein').click(function(){
	      $('div.resize img').css({'width' : '75px'});
	      $('div.resize img').css({'height' : '75px'});
	      $('div.resize td').css({'width' : '75px'});
	      $('div.resize td').css({'height' : '75px'});
	      $('div.resize').css({'width' : '575px'});
	  });
	  $('#normal').click(function(){
	      $('div.resize img').css({'width' : '100px'});
	      $('div.resize img').css({'height' : '100px'});
	      $('div.resize td').css({'width' : '100px'});
	      $('div.resize td').css({'height' : '100px'});
	      $('div.resize').css({'width' : '750px'});
	  });
	  $('#mittel').click(function(){
	      $('div.resize img').css({'width' : '150px'});
	      $('div.resize img').css({'height' : '150px'});
	      $('div.resize td').css({'width' : '150px'});
	      $('div.resize td').css({'height' : '150px'});
	      $('div.resize').css({'width' : '1100px'});
	  });
	  $('#gross').click(function(){
	      $('div.resize img').css({'width' : '200px'});
	      $('div.resize img').css({'height' : '200px'});
	      $('div.resize td').css({'width' : '200px'});
	      $('div.resize td').css({'height' : '200px'});
	      $('div.resize').css({'width' : '1450px'});
	  });
	  $('#riesig').click(function(){
	      $('div.resize img').css({'width' : '300px'});
	      $('div.resize img').css({'height' : '300px'});
	      $('div.resize td').css({'width' : '300px'});
	      $('div.resize td').css({'height' : '300px'});
	      $('div.resize').css({'width' : '2150px'});
	  });
	 
	  $("#BingoBody td").click(function(){
	      $(this).toggleClass("gruene_zelle");
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

