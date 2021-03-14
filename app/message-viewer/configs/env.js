function stringifyEnv(envObject) {
	return {
		'process.env': Object.keys(envObject).reduce((env, key) => {
			if (envObject[key] === 'true') {
				env[key] = true;

				return env;
			}
			if (envObject[key] === 'false') {
				env[key] = false;

				return env;
			}

			env[key] = JSON.stringify(envObject[key]);

			return env;
		}, {}),
	};
}

module.exports = stringifyEnv;
