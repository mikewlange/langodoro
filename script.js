$(document).ready(function(){
		//alert("halo");
		var sd, bd, rd, sbr = 0;	
		var sd_mili = 0;
		var date = 0;
		var countDownInterval = 0;
		var miliseconds = 0 ;
		var running_state = "session" ; //session, break, rest

		var countSession = 0;
		var countBreak	= 0;
		var countPomodoro = 0;

		var state = "state_0"; 
		/*
			state_0 = initiate
			state_1 = started
			state_2 = paused
			state_3 = stopped
			state_4 = resetted
			*/

		// initiate
		initParam();
		state_0();

		function state_0(){	// initiate
			$("#sd").val(sd);
			$("#sd").prev().val(sd);

			$("#bd").val(bd);
			$("#bd").prev().val(bd);

			$("#rd").val(rd);
			$("#rd").prev().val(rd);

			$("#sbr").val(sbr);
			$("#sbr").prev().val(sbr);

			running_state = "session" ;

			sd_mili = sd*60*1000;
			bd_mili = bd*60*1000;
			rd_mili = rd*60*1000;
			
			miliseconds = sd_mili;

			date = new Date(sd_mili);
			$(".minutes").html(displayNumber(date.getMinutes()));
			$(".second").html(displayNumber(date.getSeconds()));
			
			$('[name="start"]').attr("disabled",false);
			$('[name="pause"]').attr("disabled",true);
			$('[name="stop"]').attr("disabled",true);

			$("#progress").val(0);
			$("#progress").attr("max",sd_mili);

			$(".running_state").html("");
			$(".running_state").css("background-color","white");

			$(".info_session").html("0");
			$(".info_break").html("0");
			$(".info_pomodoro").html("0");
		}

		function state_1(){	//started (Run button is pressed)
			$('[name="start"]').attr("disabled",true);
			$('[name="pause"]').attr("disabled",false);
			$('[name="stop"]').attr("disabled",false);
		}

		function state_2(){	//paused (Pause button is pressed)
			$('[name="start"]').attr("disabled",false);
			$('[name="pause"]').attr("disabled",false);
			$('[name="stop"]').attr("disabled",false);
		}

		function initParam(){
		 	sd = 25;	// session duration
		 	bd = 5;		// break duration
		 	rd = 15;	// rest duration
		 	sbr = 4;	// number of session before rest
		 	console.log("Session duration: "+sd);
		 	console.log("Break duration: "+bd);
		 	console.log("Rest duration: "+rd);
		 	console.log("Session Before Rest: "+sbr);
		 	console.log("---");
		 }

		 function setParam(){
		 	sd = $("#sd").val();
		 	bd = $("#bd").val();
		 	rd = $("#rd").val();
		 	sbr = $("#sbr").val();
		 	console.log("Session duration: "+sd);
		 	console.log("Break duration: "+bd);
		 	console.log("Rest duration: "+rd);
		 	console.log("Session Before Rest: "+sbr);
		 	console.log("---");
		 }

		 function countDown(){
		 	var initProgress = $("#progress").val();
		 	$("#progress").val(initProgress+1000);

		 	if(sd_mili===0){	// WHEN "DOING TASK" IS OVER
		 		console.log("session end");
		 		countSession += 1;

		 		if(countSession % sbr === 0){
		 			miliseconds = rd_mili;
		 			running_state = "rest" ;
		 		}else{
		 			miliseconds = bd_mili;
		 			running_state = "break";		 			
		 		}
		 		sd_mili = sd*60*1000;
		 		$("#progress").val(0);
		 		$("#progress").attr("max",miliseconds);
		 	}

		 	if(bd_mili===0){	// WHEN "BREAK" IS OVER
		 		console.log("break end");
		 		countBreak += 1;
		 		miliseconds = sd_mili;
		 		bd_mili = bd*60*1000;
		 		running_state = "session";
		 		$("#progress").val(0);
		 		$("#progress").attr("max",miliseconds);
		 	}

		 	if(rd_mili===0){	// WHEN "REST" IS OVER
		 		console.log("rest end");
		 		countPomodoro += 1;
		 		miliseconds = sd_mili;
		 		rd_mili = rd*60*1000;
		 		running_state = "session";
		 		$("#progress").val(0);
		 		$("#progress").attr("max",miliseconds);
		 	}

		 	if(running_state=="session"){
		 		sd_mili -=1000;
		 		miliseconds = sd_mili;
		 	}else if(running_state=="break"){
		 		bd_mili -=1000;
		 		miliseconds = bd_mili;
		 	}else if(running_state=="rest"){
		 		rd_mili -=1000;
		 		miliseconds = rd_mili
		 	}

		 	date = new Date(miliseconds);

		 	console.log("STATE: "+running_state);
		 	console.log("var miliseconds: "+miliseconds);
		 	console.log("var session rem: "+sd_mili);
		 	console.log("var break rem: "+bd_mili);
		 	console.log("var rest rem: "+rd_mili);
		 	console.log("countPomodoro: "+countPomodoro);
		 	console.log("countSession: "+countSession);
		 	console.log("countBreak: "+countBreak);
		 	console.log(date.getMinutes()+":"+date.getSeconds());
		 	console.log(displayNumber(date.getMinutes())+":"+displayNumber(date.getSeconds()));
		 	console.log("Progress Value: "+ $("#progress").val());
		 	console.log("-------");

		 	$(".minutes").html(displayNumber(date.getMinutes()));
		 	$(".second").html(displayNumber(date.getSeconds()));

		 	displayRunningState(running_state);

		 	$(".info_session").html(countSession);
		 	$(".info_break").html(countBreak);
		 	$(".info_pomodoro").html(countPomodoro);
		 }

		 function displayRunningState(running_state){
		 	if(running_state==="session"){
		 		styleRunningState("Doing tasks","#c60509","white");
		 	}else if(running_state==="break"){
		 		styleRunningState("Take a break","green","white");
		 	}else if(running_state==="rest"){
		 		styleRunningState("Take a rest (Long Break)","blue","white");
		 	}
		 }

		 function styleRunningState(message,bgcolor,fontcolor){
		 		$(".running_state").html(message);
		 		$(".running_state").css("background-color",bgcolor);
		 		$(".running_state").css("color",fontcolor);
		 }

		 function displayNumber(number){
		 	if(number.toString().length===1){
		 		return "0"+number;
		 	}else{
		 		return number;
		 	}
		 }


		 $(".slider").on('input',function(){
		 	$(this).prev().val($(this).val());
		 });

		 $(".slider").on('change',function(){

		 	eval($(this).attr('id') +" = "+ $(this).val());

		 	if(countDownInterval){
		 		clearInterval(countDownInterval);
		 		countDownInterval = 0	
		 	}
		 	state_0();

		 	console.log("Session duration: "+sd);
		 	console.log("Break duration: "+bd);
		 	console.log("Rest duration: "+rd);
		 	console.log("Session Before Rest: "+sbr);
		 	console.log("---");

		 }) ;

		 $('[name="start"]').click(function(){
		 	state_1();
		 	countDownInterval = setInterval(function(){countDown();},1000);
		 });

		 $('[name="pause"]').click(function(){
		 	state_2();
		 	clearInterval(countDownInterval);
		 });

		 $('[name="stop"]').click(function(){
		 	clearInterval(countDownInterval);
		 	countDownInterval = 0;
		 	countSession = 0;
		 	countBreak	= 0;
		 	countPomodoro = 0;
		 	state_0();
		 });

		 $('[name="save"]').click(function(){
		 	setParam();
		 	if(countDownInterval){
		 		clearInterval(countDownInterval);
		 		countDownInterval = 0	
		 	}
		 	state_0();
		 });

		 $('[name="reset"]').click(function(){
		 	initParam();
		 	if(countDownInterval){
		 		clearInterval(countDownInterval);
		 		countDownInterval = 0	
		 	}
		 	state_0();
		 });

		});