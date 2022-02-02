var queue = []; // animation queue
var scenes = ["time", "random", "analog"]; // scene order
var cur_scene = -1;

// paint artwork
drawClocks(); 

// kickoff
setTimeout(function(){

  setInterval( handleQueue, 10 );
  setInterval( nextScene, 12000);
  nextScene();

}, 150);

/**
 * animate to a scene
 */
function nextScene() {
  cur_scene = cur_scene<scenes.length-1?cur_scene+1:0;
  console.log( scenes[cur_scene] );
  switch(scenes[cur_scene]) {
      
    case "time":
      for (var col=0; col<23; col++) {
        for (var row=0; row<8; row++) {
          setClock( col, row, [90, -90] );
        }
      }
      var t = new Date();
      var vals = [
        t.getHours()<10 ? 0 : String(t.getHours()).substring(0, 1),
        t.getHours()<10 ? t.getHours() : String(t.getHours()).substring(1, 2),
        t.getMinutes()<10 ? 0 : String(t.getMinutes()).substring(0, 1),
        t.getMinutes()<10 ? t.getMinutes() : String(t.getMinutes()).substring(1, 2)
      ];
      setDigit( 1, vals[0] );  
      setDigit( 6, vals[1] );  
      setClock( 11, 2, [0, 180] );
      setClock( 11, 5, [0, 180] );
      setDigit( 12, vals[2] );  
      setDigit( 17, vals[3] );  
      break;
      
    case 'random':
      for (var col=0; col<23; col++) {
        for (var row=0; row<8; row++) {
          setClock( col, row, [Math.random()*360, Math.random()*360] );
        }
      }
      break;
      
    case 'analog':
      var t = new Date();
      for (var col=22; col>=0; col--) {
        for (var row=0; row<8; row++) {
          setClock( col, row, [t.getHours()*(360/12), t.getMinutes()*6] );
        }
      }
      break;
  }
}

/**
 * queues a complete digit of 5 x 6 clocks, starting at position n
 */
function setDigit( d, n ) {
  var svg, hour, minute, char, rots;
  var chars = charDB[n];
  for (var c=0; c<5; c++) {
    for (var r=0; r<6; r++) {
      setClock( c+d, r+1, mapDB[chars[r][c]] );
    }
  }
}

/**
 * queues a clock to particular rotations
 */
function setClock( c, r, rots ) {
  addToQueue("c-"+String(c)+"-"+String(r), rots);
}

function addToQueue(id, rots) {
    queue.push({id:id, hour:rots[0], minute:rots[1]});
}

function handleQueue() {
  if (queue.length) {
    var item = queue.shift();
    var svg = document.getElementById(item.id);
    var hour = svg.getElementsByTagName('line')[0];
    hour.style.transform = "translate(20px, 20px) rotate("+item.hour+"deg)";
    var minute = svg.getElementsByTagName('line')[1];
    minute.style.transform = "translate(20px, 20px) rotate("+item.minute+"deg)";
  }  
}

/**
 * draws all clocks
 */
function drawClocks() {
  var container = document.getElementById('container');
  for (var col=0; col<23; col++) {
    for (var row=0; row<8; row++) {
      // base svg
      var svg = createElem( 'svg', {viewBox:'0 0 40 40'}, {left:20+col*41, top:20+row*41} );
      svg.id = "c-"+String(col)+"-"+String(row);
      container.appendChild(svg);

      // clock plate
      var c = createElem( 'circle', {cx:20, cy:20, r:19} );
      svg.appendChild(c);

      // hands
      svg.appendChild( createElem( 'line', {x1:0, x2:14, class:"hour" } ) );
      svg.appendChild( createElem( 'line', {x1:0, x2:17, class:"minute"} ) );
      
      // initial
      var hour = svg.getElementsByTagName('line')[0];
      hour.style.transform = "translate(20px, 20px) rotate("+Math.round(Math.random()*360)+"deg)";
      var minute = svg.getElementsByTagName('line')[1];
      minute.style.transform = "translate(20px, 20px) rotate("+Math.round(Math.random()*360)+"deg)";
    }
  }
}

/**
 * svg factory
 */
function createElem(type, attribs, pos) {
  var elem = document.createElementNS('http://www.w3.org/2000/svg', type);
  for(var key in attribs) {
    elem.setAttributeNS(null, key, attribs[key]);
  }
  if (pos) {
    elem.style.left = pos.left ? pos.left+"px" : 0;
    elem.style.top = pos.top ? pos.top+"px" : 0;
  }
  return elem;
}

/**
 * map ascii drawing characters to rotations
 */
var mapDB = {
	'┘': [   0, -90],
	'└': [   0,  90],
	'┐': [ -90, 180],
	'┌': [  90, 180],
	'|': [   0, 180],
	'-': [ -90,  90] 
};

/**
 * maps digits to ascii drawing characters
 */
var charDB = [
	[ 
		'┌---┐',
		'|┌-┐|',
		'||-||',
		'||-||',
		'|└-┘|',
		'└---┘'
	], [ 
		'--┌┐-',
		'--||-',
		'--||-',
		'--||-',
		'--||-',
		'--└┘-'
	], [ 
		'┌---┐',
		'└--┐|',
		'┌--┘|',
		'|┌--┘',
		'|└--┐',
		'└---┘'
	], [ 
		'┌---┐',
		'└--┐|',
		'┌--┘|',
		'└--┐|',
		'┌--┘|',
		'└---┘'
	], [ 
		'┌┐-┌┐',
		'||-||',
		'|└-┘|',
		'└--┐|',
		'---||',
		'---└┘'
	], [ 
		'┌---┐',
		'|┌--┘',
		'|└--┐',
		'└--┐|',
		'┌--┘|',
		'└---┘'
	], [ 
		'┌┐---',
		'||---',
		'|└--┐',
		'|┌-┐|',
		'|└-┘|',
		'└---┘'
	], [ 
		'┌--┐-',
		'└-┐|-',
		'--||-',
		'--||-',
		'--||-',
		'--└┘-'
	], [ 
		'┌---┐',
		'|┌-┐|',
		'|└-┘|',
		'|┌-┐|',
		'|└-┘|',
		'└---┘'
	], [ 
		'┌---┐',
		'|┌-┐|',
		'|└-┘|',
		'└--┐|',
		'---||',
		'---└┘'
	]
];