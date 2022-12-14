var r= 0.1
var canvas;
var gl;


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = gl = canvas.getContext('webgl2');
    if ( !gl ) { alert( "WebGL 2.0 isn't available" ); }
//draw circle thing
   //center values
    var cX=0.5;
    var cY=0.5;

    var colors = [ vec4( 0.0 , 0.0 , 0.0 , 1.0)]
    var vertices = [
          vec2(cX,cY),
          
    ];
    
    var isDouble =false
    for (i = 0; i <= 100; i++){
        if (i%10<.5){
            if(!isDouble){
                r=r*2;
                isDouble=true;
               
            }
            else{r=r/2;
        isDouble=false;
        
    }
            
        }
        if(!isDouble){
            colors.push(vec4(0.0, 0.0, 1.0 , 1.0));}
            else{colors.push(vec4(0.0, 1.0, 0.0 , 1.0));}
           
        
        vertices.push(vec2(
           cX+ r*Math.cos(i*2*Math.PI/100),
           cY+ r*Math.sin(i*2*Math.PI/100) 
       ));
   }

   //trapezoid
    vertices.push(vec2(-.6, 0.5));
    vertices.push(vec2(0.0, 0.5));
    vertices.push(vec2(-.2, .8));
    vertices.push(vec2(-.4, 0.8));
    colors.push(vec4(0.0, 0.0, 0.0 , 1.0))
    colors.push(vec4(0.0, 1.0, 1.0 , 1.0))
    colors.push(vec4(1.0, 0.0, 1.0 , 1.0))
    colors.push(vec4(1.0, 1.0, 0.0 , 1.0))

    //spiral thing
   var cX=.0;
    var cY=.0;

    colors.push(vec4( 1.0 , 0.0 , 0.0 , 1.0))
   vertices.push(vec2(cX,cY));
          r=.5;
   
   
    for (i = 0; i <= 100; i++){
        colors.push(vec4((i)/100.0, 1.0, 0.0 , 1.0));
        vertices.push(vec2(
           cX+ r*Math.cos(i*2*Math.PI/100),
           cY+ r*Math.sin(i*2*Math.PI/100) 
       )
       );
       r=r*.985;
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
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 102 );
        gl.drawArrays( gl.TRIANGLE_FAN, 102, 4 );
        gl.drawArrays( gl.TRIANGLE_FAN, 106, 102 );
      
    }