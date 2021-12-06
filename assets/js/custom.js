

function UnCryptMailto( s )
  {
      var n = 0;
      var r = "";
      for( var i = 0; i < s.length; i++)
      {
          n = s.charCodeAt( i );
          if( n >= 8364 )
          {
              n = 128;
          }
          r += String.fromCharCode( n - 1 );
      }
      return r;
  }

  function linkTo_UnCryptMailto( s )
  {
      location.href=UnCryptMailto( s );
  }

function calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
