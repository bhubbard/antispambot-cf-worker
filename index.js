addEventListener('fetch', event => {
	event.passThroughOnException() // Optional; you know best
	event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a given request object
 * @param {Request} request
 */
async function handleRequest(request) {
	const url = request.url

	// Function to parse query strings
	function getParameterByName(name) {
		name = name.replace(/[\[\]]/g, '\\$&')
		name = name.replace(/\//g, '')
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url)

		if (!results) return null
		else if (!results[2]) return ''
		else if (results[2]) {
			results[2] = results[2].replace(/\//g, '')
		}
		
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

  function clamp( value, min, max ) {
    return min < max
      ? (value < min ? min : value > max ? max : value)
      : (value < max ? max : value > min ? min : value)
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

	// Get Email from Parameter.
	var email = getParameterByName('email');

  if( email ) {
  // Debug Log Email to Console.
	//console.log(email);

  let antispambot_email = '';

    for ( let letter of email ) {
        switch ( getRandomInt( 0 + 1 + clamp( 0, 0, 1 ) ) ) {
            case 0:
                antispambot_email += `&#${letter.charCodeAt(0)};`;

                break;
            case 1:
                antispambot_email += letter;

                break;
            case 2:
                antispambot_email += `%${padStart(letter.charCodeAt(0).toString(16), 2, '0')}`;

                break;
        }
    }

    // Lot To Console.
    // console.log(antispambot_email.replace('@', '&#64;') );
    return new Response(antispambot_email.replace('@', '&#64;'));

  } else {
     return new Response( 'Please provide a email address with ?email=.' );
  }

}

