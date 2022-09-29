var r= 0.2
var canvas;
var gl;


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL 2.0 isn't available" ); }
//draw circle
   //center values
    var cX=.75;
    var cY=.75;

    var colors = [ vec4( 0.0 , 0.0 , 0.0 , 1.0)]
    var vertices = [
          vec2(cX,cY),
          
    ];
   
    for (i = 0; i <= 100; i++){
        colors.push(vec4((i)/100.0, 0.0, 0.0 , 1.0));
        vertices.push(vec2(
           cX+ r*Math.cos(i*2*Math.PI/100),
           cY+ r*Math.sin(i*2*Math.PI/100) 
       ));
   }
//draw elipse
  //center values
   var eX=-.75;
   var eY=.75;


   vertices.push(vec2(-.75, .75))
   colors.push(vec4(1.0, 0.0, 0.0 , 1.0))
   for (i = 0; i <= 100; i++){
       colors.push(vec4(1.0, 0.0, 0.0 , 1.0));
       vertices.push(vec2(
          eX+ r*Math.cos(i*2*Math.PI/100),
          eY+ 0.6*r*Math.sin(i*2*Math.PI/100) 
      ));
  }

  //draw triangle
  vertices.push(vec2(0.0 , 1.0))
  vertices.push(vec2(0.3175 , .55))
  vertices.push(vec2(-0.3175 , .55))
  colors.push(vec4(1.0, 0.0, 0.0 , 1.0));
  colors.push(vec4(0.0, 0.0, 1.0 , 1.0));
  colors.push(vec4(0.0, 1.0, 0.0 , 1.0));

  //draw squares
   sX=0;
   sY=-.2;
   sR=.9
   var white= vec4(1.0 , 1.0, 1.0, 1.0)
   var black= vec4(0.0, 0.0, 0.0, 1.0)
   var isWhite= true
  while(sR>0){
   if (isWhite){
    colors.push(white)
    colors.push(white)
    colors.push(white)
    colors.push(white)
    isWhite=false
   }
   else{
    colors.push(black)
    colors.push(black)
    colors.push(black)
    colors.push(black)
    isWhite=true
   }
   vertices.push(vec2(sX+sR*Math.sin(Math.PI/4), sY+sR*Math.cos(Math.PI/4)));
   vertices.push(vec2(sX+sR*Math.sin(3*Math.PI/4), sY+sR*Math.cos(3*Math.PI/4)));
   vertices.push(vec2(sX+sR*Math.sin(5*Math.PI/4), sY+sR*Math.cos(5*Math.PI/4)));
   vertices.push(vec2(sX+sR*Math.sin(7*Math.PI/4), sY+sR*Math.cos(7*Math.PI/4)));
   sR=sR-.15
  }
     //  Configure WebGL

     gl.viewport( 0, 0, canvas.width, canvas.height );
     gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
      //  Load shaders and initialize attribute buffers
    
     var program = initShaders( gl, "vertex-shader", "fragment-shader" );
     gl.useProgram( program );
    
      // Load the data into the GPU
    
     var vbuffer = gl.createBuffer();
     gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
     gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
     var aPosition = gl.getAttribLocation( program, "aPosition" );
     gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
     gl.enableVertexAttribArray(aPosition);
    

     var cbuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, cbuffer);
     gl.bufferData(gl.ARRAY_BUFFER,flatten(colors), gl.STATIC_DRAW)
      // Associate out shader variable with our data buffer
    

     var aColor =gl.getAttribLocation(program , "aColor")
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT,false, 0, 0);
    gl.enableVertexAttribArray(aColor);
         render();
        

    };
    
    function render() {
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_FAN, 1, 101 );
        gl.drawArrays( gl.TRIANGLE_FAN, 102, 102 );
        gl.drawArrays(gl.TRIANGLES,204,3 );
        gl.drawArrays(gl.TRIANGLE_FAN,207,4)
        gl.drawArrays(gl.TRIANGLE_FAN,211,4)
        gl.drawArrays(gl.TRIANGLE_FAN,215,4)
        gl.drawArrays(gl.TRIANGLE_FAN,219,4)
        gl.drawArrays(gl.TRIANGLE_FAN,223,4)
        gl.drawArrays(gl.TRIANGLE_FAN,227,4)
    }