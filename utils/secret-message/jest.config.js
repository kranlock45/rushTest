module.exports = {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['lcov', 'json', 'text'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			diagnostics: {
				warnOnly: true,
			},
		},
	},
	moduleFileExtensions: ['js', 'ts'],
	modulePathIgnorePatterns: ['lib', '__mocks__'],
	testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	preset: 'ts-jest',
};
