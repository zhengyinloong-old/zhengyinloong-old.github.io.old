function draw_clock(canvasid){
	var canvas = document.getElementById(canvasid);
	var ctx = canvas.getContext('2d');
	canvas.width = 500;
	canvas.height = 500;
	function Clock(){

		var x0 = canvas.width/2;
		var y0 = canvas.height/2;
		ctx.save();                //保存画笔状态
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.translate(x0,y0);        //转换画布参考坐标系原点
		var date = new Date();      //获取当前时间戳
		var hr = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds();
		hr = hr%12;
		//绘制表盘
		ctx.lineCap = 'round';      //画笔线端线帽设置为round(圆头)  / butt(默认) / square(方形)
		ctx.beginPath();
		ctx.arc(0,0,200,0,Math.PI * 2);
		ctx.moveTo(0,0);
		ctx.arc(0,0,4,0,Math.PI * 2);
		ctx.lineWidth = 9;
		ctx.strokeStyle = '#666';
		ctx.stroke();              //描边
		ctx.save();                //保存画笔状态
		//60分钟的刻度
		for(let i=0;i<60;i++){
			ctx.beginPath();
			ctx.moveTo(165,0);
			ctx.lineTo(175,0);
			ctx.lineWidth = 5;
			ctx.strokeStyle = 'greenyellow';
			ctx.stroke();
			ctx.rotate(Math.PI/30); //旋转画笔路径
			ctx.closePath();        //闭合画笔路径
		}
		ctx.restore();              //恢复画笔状态
		//12小时的刻度
		for(let i=0;i<12;i++){
			ctx.beginPath();
			ctx.moveTo(160,0);
			ctx.lineTo(180,0);
			ctx.lineWidth = 6;
			ctx.stroke();
			ctx.rotate(Math.PI/6);
			ctx.closePath();
		}
		//绘制秒针
		ctx.save();                //保存画笔状态
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.rotate(sec * Math.PI/30); //旋转画笔路径
		ctx.moveTo(0,0);
		ctx.lineTo(0,-155);
		ctx.stroke();
		ctx.restore();              //恢复画笔状态
		//绘制分针
		ctx.save();                //保存画笔状态
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.rotate((min + sec/60)* Math.PI/30); //旋转画笔路径
		ctx.moveTo(0,0);
		ctx.lineTo(0,-130);
		ctx.stroke();
		ctx.restore();              //恢复画笔状态
		//绘制时针
		ctx.save();                //保存画笔状态
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.rotate((hr + min/60 + sec/3600) * Math.PI/6 ); //旋转画笔路径
		ctx.moveTo(0,0);
		ctx.lineTo(0,-90);
		ctx.stroke();
		ctx.restore();              //恢复画笔状态

		ctx.restore();              //恢复画笔状态
	}
	requestAnimationFrame(function fun(){
		Clock();
		requestAnimationFrame(fun);
	})
}
