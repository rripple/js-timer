
/**
 * Provides a timer like clock that counts backwards till zero
 *
 * @example new Timer( "10", pMyFunc ); // 10 seconds
 * @example new Timer( "10:00", pMyFunc ); // 10 Minutes
 * @example new Timer( "10:00:00", pMyFunc ); // 10 Hours
 */
var Timer = ( function()
{
	// Creates new object
	var CountDown = function( sTime, pCallBack )
	{
		this.sAllotedTime = sTime;
		this.pCallBack = pCallBack;

		this._bPaused = false;

		this._seconds = 0;

		if( sTime )
			this.SetTime( sTime );
	};

	// Format: hh:mm:ss
	CountDown.prototype.SetTime = function( s )
	{
		s = s.toString();

		var p = s.split( ':' );

		switch( p.length )
		{
			case 3:
				this._seconds = ( 60 * 60 ) * parseInt( p[0] );
				this._seconds += 60 * parseInt( p[1] );
				this._seconds += parseInt( p[2] );
				break;

			case 2:
				this._seconds = 60 * parseInt( p[0] );
				this._seconds += parseInt( p[1] );
				break;

			default:
				this._seconds = parseInt( s );
				break;
		}
	};

	/**
	 * Starts countdown
	 *
	 * If paused or determines finished, returns false
	 * else returns true
	 */
	CountDown.prototype.Start = function()
	{
		if( this._bPaused )
			return false;

		this._seconds--;

		if( this._seconds <= 0 )
		{
			this.pCallBack( false );
			return false;
		}

		if( typeof this.pCallBack == 'function' )
			this.pCallBack( this._seconds );
			// this.pCallBack( _.Format.Duration( this._seconds ) );

		setTimeout( this.Start.bind( this ), 1000 );

		return true;
	};

	// Pauses counter
	CountDown.prototype.Pause = function()
	{
		this._bPaused = true;
	};

	// Resumes countdown
	CountDown.prototype.Resume = function()
	{
		this._bPaused = false;

		this.Start();
	};

	return CountDown;
})();

/** Example Script
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
**/