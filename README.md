# js-timer
Countdown timer class

## Example
```
function DebugPrint( s )
{
	console.log( s );

	if( s == 0 )
		alert( "Finished" );
};

var t = new Timer( "1:00", DebugPrint );
t.Start();

setTimeout( "t.Pause();", 4000 );
setTimeout( "t.Resume();", 8000 );
```
