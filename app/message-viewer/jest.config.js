const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)', '!<rootDir>/src/**/*.d.ts'],
	coverageReporters: ['lcov', 'json', 'text'],
	globals: {
		'ts-jest': {
			tsconfig: {
				...compilerOptions,
				allowJs: true,
			},
			diagnostics: {
				warnOnly: true,
			},
		},
	},
	coverageThreshold: {
		global: {
			statements: 59,
			lines: 59,
		},
	},
	setupFiles: ['<rootDir>/configs/test-setup.js'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
		'\\.css$': 'identity-obj-proxy',
	},
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	modulePathIgnorePatterns: ['lib', '__mocks__', '.d.ts'],
	testMatch: ['**/__tests__/*.test.+(ts|tsx|js)'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.jsx?$': 'ts-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!(@atomic|@cib)/)'],
	preset: 'ts-jest',
};
