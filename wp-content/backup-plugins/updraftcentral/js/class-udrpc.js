/**
 * Ported from the PHP version, class-udrpc.php
 *
 * (c) David Anderson 2015-
 * http://david.dw-perspective.org.uk
 *
 * Various things, which are mostly relevant to the server-side, are not ported (i.e. not included in this version). They will emit a message on console.log() if called. It is better to see this as a related library, rather than an exact port.
 */

var UpdraftPlus_Remote_Communications = function(key_name_indicator, can_generate) {
	
	// Version numbers are internal to this library only - e.g. not comparable with the PHP port
	this.version = '0.3.3 (27/July/2016)';
	
	// Local storage
	this.key_name_indicator = '';
	
	this.key_remote = false;
	this.key_local = false;
	
	this.can_generate = false;
	
	this.destination_url = false;
	
	this.maximum_replay_time_difference = 300;
	this.extra_replay_protection = false;
	
	// Levels: 1 (basic debugging), 2 (deep - e.g. cryptographic internals)
	this.debug_level = 0;
	
	this.seen_hashes = {};
	
	this.cors_headers_wanted = 1;
	
	// The legacy message format (1) is not supported
	this.format = 2;

	this.time_correction_sec = 0;
	
	this.http_credentials = {};
	
	this.auth_method = 'jquery';
	
	this.message_wrapper = false;
	this.message_unwrapper = false;
	
	this.message_random_number = false;

	// Default parameters
	key_name_indicator = typeof key_name_indicator !== 'undefined' ? key_name_indicator : 'default';
	can_generate = typeof can_generate !== 'undefined' ? can_generate : false;
	
	/**
	 * Get the time now, in seconds, according to the browser, as corrected by any previously supplied correction
	 *
	 * @returns {int} the time in seconds since the UNIX epoch
	 *
	 * @see register_time
	 */
	this.time_now = function() {
		var time_now = Math.floor(Date.now() / 1000) + this.time_correction_sec;
		return time_now;
	}
	
	/**
	 *  Pass in the time from the server, on the supposition that it is more likely to be accurate than the time on the client. The replay window protections in the library rely upon accurate, agreed time between the two ends. The point is not to get an absolutely accurate time; but one close enough to the reality such that both ends of the conversation are likely to be able to agree on it.
	 *
	 * @param {number} server_time - the time in seconds (anything more accurate is pointless, given that it came over the network, and given the algorithm below)
	 * @returns {void}
	*/
	this.register_time = function(server_time) {
		if (typeof server_time == 'undefined') return;
		var time_now = Math.floor(Date.now() / 1000);
		var diff = server_time - time_now;
		if (Math.abs(diff) > 120) {
			console.log("UDRPC: Time difference detected; time_now="+time_now+", server_time="+server_time+", store_diff="+diff);
			this.time_correction_sec = diff;
		}
	}
	
	/**
	* Left-pads a string with the supplied padding
	*
	* @param {string} padwith - a string of what to left-pad with, equal in length to the final desired string
	* @param {string} string - the string to be padded
	* @returns {string} the left padded string
	*/
	this.paddingleft = function(padwith, string) {
		return String(padwith + string).slice(-padwith.length);
	};
	
	/**
	 * Set the key name indicator for all future communications. The key name indicator is sent, unencrypted to the remote side, to enable the remote side to know which decryption key to use (analogous to SNI in the TLS protocol).
	 *
	 * @param {string} key_name_indicator -
	 * @returns {void}
	 */
	this.set_key_name_indicator = function(key_name_indicator) {
		this.key_name_indicator = key_name_indicator;
	}
	
	/**
	 * Indicate whether the remote application should set CORS headers in its reply.
	 *
	 * @param {boolean} [wanted=true] - whether to request that the remote application should include CORS headers in its reply
	 * @returns {void}
	 */
	this.set_cors_headers_wanted = function(wanted) {
		wanted = ('undefined' === typeof wanted) ? true : wanted;
		this.cors_headers_wanted = wanted;
	}
	
	/**
	 * Indicate that if a key is needed and not set by the caller, then one can be generated
	 *
	 * @param {boolean} [can_generate=true] - indicate whether or not a key can be generated
	 * @returns {void}
	 */
	this.set_can_generate = function(can_generate) {
		this.can_generate = typeof can_generate !== 'undefined' ? can_generate : true;
	}
	
	/**
	 * Sets the maximum time that can pass before a message will be rejected as too old (and likely a replay)
	 *
	 * @param {number} replay_time_difference - the number of seconds
	 * @returns {void}
	 */
	this.set_maximum_replay_time_difference = function(replay_time_difference) {
		this.maximum_replay_time_difference = parseInt(replay_time_difference);
	}
	
	/**
	 * Set the debugging level - controlling how much info is logged in the JS console. This may include keys and other cryptographic information. Though, it your security depends on the user not reading their JavaScript console, then you need to re-think.
	 *
	 * @param {number} [debug_level=1] - an integer, with higher numbers indicating more debugging; zero to indicate no debugging
	 * @returns {void}
	 */
	this.set_debug_level = function(debug_level) {
		this.debug_level = typeof debug_level !== 'undefined' ? debug_level : 1;
		if (this.debug_level) {
			console.log("UDRPC: Debug mode activated (level: "+debug_level+")");
		}
	}
	
	/**
	 * Log an error if the cryptography library is not loaded. This function doesn't actually ensure it's loaded - that is left up to the composer of the application - but, we do log in case it's not, to assist debugging.
	 *
	 * @returns {void}
	 */
	this.ensure_crypto_loaded = function() {
		if ('undefined' == typeof forge) {
			console.log("UDRPC JS: No loaded forge library found (you should make sure it has loaded before calling UDRPC functions)");
			throw "No loaded forge library found (you should make sure it has loaded before calling UDRPC functions)";
		}
	}
	
	/**
	 * Sets the destination URL for any remote calls to be made
	 *
	 * @param {string} destination_url - the destination URL to send messages to
	 * @returns {void}
	 */
	this.set_destination_url = function(destination_url) {
		this.destination_url = destination_url;
	}
	
	/**
	 * Sets a wrapper (container) for any remote calls to be made
	 *
	 * @param {Object|boolean} message_wrapper - if set, then the actual message will be placed in this object as the property 'wrapped_message', before being sent (instead of being sent directly). To unset, set it to false.
	 * @returns {void}
	 */
	this.set_message_wrapper = function(message_wrapper) {
		this.message_wrapper = message_wrapper;
	}
	
	/**
	 * Unwrap the call back - unwrapperCallback
	 *
	 * @param {*} data - The response data, which the unwrapper should unwrap
	 *
	 * @returns {Object|Boolean} - the unwrapped data, or false if there was a problem and execution should return
	 */
	
	/**
	 * Sets a function to be used to unwrap the results of any remote calls made
	 *
	 * @param {unwrapperCallback} message_unwrapper - the function to be called to unwrap the message
	 * @returns {void}
	 */
	this.set_message_unwrapper = function(message_unwrapper) {
		this.message_unwrapper = message_unwrapper;
	}
	
	/**
	 * This is an unused function in the JavaScript port, and will simply log a message to the console
	 *
	 * @param {*} [key_option_name] - unused parameter
	 * @returns {void}
	 */
	this.set_option_name = function(key_option_name) {
		console.log("UDRPC: set_option_name() called - which is wrong/unnecessary in the JavaScript port");
	}
	
	/**
	 * Get the remote site's (public) key
	 *
	 * @returns {string|boolean} - the public key; or false if none has been set
	 */
	this.get_key_remote = function() {
		if (!this.key_remote && this.can_generate) {
			this.generate_new_keypair();
		}
		return this.key_remote ? this.key_remote : false;
	}
	
	/**
	 * Get the remote site's (public) key
	 *
	 * @param {string} key_remote - the remote site's (public) key, in PEM format
	 * @returns {void}
	 */
	this.set_key_remote = function(key_remote) {
		this.key_remote = key_remote;
	}
	
	/**
	 * Get the local site's (private) key
	 *
	 * @returns {string|boolean} - the local site's (private) key, in PEM format; or false if none has been set
	 */
	this.get_key_local = function() {
		if (!this.key_local && this.can_generate) {
			this.generate_new_keypair();
		}
		return this.key_local ? this.key_local : false;
	}
	
	/**
	 * Unimplemented function in the JavaScript library
	 *
	 * @param {*} bundle - unused parameter
	 * @param {*} format - unused parameter
	 * @returns {boolean} - unimplemented function, always returns false
	 */
	this.decode_portable_bundle = function(bundle, format) {
		format = typeof format !== 'undefined' ? format : 'raw';
		this.unimplemented_function('decode_portable_bundle');
		return false;
	}
	
	/**
	 * An unimplemented function to get a portable bundle sufficient to contact this site (i.e. remote site - so you need to have generated a key-pair, or stored the remote key somewhere and restored it)
	 *
	 * @param {string} [format='raw'] - either 'raw' or 'base64_with-count' - the output format to use
	 *
	 * @returns {boolean} - unimplemented function, always returns false
	 */
	this.get_portable_bundle = function(format) {
		format = typeof format !== 'undefined' ? format : 'raw';
		this.unimplemented_function('get_portable_bundle');
		return false;
	}
	
	/**
	 * Set the local (private) key to be used for decryption
	 *
	 * @param {string} key_local - the key to be used, in PEM format
	 * @returns {void}
	 */
	this.set_key_local = function(key_local) {
		this.key_local = key_local;
	}
	
	/**
	 * Logs the fact that an unimplemented function has been called
	 *
	 * @param {string} funcname - A name of a function that is undefined
	 * @returns {void}
	 */
	this.unimplemented_function = function(funcname) {
		console.log("UDRPC: Unimplemented function in JavaScript port called: "+funcname);
	}
	
	/**
	 * Unimplemented function - merely logs the fact that it was called
	 *
	 * @returns {boolean} - unimplemented function, always returns false
	 */
	this.generate_new_keypair = function() {
		this.unimplemented_function('generate_new_keypair');
		return false;
	}
	
	/**
	 * Encrypts the given message
	 *
	 * @param {string} plaintext - the message to be encrypted
	 * @param {string|boolean} [use_key=false] - the RSA public key to use to encrypt the message (in PEM format); if false, then the remote key (set with set_key_remote()) will be used.
	 * @param {numeric} [key_length=32] - the length to use for the random symmetric key that is generated (AES-CBC)
	 *
	 * @returns {string} - the encrypted message, in the UDRPC format
	 */
	this.encrypt_message = function(plaintext, use_key, key_length) {
		
		use_key = typeof use_key !== 'undefined' ? use_key : false;
		
		if (!use_key && !this.key_remote) throw 'No encryption key has been set';
		
		if (!use_key) use_key = this.key_remote;

		this.ensure_crypto_loaded();
		
		var pub_key = forge.pki.publicKeyFromPem(use_key);
		
		if (typeof key_length === 'undefined') {
			var pub_key_length = Math.ceil(pub_key.n.bitLength() / 8);
			// Catch the case of 512-bit private keys - which otherwise cause an error from the encrypt call below, because only 22 bytes can be encrypted to a 512-bit private key.
			if (pub_key_length < 65) {
				key_length = 16;
			} else {
				key_length = 32;
			}
		}
		
		// Generate Random Symmetric Key
		var sym_key = forge.random.getBytesSync(key_length);
		if (this.debug_level > 1) console.log("Generated symmetric key, in hex: "+forge.util.bytesToHex(sym_key));
		
		// Encrypt Message with new Symmetric Key
		var cipher = forge.cipher.createCipher('AES-CBC', sym_key);
		
		cipher.start({iv: ''});
		cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)));
		cipher.finish();
		var ciphertext = cipher.output;
		
		if (this.debug_level > 1) console.log("Ciphertext, in hex (PHP equiv: bin2hex): "+forge.util.bytesToHex(ciphertext));
		
		ciphertext = forge.util.encode64(ciphertext.bytes());
		if (this.debug_level > 1) console.log("Ciphertext, in base64: "+ciphertext);
		
		// Encrypt the Symmetric Key with the Asymmetric Key
		sym_key = pub_key.encrypt(sym_key, 'RSA-OAEP');
		if (this.debug_level > 1) console.log("Symmetric key, after being encrypted with the assymetric key, in hex: "+forge.util.bytesToHex(sym_key));
		
		// Base 64 encode the symmetric key for transport
		sym_key = forge.util.encode64(sym_key);
		if (this.debug_level > 1) console.log("Encrypted symmetric key, in base 64: "+sym_key);
	
		var len = sym_key.length;
		if (this.debug_level > 1) console.log("Key length (decimal): "+len);
		// This converts to hex
		len = len.toString(16);
		len = this.paddingleft('000', len);
		
		// 16 characters of hex is enough for the payload to be to 16 exabytes (giga < tera < peta < exa) of data
		var cipherlen = ciphertext.length;
		if (this.debug_level > 1) console.log("Cipher length (decimal): "+cipherlen);
		cipherlen = cipherlen.toString(16);
		cipherlen = this.paddingleft('0000000000000000', cipherlen);
		
		if (this.debug_level > 1) {
			console.log("Length, hexed + padded (3): "+len);
			console.log("Cipherlength, hexed + padded (16): "+cipherlen);
		}
		
		// Concatenate the length, the encrypted symmetric key, and the message
		return len+sym_key+cipherlen+ciphertext;
		
	}
	
	/**
	 * Decrypts the passed message, using the private key (which needs to be previous set with set_key_local())
	 *
	 * @param {string} message - the message to decrypt, in UDRPC format
	 *
	 * @returns {string} - the decrypted message
	 */
	this.decrypt_message = function(message) {
		
		if (!this.key_local) throw new Exception('No decryption key has been set');
		
		this.ensure_crypto_loaded();
		
		// Extract the Symmetric Key
		var len = message.substr(0, 3);
		if (this.debug_level > 1) console.log("Key length (hex + passed): "+len);
		
		// Convert to decimal
		len = parseInt(len, 16);
		if (this.debug_level > 1) console.log("Key length (decimal): "+len);
		
		var sym_key = message.substr(3, len);
		if (this.debug_level > 1) console.log("Encrypted symmetric key, base64-encoded: "+sym_key);
		sym_key = forge.util.decode64(sym_key);
		if (this.debug_level > 1) console.log("Encrypted symmetric key, in hex: "+forge.util.bytesToHex(sym_key));
		
		// Extract the encrypted message
		var cipherlen = message.substr(len+3, 16);
		if (this.debug_level > 1) console.log("Ciphertext length (hex + passed): "+cipherlen);

		// Convert to decimal
		cipherlen = parseInt(cipherlen, 16);
		if (this.debug_level > 1) console.log("Ciphertext length (decimal): "+cipherlen);
		
		var ciphertext = message.substr(len+19, cipherlen);
		if (this.debug_level > 1) console.log("Ciphertext (base64): "+ciphertext);
		
		ciphertext = forge.util.decode64(ciphertext);
		
		if (this.debug_level > 1) console.log("Ciphertext, in hex (PHP equiv: bin2hex): "+forge.util.bytesToHex(ciphertext));
		
		var privKey = forge.pki.privateKeyFromPem(this.key_local);
// var pubKey = forge.pki.rsa.setPublicKey(privKey.n, privKey.e);
		
		if (this.debug_level > 1) console.log("Attempting to decrypt symmetric key");

		// Decrypt the RSA-encrypted symmetric key
		var sym_key = privKey.decrypt(sym_key, 'RSA-OAEP');
		if (this.debug_level > 1) console.log("Generated symmetric key, after being decrypted, in hex: "+forge.util.bytesToHex(sym_key));

		var decipher = forge.cipher.createDecipher('AES-CBC', sym_key);
		// Keys are only used once - no unique IV is needed
		decipher.start({iv: ''});
		decipher.update(forge.util.createBuffer(ciphertext));
		decipher.finish();

		// Return the plaintext
		return forge.util.decodeUtf8(decipher.output);
		
	}
	
	/**
	 * Creates a message which the caller can then format and send as required (e.g. use as body in post, or JSON-encode, etc.)
	 *
	 * @param {string} command - the command to pass to the receiving side
	 * @param {*} [data=null] - any data associated with the command
	 * @param {boolean} [is_response=false] - whether this message is a response to an incoming message (in which case, the format slightly varies)
	 * @param {string|boolean} [use_key_remote=false] - the RSA public key to encrypt to, in PEM format; if false, then the key set with set_key_remote() will be used
	 * @param {string|boolean} [use_key_local=false] - the RSA private key to sign with, in PEM format; if false, then the key set with set_key_local() will be used
	 *
	 * @returns {Array} - the message
	 */
	this.create_message = function(command, data, is_response, use_key_remote, use_key_local) {
		
		use_key_remote = typeof use_key_remote !== 'undefined' ? use_key_remote : false;
		use_key_local = typeof use_key_local !== 'undefined' ? use_key_local : false;
		data = typeof data !== 'undefined' ? data : null;
		is_response = typeof is_response !== 'undefined' ? is_response : false;
		
		var send_array = {};
		if (is_response) {
			send_array.response = command;
		} else {
			send_array.command = command;
		}

		if (this.cors_headers_wanted) { send_array.cors_headers_wanted = 1; }
		
		// UNIX time
		send_array.time = this.time_now();
		// This goes in the encrypted portion as well to prevent replays with a different unencrypted name indicator
		send_array.key_name = this.key_name_indicator;
		
		// This random element means that if the site needs to send two identical commands or responses in the same second, then it can, and still use replay protection
		// We store it so that the caller can access it, if wanted
		// The maximum is the value of PHP_INT_MAX on a 32-bit platform
		this.message_random_number = Math.round(Math.random() * 2147483647);
		send_array.rand = this.message_random_number;
		
		// Not implemented
		// if (this.next_send_sequence_id) {
			// $send_array['sequence_id'] = this.next_send_sequence_id;
			// this.next_send_sequence_id++;
		// }
		
		if (null !== data) send_array.data = data;
		
		var send_data = this.encrypt_message(JSON.stringify(send_array), use_key_remote);
		
		// This library only supports format 2. So, we don't need to compare the format before adding the signed hash.
		var raw_message = {
			format: this.format,
			key_name: this.key_name_indicator,
			udrpc_message: send_data,
			signature: this.signature_for_message(send_data, use_key_local)
		};
		
		var message = raw_message;
		
		// Optional - if the request is being proxied and needs a wrapper
		if (this.message_wrapper !== false) {
			message = this.message_wrapper;
			message.wrapped_message = raw_message;
		}
		
		return message;
		
	}

	/**
	 * Returns a base-64 encoded RSA hash (PKCS_1) of the message digest
	 *
	 * @param {string} message - the message to be hashed
	 * @param {string|boolean} [use_key=false] - the RSA key to use for calculating the hash, in PEM format. If false, then the value of this.key_local will be used.
	 *
	 * @returns {string} the signature
	 */
	this.signature_for_message = function(message, use_key) {
		
		use_key = typeof use_key !== 'undefined' ? use_key : false;
		
		if (!use_key && !this.key_local) throw 'No encryption key (local) has been set';
		
		if (!use_key) use_key = this.key_local;
		
		this.ensure_crypto_loaded();
		
		// This isn't yet variable
		var hash_algorithm = 'sha256';

		var md = forge.md.sha256.create();
		md.update(message, 'utf8');

		var privateKey = forge.pki.privateKeyFromPem(use_key);
		// Defaults to RSASSA PKCS#1 v1.5, but it doesn't hurt to specify
		
		var signature = privateKey.sign(md, 'RSASSA-PKCS1-V1_5');

		var encoded = forge.util.encode64(signature);
		
		if (this.debug_level > 0) {
			console.log("Hash ("+hash_algorithm+") (follows)");
			console.log(md);
			if (this.debug_level > 1) {
				console.log("Signature (raw): "+signature);
				console.log("Signature (base64-ed): "+encoded);
			}
		}
		
		return encoded;
	}
	
	/**
	 * Verify that a message's signature is correct. Note that Only SHA256 is supported; the passed hash_algorithm parameter is ignored.
	 *
	 * @param {string} message - the message whose signature is to be validated
	 * @param {string} signature - the SHA256 signature for the message.
	 * @param {string} key - the public key, in PEM format, for verifying the signature with
	 * @param {string} hash_algorithm - ignored (the signature is always treated as being a SHA256 hash)
	 *
	 * @returns {boolean} - the result
	 */
	this.verify_signature = function(message, signature, key, hash_algorithm) {

		hash_algorithm = typeof hash_algorithm !== 'undefined' ? 'sha256' : false;
		this.ensure_crypto_loaded();
		
		var md = forge.md.sha256.create();
		md.update(message, 'utf8');
		var digest = md.digest().bytes();
		
		var publicKey = forge.pki.publicKeyFromPem(key);
		
		if (this.debug_level > 1) {
			// console.log("UDRPC: publicKey for verifying with: "+key);
			console.log("UDRPC: verify_signature: message hash (hex): "+forge.util.bytesToHex(digest));
			// console.log("UDRPC: verify_signature: message hash (base64): "+forge.util.encode64(digest));
			// console.log("UDRPC: verify_signature: signature (len="+signature.length+") (hex): "+forge.util.bytesToHex(signature));
			console.log("UDRPC: verify_signature: signature (len="+signature.length+") (existing base64): "+signature);
		}
		
		var verified = publicKey.verify(digest, forge.util.decode64(signature));

		if (this.debug_level > 0) console.log("UDRPC: verify signature: result: "+verified);
		
		return verified;
	}
	
	/**
	 * Activate, or de-activate, additional replay protection. This stores message hashes, and compares new messages with previous hashes to detect replays. (Since each message contains both a random and a time-based element, no clashes are expected).
	 *
	 * @param {boolean} [activate=true] - whether or not to activate replay protection
	 * @returns {void}
	 */
	this.activate_replay_protection = function(activate) {
		this.extra_replay_protection = typeof activate !== 'undefined' ? activate : true;
	}
	
	/**
	 * Set HTTP credentials, for all future HTTP calls
	 *
	 * @param {Object} http_credentials - a object for which useful properties are properties 'username' and 'password'
	 * @returns {void}
	 */
	this.set_http_credentials = function(http_credentials) {
		this.http_credentials = http_credentials;
	}
	
	/**
	 * Set the authorisation method - whether jQuery, or manual (set the Authorization header explicitly)
	 *
	 * @param {string} auth_method - either 'jquery' or 'manual', according to how you want the authorisation to be carried out
	 * @returns {void}
	 */
	this.set_auth_method = function(auth_method) {
		this.auth_method = auth_method;
	}
	
	// this.set_next_send_sequence_id = function(id) {}
	
	/**
	 * Post reponse callback - PostResponseCallback
	 *
	 * @param {String} body - The body of the HTTP response
	 * @param {String} status - The status description returned from jQuery, e.g. 'success'|'error'
	 * @param {*} data - Data accompanying the response. In the case of status being 'error', this will be a string giving the error code.
	*/
	
	/**
	 * Sends an HTTP POST request to the specified destination with the specified data
	 *
	 * @param {string} url - the URL to send the POST request to
	 * @param {Object|null} spinner_where - where to place a spinner object in the DOM during the request
	 * @param {*} data - the data to send to as the data for the POST request
	 * @param {postResponseCallback} response_callback - callback function to be called with the response
	 * @param {number} [timeout=30] - the number of seconds after which the HTTP request whould time-out
	 * @returns {void}
	 */
	this.send_post = function(url, spinner_where, data, response_callback, timeout) {
		timeout = typeof timeout !== 'undefined' ? timeout : 30;
		if (spinner_where) {
			jQuery(spinner_where).addClass('updraftcentral_spinner');
		}
		try {
			if (this.debug_level > 0) console.log("send_post: "+url);
			
			// https://api.jquery.com/jquery.ajax/
			var ajax_options = {
				type: 'POST',
				url: url,
				data: data,
				dataType: 'text',
				// This header ensures that it won't be a "simple" CORS request, which has the bonus of making the CORS path predictable (rather than some 'simple', some not)
				headers: {
					'X-Secondary-User-Agent': 'class-udrpc.js/'+this.version
				},
				timeout: timeout * 1000, // In ms
				success: function(response) {
					if (spinner_where) {
						jQuery(spinner_where).removeClass('updraftcentral_spinner');
					}
					response_callback.call(this, response);
				},
				error: function(request, status, error_thrown) {
					// We don't actually need these errors if the browser was reloaded because users can no longer
					// take any action since it's already been too late. These error info will only be shown if the
					// browser reload action is not the one causing the error due to an abrupt halting of a current AJAX process.
					if (!UpdraftCentral.reloaded) {
						console.log("UDRPC: Error in send_post (url="+url+")");
						console.log(request);
						console.log(status);
						// https://api.jquery.com/jquery.ajax/ says: 'When an HTTP error occurs, (this parameter) receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error."'
						// "Unauthorized" is what you get when HTTP authentication is required. "Timeout" when there's a timeout.
						console.log(error_thrown);
					}

					if (spinner_where) {
						jQuery(spinner_where).removeClass('updraftcentral_spinner');
					}
					if ('' == error_thrown) { error_thrown = 'http_post_fail'; }

					if (error_thrown.hasOwnProperty('statusText')) {
						error_thrown = error_thrown.statusText.toString();
					}
					
					if ('function' === typeof error_thrown.toLowerCase) {
						error_thrown = error_thrown.toLowerCase();
					} else {
						try {
							var tmp = error_thrown.toString().toLowerCase();
							if (tmp) { error_thrown = tmp; }
						} catch (e) {
						}
					}
					response_callback.call(this, request, 'error', error_thrown);
				}
			}

			if (this.http_credentials.hasOwnProperty('username')) {
				
				var password = (this.http_credentials.hasOwnProperty('password')) ? this.http_credentials.password : '';
				
				if (this.auth_method == 'manual') {
					
					ajax_options.headers.Authorization = 'Basic '+forge.util.encode64(this.http_credentials.username+':'+password);
					
				} else {
					// Default: jquery
					ajax_options.xhrFields = {
						withCredentials: true
					}
					ajax_options.username = this.http_credentials.username;
					if (this.http_credentials.hasOwnProperty('password')) {
						ajax_options.password = this.http_credentials.password;
					}
				}
			}

			if (this.debug_level > 1) {
				console.log("UDPRC: jQuery POST: options follow:");
				console.log(ajax_options);
			}
			
			jQuery.ajax(ajax_options);
			
		} catch (e) {
			// Not sure if anything more needs doing here
			console.log("UDRPC: Exception in send_post (url="+url+")");
			console.log(e);
			throw e;
		}
	}

	/**
	 * Response Call back
	 *
	 * @callable responseCallback
	 * @param {*} response - the response from the call. The format depends upon what was sent, and upon the error status. In the case of an HTTP error from jQuery, this will be the jqXHR object.
	 * @param {String} code - the basic response status; either 'error', or the data sent from the remote side
	 * @param {String} [error_code] - if code was 'error', then an error code
	 */
	
	/**
	 * Send a message to the remote site
	 *
	 * @param {string} command - the command to be sent
	 * @param {*} [data=null] - accompanying data associated with the command (if any)
	 * @param {number} [timeout=30] - the number of seconds for the timeout on the resulting HTTP call
	 * @param {responseCallback} response_callback - callback function which is called with the results of the call
	 * @returns {void}
	*/
	this.send_message = function(command, data, timeout, response_callback) {

		data = typeof data !== 'undefined' ? data : null;
		timeout = typeof timeout !== 'undefined' ? timeout : 30;
		
		if (!this.destination_url) {
			console.log("UDRPC: send_message: no destination URL has been initialised");
			throw 'RPC error: destination URL not initialised';
		}
		
		message = this.create_message(command, data, false);
		
		var message_random_number = this.message_random_number;
		
		var ud_rpc = this;

		this.send_post(this.destination_url, false, message, function(body, status, data) {

			if ('error' == status) {
				response_callback.call(this, body, 'error', data);
				return;
			}
			
			if ('' === body) {
				console.log("UDRPC: the response from the remote site was empty");
				response_callback.call(this, body, 'error', 'response_empty');
				return;
			}
			
			try {
				var response = JSON.parse(body);
			} catch (e) {
				console.log(e);
				response_callback.call(this, body, 'error', 'json_parse_fail');
				return;
			}
			
			try {
				
				if (!response) {
					console.log("UDRPC: the response from the remote site was empty");
					console.log(body);
					response_callback.call(this, body, 'error', 'parsed_response_not_understood');
					return;
				}
				
				if (false !== ud_rpc.message_unwrapper) {
					var unwrapped_response = ud_rpc.message_unwrapper.call(this, response);
					if (false === unwrapped_response) {
						response_callback.call(this, response, 'error', 'unwrapper_failure');
						return;
					}
					response = unwrapped_response;
				}
				
				if (!response.hasOwnProperty('udrpc_message')) {
					console.log("UDRPC: the response from the remote site could not be understood (follows)");
					console.log(body);
					response_callback.call(this, body, 'error', 'parsed_response_not_understood');
					return;
				}
				
				if (!response.hasOwnProperty('signature') || !response.signature) {
					console.log("UDRPC: No signature found on response from remote site - message dropped");
					response_callback.call(this, response, 'error', 'response_no_signature');
					return;
				}

				try {
					if (!ud_rpc.verify_signature(response.udrpc_message, response.signature, ud_rpc.key_remote)) {
						console.log("UDRPC: Verify signature on response: failed - message dropped");
						response_callback.call(this, response, 'error', 'response_signature_invalid');
						return;
					} else if (ud_rpc.debug) {
						console.log("UDRPC: Verify signature on response: OK");
					}
				} catch (e) {
					console.log(e);
					response_callback.call(this, response, 'error', 'signature_verify_exception');
					return;
				}
				
				try {
					var decoded = ud_rpc.decrypt_message(response.udrpc_message);
				} catch (e) {
					console.log(e);
					response_callback.call(this, e, 'error', 'decryption_error');
					return;
				}
				
				var json_decoded = JSON.parse(decoded);
				
				if (!json_decoded.hasOwnProperty('response') || !json_decoded.hasOwnProperty('time')) {
					console.log('response_corrupt: Response from remote site was not in the expected format (follows)');
					console.log(response);
					console.log(json_decoded);
			// throw 'Response from remote site was not in the expected format';
					response_callback.call(this, decoded, 'error', 'parsed_response_bad_format');
					return;
				}
				
				// Don't do the reply detection until now, because post['body'] may not be a message that originated from the remote component at all (e.g. an HTTP error)
				if (ud_rpc.extra_replay_protection) {
					message_hash = ud_rpc.calculate_message_hash(body);
					if (ud_rpc.message_hash_seen(message_hash)) {
						console.log("Message refused: replay detected");
						console.log(message_hash);
						response_callback.call(this, json_decoded.response, 'error', 'response_replay_detected');
						return;
					}
				}
				
				var time_now = ud_rpc.time_now();
				
				time_difference = (time_now - json_decoded.time);
				if (time_difference > ud_rpc.maximum_replay_time_difference) {
					console.log("UDRPC: Message refused: too late - diff="+time_difference+", maximum_difference="+ud_rpc.maximum_replay_time_difference);
					response_callback.call(this, json_decoded.response, 'error', 'response_refused_too_late');
					return;
					// throw 'Message refused: too late';
				}

				if (json_decoded.hasOwnProperty('incoming_rand') && message_random_number && json_decoded.incoming_rand != message_random_number) {
					console.log("UDRPC: Message mismatch (possibly MITM) (sent_rand="+message_random_number+", returned_rand="+json_decoded.incoming_rand+"): dropping");
					response_callback.call(this, json_decoded.response, 'error', 'response_mismatch');
					return;
				}
				
			} catch (e) {
				console.log(e);
				response_callback.call(this, response, 'error', 'js_exception');
				return;
			}
			
			// Should be an object with keys including 'response' and (if relevant) 'data'
			response_callback.call(this, json_decoded, 'ok');
		}, timeout);
		
	}
	
	/**
	 * Unimplmented function - merely logs the fact that it was called
	 *
	 * @returns {boolean} - unimplemented function, always returns false
	 */
	this.create_listener = function() {
		this.unimplemented_function('create_listener');
		return false;
	}
	
	/**
	 * Calculates a SHA256 hash for the passed message
	 *
	 * @param {string} message - the message to create a hash for
	 *
	 * @returns {string} - the SHA256 hash, in hex
	 */
	this.calculate_message_hash = function(message) {
		this.ensure_crypto_loaded();
		var md = forge.md.sha256.create();
		md.update(message);
		return md.digest().toHex();
	}

	/**
	 * Indicate whether the message hash has been previously seen. As this class is designed to run within a browser, that means "within this browser session".
	 *
	 * @param {string} message_hash - the message hash. The result of the function will be true if and only if this has been passed to the function previously.
	 *
	 * @returns {boolean} - whether or not the hash has been previously seen.
	 */
	this.message_hash_seen = function(message_hash) {
		var seen_hashes = this.seen_hashes;
		var time_now = this.time_now();

		var any_changes = false;
		var seen_it = false;

		// Prune the old hashes
		jQuery.each(seen_hashes, function(i, hash) {
			var last_seen = seen_hashes.hash;
			if (last_seen < (time_now - this.maximum_replay_time_difference)) {
				any_changes = true;
				delete seen_hashes.hash;
			} else if (hash == message_hash) {
				seen_it = true;
				any_changes = true;
				seen_hashes.hash = time_now;
			}
		});

		return seen_it;
	}
	
	// Setup
	this.set_key_name_indicator(key_name_indicator);
	
	return this;
}
